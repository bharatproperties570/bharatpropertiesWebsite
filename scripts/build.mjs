/**
 * Production Build Script with Automated Mock CRM Fallback
 *
 * Checks if the configured CRM API is reachable.
 * If live CRM is not reachable (e.g. offline local build or CI),
 * spins up the local mock CRM server during static page generation
 * and cleanly tears it down upon build completion.
 */

import { spawn } from 'node:child_process';
import net from 'node:net';
import { startMockCrm } from './mock-crm.mjs';

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

async function isCrmReachable(url) {
  try {
    const res = await fetch(`${url}/public-settings`, {
      signal: AbortSignal.timeout(1000),
    });
    return res.status < 500;
  } catch {
    return false;
  }
}

async function run() {
  let mockCrmHandle = null;
  const envCrmUrl = process.env.CRM_API_BASE_URL || 'http://localhost:4000/api/public';
  const crmHealthy = await isCrmReachable(envCrmUrl);

  const buildEnv = {
    ...process.env,
    NODE_NO_WARNINGS: '1',
  };

  if (crmHealthy) {
    console.log(`[build] Upstream CRM is reachable at ${envCrmUrl}`);
  } else {
    const port = await getFreePort();
    console.log(`[build] CRM offline at ${envCrmUrl}; starting mock CRM on port ${port} for static generation...`);
    mockCrmHandle = await startMockCrm(port);
    buildEnv.CRM_API_BASE_URL = `http://127.0.0.1:${port}/api/public`;
    buildEnv.CRM_API_KEY = buildEnv.CRM_API_KEY || 'mock-build-key';
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
