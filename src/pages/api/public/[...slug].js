/* global process */

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

export default async function handler(req, res) {
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
    return res.status(404).json({ error: 'Not found' });
  }

  const apiBaseUrl = process.env.CRM_API_BASE_URL || 'https://api.bharatproperties.co/api/public';
  const apiKey = process.env.CRM_API_KEY || '';
  const slugPath = '/' + slugArray.map(encodeURIComponent).join('/');
  const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  const apiUrl = `${apiBaseUrl}${slugPath}${queryString}`;

  const forwardHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(apiKey ? { Authorization: `Bearer ${apiKey}`, 'X-API-KEY': apiKey } : {})
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(apiUrl, {
      method,
      headers: forwardHeaders,
      body: method === 'POST' && req.body ? JSON.stringify(req.body) : undefined,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Upstream error' });
    }

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: 'Gateway timeout' });
    }
    console.error('[Public Proxy Error]', error.message || error);
    return res.status(502).json({ error: 'Bad gateway' });
  }
}
