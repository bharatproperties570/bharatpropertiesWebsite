/**
 * Proxy Security & Query Parameter Sanitization Utilities
 *
 * Enforces security invariants on outgoing proxy requests to upstream CRM:
 * - Strips `all` parameter so browser visitors can never trigger full exports.
 * - Clamps `limit` to a maximum of 200 (and minimum of 1).
 * - Preserves standard query parameters (city, search, category, etc.).
 */

/**
 * Sanitizes query parameters from an incoming request URL before proxying upstream.
 *
 * @param {string} urlString - Incoming request URL or query string (e.g. req.url)
 * @returns {string} Sanitized query string with leading '?' or empty string
 */
export function sanitizeProxyQuery(urlString) {
  if (!urlString || typeof urlString !== 'string') return '';

  const qIndex = urlString.indexOf('?');
  if (qIndex === -1) return '';

  const search = urlString.slice(qIndex);
  const params = new URLSearchParams(search);

  // 1. Strip 'all' parameter completely (prevents full export trigger from browser)
  params.delete('all');

  // 2. Clamp 'limit' to max 200 and min 1
  if (params.has('limit')) {
    const rawLimit = params.get('limit');
    const parsed = parseInt(rawLimit, 10);
    if (!isNaN(parsed)) {
      const clamped = Math.max(1, Math.min(parsed, 200));
      params.set('limit', String(clamped));
    } else {
      params.delete('limit');
    }
  }

  const result = params.toString();
  return result ? `?${result}` : '';
}
