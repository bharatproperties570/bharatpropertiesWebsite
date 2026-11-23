import { logger } from '../../lib/logger';

// Disable default Next.js bodyParser so we can accept custom MIME types
// (application/csp-report and application/reports+json) with strict byte bounds.
export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_REPORT_BYTES = 50 * 1024; // 50KB limit

async function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let bytesReceived = 0;
    const chunks = [];

    req.on('data', (chunk) => {
      bytesReceived += chunk.length;
      if (bytesReceived > MAX_REPORT_BYTES) {
        req.destroy(new Error('PAYLOAD_TOO_LARGE'));
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf-8'));
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const contentType = (req.headers['content-type'] || '').toLowerCase();
  const isCspReport =
    contentType.includes('application/csp-report') ||
    contentType.includes('application/reports+json') ||
    contentType.includes('application/json');

  if (!isCspReport) {
    return res.status(415).json({ error: 'Unsupported media type' });
  }

  try {
    const rawBody = await readRawBody(req);
    if (!rawBody || !rawBody.trim()) {
      return res.status(204).end();
    }

    let parsedReport = null;
    try {
      parsedReport = JSON.parse(rawBody);
    } catch {
      // Invalid JSON payload; log notice and return 204 to client
      logger.warn('Malformed CSP report payload', {
        userAgent: req.headers['user-agent'] || 'unknown',
      });
      return res.status(204).end();
    }

    // Extract standardized report details
    // Traditional CSP uses {"csp-report": {...}}
    // Reporting API v1 uses [{"type": "csp-violation", "body": {...}}]
    const cspData = parsedReport['csp-report'] || parsedReport;

    logger.warn('CSP Violation Report', {
      report: cspData,
      userAgent: req.headers['user-agent'] || 'unknown',
      ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown',
    });

    return res.status(204).end();
  } catch (error) {
    if (error.message === 'PAYLOAD_TOO_LARGE') {
      return res.status(413).json({ error: 'Payload too large' });
    }
    logger.error('Error handling CSP report', { error: error.message });
    return res.status(204).end();
  }
}
