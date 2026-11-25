import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEnvironment } from './env-check.mjs';

test('Environment Check: Valid production configuration passes with hasErrors: false', () => {
  const env = {
    CRM_API_KEY: 'a'.repeat(32),
    GEMINI_API_KEY: 'test-gemini-key',
    NEXT_PUBLIC_SITE_URL: 'https://www.bharatproperties.co',
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: 'test-maps-key',
    CRM_API_BASE_URL: 'https://api.bharatproperties.co/api/public',
  };

  const results = validateEnvironment(env);
  assert.equal(results.hasErrors, false);
  const crmItem = results.required.find((r) => r.name === 'CRM_API_KEY');
  assert.equal(crmItem?.status, 'OK');
  const siteUrlItem = results.required.find((r) => r.name === 'NEXT_PUBLIC_SITE_URL');
  assert.equal(siteUrlItem?.status, 'OK');
});

test('Environment Check: CRM_API_KEY missing, short, or with whitespace fails', () => {
  // Missing
  let res = validateEnvironment({});
  let item = res.required.find((r) => r.name === 'CRM_API_KEY');
  assert.equal(item?.status, 'MISSING');
  assert.equal(res.hasErrors, true);

  // Short (< 32)
  res = validateEnvironment({ CRM_API_KEY: 'too-short' });
  item = res.required.find((r) => r.name === 'CRM_API_KEY');
  assert.equal(item?.status, 'INVALID');
  assert.equal(res.hasErrors, true);

  // Whitespace
  res = validateEnvironment({ CRM_API_KEY: 'a'.repeat(31) + ' key with spaces' });
  item = res.required.find((r) => r.name === 'CRM_API_KEY');
  assert.equal(item?.status, 'INVALID');
  assert.equal(res.hasErrors, true);
});

test('Environment Check: NEXT_PUBLIC_SITE_URL must equal https://www.bharatproperties.co', () => {
  // Wrong domain
  let res = validateEnvironment({ NEXT_PUBLIC_SITE_URL: 'https://other-domain.co' });
  let item = res.required.find((r) => r.name === 'NEXT_PUBLIC_SITE_URL');
  assert.equal(item?.status, 'INVALID');
  assert.equal(res.hasErrors, true);

  // Insecure http
  res = validateEnvironment({ NEXT_PUBLIC_SITE_URL: 'http://www.bharatproperties.co' });
  item = res.required.find((r) => r.name === 'NEXT_PUBLIC_SITE_URL');
  assert.equal(item?.status, 'INVALID');

  // Trailing slash accepted and normalized
  res = validateEnvironment({
    CRM_API_KEY: 'b'.repeat(32),
    GEMINI_API_KEY: 'key',
    NEXT_PUBLIC_SITE_URL: 'https://www.bharatproperties.co/',
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: 'maps',
  });
  item = res.required.find((r) => r.name === 'NEXT_PUBLIC_SITE_URL');
  assert.equal(item?.status, 'OK');
});

test('Environment Check: GEMINI_API_KEY and NEXT_PUBLIC_GOOGLE_MAPS_API_KEY are required', () => {
  const res = validateEnvironment({
    CRM_API_KEY: 'c'.repeat(32),
    NEXT_PUBLIC_SITE_URL: 'https://www.bharatproperties.co',
  });
  assert.equal(res.hasErrors, true);
  assert.equal(res.required.find((r) => r.name === 'GEMINI_API_KEY')?.status, 'MISSING');
  assert.equal(res.required.find((r) => r.name === 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY')?.status, 'MISSING');
});

test('Environment Check: CRM_API_BASE_URL must be https and cannot be localhost if provided', () => {
  // Localhost http
  let res = validateEnvironment({ CRM_API_BASE_URL: 'http://localhost:4000/api/public' });
  let item = res.optional.find((r) => r.name === 'CRM_API_BASE_URL');
  assert.equal(item?.status, 'INVALID');
  assert.equal(res.hasErrors, true);

  // 127.0.0.1
  res = validateEnvironment({ CRM_API_BASE_URL: 'http://127.0.0.1:59989/api/public' });
  item = res.optional.find((r) => r.name === 'CRM_API_BASE_URL');
  assert.equal(item?.status, 'INVALID');

  // Valid https
  res = validateEnvironment({ CRM_API_BASE_URL: 'https://api.bharatproperties.co/api/public' });
  item = res.optional.find((r) => r.name === 'CRM_API_BASE_URL');
  assert.equal(item?.status, 'OK');
});

test('Environment Check: Optional variables report WARN_MISSING without setting hasErrors', () => {
  const res = validateEnvironment({
    CRM_API_KEY: 'd'.repeat(32),
    GEMINI_API_KEY: 'valid-gemini-key',
    NEXT_PUBLIC_SITE_URL: 'https://www.bharatproperties.co',
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: 'valid-maps-key',
  });
  assert.equal(res.hasErrors, false);
  assert.equal(res.hasWarnings, true);
  assert.equal(res.optional.find((r) => r.name === 'NEXT_PUBLIC_GA_ID')?.status, 'WARN_MISSING');
  assert.equal(res.optional.find((r) => r.name === 'NEXT_PUBLIC_RERA_NUMBER_HARYANA')?.status, 'WARN_MISSING');
});
