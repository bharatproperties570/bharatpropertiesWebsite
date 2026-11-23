/* global process */
import { getSiteUrl, IS_PRODUCTION } from '../../../lib/env';
import { leadSubmissionLimiter, publicApiLimiter } from '../../../lib/rateLimit';
import { getValidatedClientIp } from '../../../lib/ipUtils';
import {
  validateLeadPayload,
  validatePropertyPayload,
  validateWaSiteVisitPayload
} from '../../../lib/formValidation';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100kb',
    },
  },
};

const ALLOWED_GET_SINGLE = new Set([
  'projects',
  'listings',
  'public-settings',
  'available-units',
  'google-reviews'
]);

const ALLOWED_GET_PARAM = new Set([
  'projects',
  'listings'
]);

const ALLOWED_POST_SINGLE = new Set([
  'submit-lead',
  'submit-property',
  'wa-site-visit'
]);

function isSameOrigin(req) {
  const origin = req.headers.origin;
  const referer = req.headers.referer;

  // If neither is present (e.g. server-to-server or curl in dev), allow in dev only
  if (!origin && !referer) {
    return !IS_PRODUCTION;
  }

  const allowedHosts = new Set([
    'bharatproperties.co',
    'www.bharatproperties.co',
  ]);

  try {
    const siteUrl = getSiteUrl();
    const parsedSiteUrl = new URL(siteUrl);
    allowedHosts.add(parsedSiteUrl.host);
  } catch {
    // keep default hosts
  }

  const checkUrl = (urlStr) => {
    try {
      const parsed = new URL(urlStr);
      if (!IS_PRODUCTION) {
        if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
          return true;
        }
      }
      return allowedHosts.has(parsed.host);
    } catch {
      return false;
    }
  };

  if (origin && !checkUrl(origin)) return false;
  if (referer && !checkUrl(referer)) return false;

  return true;
}

export default async function handler(req, res) {
  const requestId = `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  res.setHeader('X-Request-Id', requestId);

  const method = req.method;
  if (method !== 'GET' && method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawSlug = req.query.slug;
  const slugArray = Array.isArray(rawSlug) ? rawSlug : [rawSlug].filter(Boolean);

  let isAllowed = false;
  if (method === 'GET') {
    if (slugArray.length === 1 && ALLOWED_GET_SINGLE.has(slugArray[0])) {
      isAllowed = true;
    } else if (slugArray.length === 2 && ALLOWED_GET_PARAM.has(slugArray[0])) {
      isAllowed = true;
    }
  } else if (method === 'POST') {
    if (slugArray.length === 1 && ALLOWED_POST_SINGLE.has(slugArray[0])) {
      isAllowed = true;
    }
  }

  if (!isAllowed) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }

  const slugPath = '/' + slugArray.map(encodeURIComponent).join('/');

  // 1. Same-Origin & Content-Type enforcement for POST requests
  if (method === 'POST') {
    if (!isSameOrigin(req)) {
      console.warn(`[Proxy] [${requestId}] Blocked cross-origin POST to ${slugPath} from origin: ${req.headers.origin || 'none'}`);
      return res.status(403).json({ error: 'Cross-origin request forbidden' });
    }

    const contentType = req.headers['content-type'] || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return res.status(415).json({ error: 'Unsupported Media Type: application/json required' });
    }

    // Rate limiting for submissions
    const rateCheck = await leadSubmissionLimiter.check(req, slugPath);
    if (!rateCheck.success) {
      res.setHeader('Retry-After', '60');
      return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
    }
  } else {
    // GET rate limit check
    const rateCheck = await publicApiLimiter.check(req, 'get');
    if (!rateCheck.success) {
      res.setHeader('Retry-After', '60');
      return res.status(429).json({ error: 'Too many requests' });
    }
  }

  // 2. Server-side payload validation for forms
  let outgoingBody = req.body;
  if (method === 'POST') {
    const action = slugArray[0];
    if (action === 'submit-lead') {
      const validation = validateLeadPayload(req.body);
      if (!validation.isValid) {
        return res.status(400).json({ error: 'Validation failed', details: validation.errors });
      }
      outgoingBody = validation.data;
    } else if (action === 'submit-property') {
      const validation = validatePropertyPayload(req.body);
      if (!validation.isValid) {
        return res.status(400).json({ error: 'Validation failed', details: validation.errors });
      }
      outgoingBody = validation.data;
    } else if (action === 'wa-site-visit') {
      const validation = validateWaSiteVisitPayload(req.body);
      if (!validation.isValid) {
        return res.status(400).json({ error: 'Validation failed', details: validation.errors });
      }
      outgoingBody = validation.data;
    }
  }

  const apiBaseUrl = process.env.CRM_API_BASE_URL || 'https://api.bharatproperties.co/api/public';
  const apiKey = process.env.CRM_API_KEY || '';
  const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  const apiUrl = `${apiBaseUrl}${slugPath}${queryString}`;

  const clientIp = getValidatedClientIp(req);

  const forwardHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(apiKey ? { Authorization: `Bearer ${apiKey}`, 'X-API-KEY': apiKey } : {}),
    ...(clientIp ? { 'X-Client-IP': clientIp } : {})
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(apiUrl, {
      method,
      headers: forwardHeaders,
      body: method === 'POST' && outgoingBody ? JSON.stringify(outgoingBody) : undefined,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[Proxy] [${requestId}] Upstream error status: ${response.status} for ${slugPath}`);
      return res.status(response.status).json({ error: 'Upstream service error' });
    }

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.warn(`[Proxy] [${requestId}] Request timeout for ${slugPath}`);
      return res.status(504).json({ error: 'Gateway timeout' });
    }
    console.error(`[Proxy] [${requestId}] Upstream connection failure:`, error.message || error);
    return res.status(502).json({ error: 'Service temporarily unavailable' });
  }
}
