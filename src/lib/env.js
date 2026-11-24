/**
 * @file env.js
 * Environment variable validation and access control.
 * Ensures server-only secrets are never exposed to the client.
 */

/* global process */

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * Returns the validated canonical public site URL.
 */
export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bharatproperties.co';
  return url.replace(/\/+$/, '');
}

/**
 * Validates server-side required environment variables.
 * In production, warns or throws clear actionable configuration errors.
 */
export function validateServerEnv() {
  const isServer = typeof window === 'undefined';
  if (!isServer) return;

  const missing = [];

  if (!process.env.CRM_API_KEY) {
    missing.push('CRM_API_KEY (Required for upstream CRM integration)');
  }
  if (!process.env.GEMINI_API_KEY) {
    missing.push('GEMINI_API_KEY (Required for AI assistant webhook)');
  }

  if (missing.length > 0) {
    const message = `[Configuration Warning] Missing environment variables:\n  - ${missing.join('\n  - ')}\nPlease configure these in your Vercel project settings or .env.local file.`;
    if (IS_PRODUCTION) {
      console.warn(message);
    } else {
      console.info(message);
    }
  }

  // Security check: ensure no server secrets have been mistakenly prefixed with NEXT_PUBLIC_
  const dangerousKeys = ['NEXT_PUBLIC_CRM_API_KEY', 'NEXT_PUBLIC_GEMINI_API_KEY', 'NEXT_PUBLIC_CRM_KEY'];
  for (const key of dangerousKeys) {
    if (process.env[key]) {
      console.error(`[SECURITY ERROR] ${key} is exposed as a public environment variable! Remove it immediately and use server-only equivalents.`);
    }
  }
}

/**
 * Returns safe environment configuration diagnostics without leaking secret values.
 */
export function getEnvDiagnostics() {
  return {
    environment: process.env.NODE_ENV || 'development',
    siteUrl: getSiteUrl(),
    hasCrmKey: Boolean(process.env.CRM_API_KEY),
    hasCrmBaseUrl: Boolean(process.env.CRM_API_BASE_URL),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    hasGaId: Boolean(process.env.NEXT_PUBLIC_GA_ID),
    hasGscVerification: Boolean(process.env.NEXT_PUBLIC_GSC_VERIFICATION),
    hasMapsKey: Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY),
  };
}
