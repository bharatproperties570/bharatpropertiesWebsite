/**
 * @file logger.js
 * Minimal structured logging helper.
 * Redacts PII and secrets before emitting structured JSON logs.
 */

const SENSITIVE_KEY_PATTERN = /key|token|secret|password|auth|cookie|phone|mobile|email|aadhaar|pan/i;

function sanitizeMeta(meta) {
  if (!meta || typeof meta !== 'object') return meta;
  if (Array.isArray(meta)) return meta.map(sanitizeMeta);

  const clean = {};
  for (const [k, v] of Object.entries(meta)) {
    if (SENSITIVE_KEY_PATTERN.test(k)) {
      clean[k] = '[REDACTED]';
    } else if (v && typeof v === 'object') {
      clean[k] = sanitizeMeta(v);
    } else {
      clean[k] = v;
    }
  }
  return clean;
}

export const logger = {
  info: (message, meta = {}) => {
    const entry = {
      level: 'info',
      time: new Date().toISOString(),
      message,
      ...sanitizeMeta(meta)
    };
    console.log(JSON.stringify(entry));
  },

  warn: (message, meta = {}) => {
    const entry = {
      level: 'warn',
      time: new Date().toISOString(),
      message,
      ...sanitizeMeta(meta)
    };
    console.warn(JSON.stringify(entry));
  },

  error: (message, meta = {}) => {
    const entry = {
      level: 'error',
      time: new Date().toISOString(),
      message,
      ...sanitizeMeta(meta)
    };
    console.error(JSON.stringify(entry));
  }
};
