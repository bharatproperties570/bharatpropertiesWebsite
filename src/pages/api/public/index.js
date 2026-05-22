

/* global process */
export default async function handler(req, res) {
  const apiBaseUrl = process.env.CRM_API_BASE_URL || 'https://api.bharatproperties.co/api/public';
  const path = req.url.replace(/^\/api\/public/, '');
  const apiUrl = `${apiBaseUrl}${path}`;
  try {
    const headers = { ...req.headers };
    delete headers.host;
    delete headers.connection;
    
    const response = await fetch(apiUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
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
