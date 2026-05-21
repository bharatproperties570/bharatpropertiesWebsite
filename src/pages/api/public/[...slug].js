

export default async function handler(req, res) {
  const apiBaseUrl = process.env.CRM_API_BASE_URL || 'https://api.bharatproperties.co/api/public';
  const apiKey = process.env.CRM_API_KEY;
  const path = req.url.replace(/^\/api\/public/, '');
  const apiUrl = `${apiBaseUrl}${path}`;
  try {
    const response = await fetch(apiUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}`, 'X-API-KEY': apiKey } : {}),
        ...req.headers,
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(502).json({ error: 'Bad gateway' });
  }
}
