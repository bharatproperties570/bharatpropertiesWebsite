import net from 'node:net';

/**
 * Extracts and validates the client's real visitor IP address from platform headers.
 *
 * Rules:
 * - Reads the leftmost valid IP from `x-forwarded-for` (set by Vercel / edge reverse proxies).
 * - Falls back to `x-real-ip`.
 * - Validates format as IPv4 or IPv6 using net.isIP.
 * - NEVER trusts a client-supplied `x-client-ip` (it is never inspected as a source).
 *
 * @param {import('http').IncomingMessage | { headers?: Record<string, string | string[]> }} req
 * @returns {string | null} Validated IPv4 or IPv6 address string, or null if invalid/absent.
 */
export function getValidatedClientIp(req) {
  if (!req || !req.headers) return null;

  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const raw = Array.isArray(forwarded) ? forwarded.join(',') : String(forwarded);
    const parts = raw.split(',').map((p) => p.trim()).filter(Boolean);
    for (const part of parts) {
      if (net.isIP(part) !== 0) {
        return part;
      }
    }
  }

  const realIp = req.headers['x-real-ip'];
  if (realIp) {
    const raw = Array.isArray(realIp) ? realIp[0] : String(realIp);
    const trimmed = raw.trim();
    if (net.isIP(trimmed) !== 0) {
      return trimmed;
    }
  }

  return null;
}
