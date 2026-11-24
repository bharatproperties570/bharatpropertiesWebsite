/**
 * Production Build Script
 *
 * Enforces production invariants:
 *  - Mock CRM is used ONLY when USE_MOCK_CRM=1 is explicitly set.
 *  - When VERCEL or VERCEL_ENV is set, USE_MOCK_CRM is completely ignored.
 *  - For non-mock builds, CRM_API_KEY is required and the upstream CRM is verified
 *    via 3 authenticated attempts (5s timeout) to /projects?limit=1.
 *  - If unreachable or 401/403, fails with exit code 1 to prevent deploying
 *    broken/stale builds.
 *  - Never injects mock keys or mock URLs into real builds.
 */

import { spawn } from 'node:child_process';
import net from 'node:net';
import { startMockCrm } from './mock-crm.mjs';

const DEFAULT_CRM_BASE_URL = 'https://api.bharatproperties.co/api/public';

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, '127.0.0.1', () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}

async function verifyCrmReachability(baseUrl, apiKey) {
  const url = `${baseUrl.replace(/\/+$/, '')}/projects?limit=1`;
  const maxAttempts = 3;
  const timeoutMs = 5000;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`[build] Verifying upstream CRM authentication (attempt ${attempt}/${maxAttempts}) at ${url}...`);
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-API-KEY': apiKey,
          'Authorization': `Bearer ${apiKey}`,
        },
        signal: AbortSignal.timeout(timeoutMs),
      });

      if (res.status === 401 || res.status === 403) {
        console.error(`[build] ❌ CRM Authentication Failed: HTTP ${res.status}. Invalid or unauthorized CRM_API_KEY.`);
        return { ok: false, status: res.status, reason: 'AUTH_FAILED' };
      }

      if (res.ok) {
        console.log(`[build] ✅ Upstream CRM reachable and authenticated (HTTP ${res.status}).`);
        return { ok: true, status: res.status };
      }

      console.warn(`[build] ⚠️ CRM responded with HTTP ${res.status}.`);
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (err) {
      console.warn(`[build] ⚠️ Connection error on attempt ${attempt}: ${err.message}`);
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  }

  return { ok: false, reason: 'UNREACHABLE' };
}

async function run() {
  const isVercel = Boolean(process.env.VERCEL || process.env.VERCEL_ENV);
  const requestedMock = process.env.USE_MOCK_CRM === '1';

  if (isVercel && requestedMock) {
    console.warn('[build] ⚠️ Detected Vercel deployment environment. Overriding USE_MOCK_CRM=1 -> Real CRM required.');
  }

  const useMockCrm = !isVercel && requestedMock;
  let mockCrmHandle = null;

  const buildEnv = {
    ...process.env,
    NODE_NO_WARNINGS: '1',
  };

  if (useMockCrm) {
    const port = await getFreePort();
    console.log(`[build] 🧪 USE_MOCK_CRM=1 active (Local/CI). Starting mock CRM on port ${port}...`);
    mockCrmHandle = await startMockCrm(port);
    buildEnv.CRM_API_BASE_URL = `http://127.0.0.1:${port}/api/public`;
    buildEnv.CRM_API_KEY = buildEnv.CRM_API_KEY || 'mock-build-key';
  } else {
    // Non-mock build: strictly require CRM_API_KEY and check upstream
    const apiKey = process.env.CRM_API_KEY?.trim();
    if (!apiKey) {
      console.error('\n[build] ❌ BLOCKER ERROR: CRM_API_KEY is required for production builds.');
      console.error('[build] To run in local/CI test mode with mock data, pass USE_MOCK_CRM=1 explicitly.\n');
      process.exit(1);
    }

    const crmBaseUrl = process.env.CRM_API_BASE_URL?.trim() || DEFAULT_CRM_BASE_URL;
    buildEnv.CRM_API_BASE_URL = crmBaseUrl;

    const check = await verifyCrmReachability(crmBaseUrl, apiKey);
    if (!check.ok) {
      console.error('\n[build] ❌ BLOCKER ERROR: Upstream CRM is unreachable or unauthorized.');
      console.error(`[build] URL: ${crmBaseUrl}`);
      console.error(`[build] Failure Reason: ${check.reason || 'UNREACHABLE'}`);
      console.error('[build] Build aborted to prevent deploying broken static pages.\n');
      process.exit(1);
    }
  }

  const proc = spawn('npx', ['next', 'build'], {
    env: buildEnv,
    stdio: 'inherit',
  });

  proc.on('close', async (code) => {
    if (mockCrmHandle) {
      try {
        await mockCrmHandle.close();
      } catch {
        /* ignore */
      }
    }
    process.exit(code || 0);
  });
}

run();
