/**
 * Unit Test Suite: Visitor IP Extraction & Forwarding Guard
 *
 * Verifies that:
 * 1. The leftmost valid IP is extracted from x-forwarded-for (Vercel platform standard).
 * 2. x-real-ip is used as fallback when x-forwarded-for is missing or invalid.
 * 3. IPs are validated strictly as IPv4 or IPv6.
 * 4. Client-supplied X-Client-IP is NEVER trusted and always overwritten from platform headers.
 * 5. No arbitrary client headers are forwarded to the upstream CRM.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { getValidatedClientIp } from '../src/lib/ipUtils.js';
import { sanitizeProxyQuery } from '../src/lib/proxyUtils.js';

test('Visitor IP: extracts valid single IPv4 from x-forwarded-for', () => {
  const req = {
    headers: {
      'x-forwarded-for': '203.0.113.195',
    },
  };
  assert.equal(getValidatedClientIp(req), '203.0.113.195');
});

test('Visitor IP: extracts leftmost valid IP from multi-entry x-forwarded-for', () => {
  const req = {
    headers: {
      'x-forwarded-for': '203.0.113.195, 70.41.3.18, 150.172.238.178',
    },
  };
  assert.equal(getValidatedClientIp(req), '203.0.113.195');
});

test('Visitor IP: skips invalid leading values and picks leftmost valid IP', () => {
  const req = {
    headers: {
      'x-forwarded-for': 'unknown, 999.999.999.999, 198.51.100.22, 10.0.0.1',
    },
  };
  assert.equal(getValidatedClientIp(req), '198.51.100.22');
});

test('Visitor IP: extracts valid IPv6 from x-forwarded-for', () => {
  const req = {
    headers: {
      'x-forwarded-for': '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
    },
  };
  assert.equal(getValidatedClientIp(req), '2001:0db8:85a3:0000:0000:8a2e:0370:7334');
});

test('Visitor IP: handles IPv6 loopback and compressed forms', () => {
  const req = {
    headers: {
      'x-forwarded-for': '::1, 127.0.0.1',
    },
  };
  assert.equal(getValidatedClientIp(req), '::1');
});

test('Visitor IP: falls back to x-real-ip when x-forwarded-for is missing', () => {
  const req = {
    headers: {
      'x-real-ip': '198.51.100.50',
    },
  };
  assert.equal(getValidatedClientIp(req), '198.51.100.50');
});

test('Visitor IP: falls back to x-real-ip when x-forwarded-for has no valid IP', () => {
  const req = {
    headers: {
      'x-forwarded-for': 'malformed-ip, not-an-ip',
      'x-real-ip': '198.51.100.75',
    },
  };
  assert.equal(getValidatedClientIp(req), '198.51.100.75');
});

test('Visitor IP: NEVER trusts client-supplied x-client-ip when platform headers missing', () => {
  const req = {
    headers: {
      'x-client-ip': '1.2.3.4', // Attacker attempting to spoof their IP
    },
  };
  // Must return null, NEVER 1.2.3.4
  assert.equal(getValidatedClientIp(req), null);
});

test('Visitor IP: overwrites client-supplied x-client-ip with platform header', () => {
  const req = {
    headers: {
      'x-client-ip': '1.2.3.4', // Spoofed
      'x-forwarded-for': '203.0.113.88', // Legitimate platform header
    },
  };
  assert.equal(getValidatedClientIp(req), '203.0.113.88');
});

test('Visitor IP: handles array-based platform headers gracefully', () => {
  const req = {
    headers: {
      'x-forwarded-for': ['203.0.113.99', '10.0.0.2'],
    },
  };
  assert.equal(getValidatedClientIp(req), '203.0.113.99');
});

test('Visitor IP: returns null on missing or empty headers', () => {
  assert.equal(getValidatedClientIp({}), null);
  assert.equal(getValidatedClientIp({ headers: {} }), null);
  assert.equal(getValidatedClientIp(null), null);
});

test('Forwarded Headers Guard: only allowed headers sent upstream, no client header leakage', () => {
  const incomingReq = {
    headers: {
      'cookie': 'session=secret-session-id',
      'user-agent': 'Mozilla/5.0 Malicious Agent',
      'x-client-ip': '9.9.9.9', // Spoofed client IP
      'x-forwarded-for': '203.0.113.44', // Real edge IP
      'authorization': 'Bearer attacker-token',
      'x-custom-header': 'leaked-data',
    },
  };

  const clientIp = getValidatedClientIp(incomingReq);
  const apiKey = 'test-crm-key';

  const forwardHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(apiKey ? { Authorization: `Bearer ${apiKey}`, 'X-API-KEY': apiKey } : {}),
    ...(clientIp ? { 'X-Client-IP': clientIp } : {}),
  };

  // Assert correct values
  assert.equal(forwardHeaders['X-Client-IP'], '203.0.113.44');
  assert.equal(forwardHeaders['Authorization'], 'Bearer test-crm-key');
  assert.equal(forwardHeaders['X-API-KEY'], 'test-crm-key');

  // Assert forbidden client headers are strictly NOT leaked
  assert.equal(forwardHeaders['cookie'], undefined);
  assert.equal(forwardHeaders['user-agent'], undefined);
  assert.equal(forwardHeaders['x-custom-header'], undefined);
  assert.equal(forwardHeaders['x-forwarded-for'], undefined);

  // Assert keys match exact allowed set
  const allowedKeys = new Set(['Content-Type', 'Accept', 'Authorization', 'X-API-KEY', 'X-Client-IP']);
  for (const key of Object.keys(forwardHeaders)) {
    assert.ok(allowedKeys.has(key), `Unexpected header forwarded: ${key}`);
  }
});

test('Proxy Query Sanitizer: strips all=1 completely', () => {
  const sanitized = sanitizeProxyQuery('/api/public/listings?all=1');
  assert.equal(sanitized, '');
});

test('Proxy Query Sanitizer: strips all=true and any all parameter variant', () => {
  const sanitized = sanitizeProxyQuery('/api/public/listings?all=true&foo=bar');
  assert.equal(sanitized, '?foo=bar');
});

test('Proxy Query Sanitizer: clamps limit > 200 down to 200', () => {
  const sanitized = sanitizeProxyQuery('/api/public/listings?limit=500');
  assert.equal(sanitized, '?limit=200');
});

test('Proxy Query Sanitizer: clamps extreme limit down to 200 and strips all', () => {
  const sanitized = sanitizeProxyQuery('/api/public/listings?all=1&limit=999999&city=Mohali');
  const params = new URLSearchParams(sanitized.slice(1));
  assert.equal(params.get('all'), null);
  assert.equal(params.get('limit'), '200');
  assert.equal(params.get('city'), 'Mohali');
});

test('Proxy Query Sanitizer: preserves valid limit <= 200', () => {
  assert.equal(sanitizeProxyQuery('/api/public/listings?limit=50'), '?limit=50');
  assert.equal(sanitizeProxyQuery('/api/public/listings?limit=200'), '?limit=200');
  assert.equal(sanitizeProxyQuery('/api/public/listings?limit=1'), '?limit=1');
});

test('Proxy Query Sanitizer: clamps limit <= 0 to min 1', () => {
  assert.equal(sanitizeProxyQuery('/api/public/listings?limit=0'), '?limit=1');
  assert.equal(sanitizeProxyQuery('/api/public/listings?limit=-5'), '?limit=1');
});

test('Proxy Query Sanitizer: handles non-numeric limit by dropping it', () => {
  assert.equal(sanitizeProxyQuery('/api/public/listings?limit=abc'), '');
  assert.equal(sanitizeProxyQuery('/api/public/listings?limit=abc&city=Kharar'), '?city=Kharar');
});

test('Proxy Query Sanitizer: returns empty string on URLs without query string or empty inputs', () => {
  assert.equal(sanitizeProxyQuery('/api/public/listings'), '');
  assert.equal(sanitizeProxyQuery(''), '');
  assert.equal(sanitizeProxyQuery(null), '');
  assert.equal(sanitizeProxyQuery(undefined), '');
});
