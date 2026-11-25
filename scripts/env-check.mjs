#!/usr/bin/env node

/**
 * Production Environment Configuration Validator
 *
 * Validates presence and format of required and optional environment variables.
 * CRITICAL INVARIANT: NEVER prints, logs, or echoes variable values.
 * Only reports status: OK, MISSING, or INVALID alongside the variable NAME.
 *
 * Usage:
 *   node scripts/env-check.mjs
 *   npm run env:check
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const EXPECTED_SITE_URL = 'https://www.bharatproperties.co';

export function validateEnvironment(env = process.env) {
  const results = {
    required: [],
    optional: [],
    hasErrors: false,
    hasWarnings: false,
  };

  // 1. Required Variables
  // CRM_API_KEY: length >= 32, no whitespace
  const crmApiKey = env.CRM_API_KEY?.trim();
  if (!crmApiKey) {
    results.required.push({ name: 'CRM_API_KEY', status: 'MISSING', reason: 'Required for production CRM data fetching' });
    results.hasErrors = true;
  } else if (crmApiKey.length < 32 || /\s/.test(env.CRM_API_KEY)) {
    results.required.push({ name: 'CRM_API_KEY', status: 'INVALID', reason: 'Must be at least 32 characters with no whitespace' });
    results.hasErrors = true;
  } else {
    results.required.push({ name: 'CRM_API_KEY', status: 'OK' });
  }

  // GEMINI_API_KEY: non-empty
  const geminiKey = env.GEMINI_API_KEY?.trim();
  if (!geminiKey) {
    results.required.push({ name: 'GEMINI_API_KEY', status: 'MISSING', reason: 'Required for AI logic and search capabilities' });
    results.hasErrors = true;
  } else {
    results.required.push({ name: 'GEMINI_API_KEY', status: 'OK' });
  }

  // NEXT_PUBLIC_SITE_URL: must equal https://www.bharatproperties.co
  const rawSiteUrl = env.NEXT_PUBLIC_SITE_URL?.trim();
  const normalizedSiteUrl = rawSiteUrl ? rawSiteUrl.replace(/\/+$/, '') : '';
  if (!rawSiteUrl) {
    results.required.push({ name: 'NEXT_PUBLIC_SITE_URL', status: 'MISSING', reason: `Must be explicitly set to ${EXPECTED_SITE_URL}` });
    results.hasErrors = true;
  } else if (normalizedSiteUrl !== EXPECTED_SITE_URL) {
    results.required.push({ name: 'NEXT_PUBLIC_SITE_URL', status: 'INVALID', reason: `Must equal ${EXPECTED_SITE_URL} exactly` });
    results.hasErrors = true;
  } else {
    results.required.push({ name: 'NEXT_PUBLIC_SITE_URL', status: 'OK' });
  }

  // NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: non-empty
  const mapsKey = env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  if (!mapsKey) {
    results.required.push({ name: 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY', status: 'MISSING', reason: 'Required for location and interactive map rendering' });
    results.hasErrors = true;
  } else {
    results.required.push({ name: 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY', status: 'OK' });
  }

  // 2. Optional Variables with Warnings
  // CRM_API_BASE_URL: if set, must be https and must not be localhost
  const crmBaseUrl = env.CRM_API_BASE_URL?.trim();
  if (!crmBaseUrl) {
    results.optional.push({ name: 'CRM_API_BASE_URL', status: 'OK', note: 'Unset (defaults to https://api.bharatproperties.co/api/public)' });
  } else if (!crmBaseUrl.startsWith('https://') || crmBaseUrl.includes('localhost') || crmBaseUrl.includes('127.0.0.1')) {
    results.optional.push({ name: 'CRM_API_BASE_URL', status: 'INVALID', reason: 'If set, must start with https:// and must not point to localhost' });
    results.hasErrors = true;
  } else {
    results.optional.push({ name: 'CRM_API_BASE_URL', status: 'OK' });
  }

  // NEXT_PUBLIC_GA_ID
  if (env.NEXT_PUBLIC_GA_ID?.trim()) {
    results.optional.push({ name: 'NEXT_PUBLIC_GA_ID', status: 'OK' });
  } else {
    results.optional.push({ name: 'NEXT_PUBLIC_GA_ID', status: 'WARN_MISSING', note: 'Google Analytics tracking will be disabled' });
    results.hasWarnings = true;
  }

  // NEXT_PUBLIC_GSC_VERIFICATION
  if (env.NEXT_PUBLIC_GSC_VERIFICATION?.trim()) {
    results.optional.push({ name: 'NEXT_PUBLIC_GSC_VERIFICATION', status: 'OK' });
  } else {
    results.optional.push({ name: 'NEXT_PUBLIC_GSC_VERIFICATION', status: 'WARN_MISSING', note: 'Google Search Console verification meta tag omitted' });
    results.hasWarnings = true;
  }

  // NEXT_PUBLIC_RERA_NUMBER_HARYANA
  if (env.NEXT_PUBLIC_RERA_NUMBER_HARYANA?.trim()) {
    results.optional.push({ name: 'NEXT_PUBLIC_RERA_NUMBER_HARYANA', status: 'OK' });
  } else {
    results.optional.push({ name: 'NEXT_PUBLIC_RERA_NUMBER_HARYANA', status: 'WARN_MISSING', note: 'Haryana RERA registration badge/schema will be omitted' });
    results.hasWarnings = true;
  }

  // NEXT_PUBLIC_RERA_NUMBER_PUNJAB
  if (env.NEXT_PUBLIC_RERA_NUMBER_PUNJAB?.trim()) {
    results.optional.push({ name: 'NEXT_PUBLIC_RERA_NUMBER_PUNJAB', status: 'OK' });
  } else {
    results.optional.push({ name: 'NEXT_PUBLIC_RERA_NUMBER_PUNJAB', status: 'WARN_MISSING', note: 'Punjab RERA registration badge/schema will be omitted' });
    results.hasWarnings = true;
  }

  // Social Links
  const socialVars = [
    'NEXT_PUBLIC_FACEBOOK_URL',
    'NEXT_PUBLIC_INSTAGRAM_URL',
    'NEXT_PUBLIC_YOUTUBE_URL',
    'NEXT_PUBLIC_LINKEDIN_URL',
  ];
  for (const sName of socialVars) {
    if (env[sName]?.trim()) {
      results.optional.push({ name: sName, status: 'OK' });
    } else {
      results.optional.push({ name: sName, status: 'WARN_MISSING', note: 'Social profile link will be omitted' });
      results.hasWarnings = true;
    }
  }

  return results;
}

export function printValidationReport(results) {
  console.log('================================================================');
  console.log('🛡️  Bharat Properties Website - Environment Config Check');
  console.log('================================================================\n');

  console.log('--- Required Production Variables ---');
  for (const item of results.required) {
    if (item.status === 'OK') {
      console.log(`  ✅ [OK]      ${item.name}`);
    } else if (item.status === 'MISSING') {
      console.error(`  ❌ [MISSING] ${item.name} (${item.reason})`);
    } else {
      console.error(`  ❌ [INVALID] ${item.name} (${item.reason})`);
    }
  }

  console.log('\n--- Optional / Informational Variables ---');
  for (const item of results.optional) {
    if (item.status === 'OK') {
      console.log(`  ✅ [OK]      ${item.name}${item.note ? ` (${item.note})` : ''}`);
    } else if (item.status === 'INVALID') {
      console.error(`  ❌ [INVALID] ${item.name} (${item.reason})`);
    } else {
      console.log(`  ⚠️  [WARN]    ${item.name} (${item.note})`);
    }
  }

  console.log('\n================================================================');
  if (results.hasErrors) {
    console.error('❌ Environment validation FAILED. One or more required variables are missing or invalid.');
    console.error('   Ensure all required environment variables are set in the Vercel project dashboard.');
    console.log('================================================================\n');
    return false;
  }

  console.log('✅ Environment validation PASSED. All required variables are present and valid.');
  if (results.hasWarnings) {
    console.log('ℹ️  Some optional variables are unset (see warnings above).');
  }
  console.log('================================================================\n');
  return true;
}

function run() {
  const results = validateEnvironment(process.env);
  const ok = printValidationReport(results);
  process.exit(ok ? 0 : 1);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirectRun) {
  run();
}
