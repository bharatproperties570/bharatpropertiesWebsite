

/* global process */
export default async function handler(req, res) {
  const apiBaseUrl = process.env.CRM_API_BASE_URL || 'https://api.bharatproperties.co/api/public';
  const apiKey = process.env.CRM_API_KEY || 'BP-WEB-INTEGRATION-2026-X7Y9';
  const slugPath = req.query.slug ? '/' + (Array.isArray(req.query.slug) ? req.query.slug.join('/') : req.query.slug) : '';
  const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  const apiUrl = `${apiBaseUrl}${slugPath}${queryString}`;
  try {
    const headers = { ...req.headers };
    delete headers.host;
    delete headers.connection;
    delete headers['x-api-key'];
    delete headers.authorization;

    const response = await fetch(apiUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}`, 'X-API-KEY': apiKey } : {}),
        ...headers,
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });
    
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(502).json({ error: 'Bad gateway' });
  }
}
