/* global process */

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const nowIso = new Date().toISOString();
  const apiBaseUrl = process.env.CRM_API_BASE_URL || 'https://api.bharatproperties.co/api/public';
  const apiKey = process.env.CRM_API_KEY || '';

  let crmReachable = false;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const checkUrl = `${apiBaseUrl}/public-settings`;
    const response = await fetch(checkUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}`, 'X-API-KEY': apiKey } : {})
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    crmReachable = response.ok;
  } catch {
    crmReachable = false;
  }

  const overallStatus = crmReachable ? 'healthy' : 'degraded';

  return res.status(200).json({
    status: overallStatus,
    crmReachable,
    time: nowIso
  });
}
