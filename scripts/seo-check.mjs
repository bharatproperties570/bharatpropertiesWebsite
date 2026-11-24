/**
 * Enterprise SEO & SSR Quality Gate Check Suite
 *
 * Starts the Mock CRM and the built Next.js production server,
 * then rigorously verifies:
 *  - HTTP status codes (200, 404, 308 redirect)
 *  - Non-empty <title>
 *  - Canonical tag (starting with https://www.bharatproperties.co)
 *  - Robots meta tag (index/follow for canonical pages, noindex for 404)
 *  - Exactly one <h1> element per page
 *  - At least one valid JSON-LD (<script type="application/ld+json">) block
 *  - Entity name ("Bharat Properties") present in raw HTML
 *  - /sitemap.xml validity and content
 *  - /robots.txt validity and content
 *  - 308 permanent redirect for legacy blog slugs
 */

import { spawn } from 'node:child_process';
import http from 'node:http';
import net from 'node:net';
import { startMockCrm } from './mock-crm.mjs';

// Helper: Find an unused TCP port
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

// Helper: Poll until HTTP server responds
async function waitForServer(url, timeoutMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.status === 200) return true;
    } catch {
      // Server not ready yet
    }
    await new Promise((r) => setTimeout(r, 600));
  }
  throw new Error(`Server at ${url} failed to start within ${timeoutMs}ms`);
}

// Extraction helpers
function extractTitle(html) {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match ? match[1].trim() : null;
}

function extractCanonical(html) {
  // Matches <link rel="canonical" href="..." /> or <link href="..." rel="canonical" />
  const match =
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
    html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  return match ? match[1].trim() : null;
}

function extractRobotsMeta(html) {
  const match = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
  return match ? match[1].trim() : null;
}

function countH1(html) {
  const matches = html.match(/<h1[\s>]/gi);
  return matches ? matches.length : 0;
}

function extractJsonLdBlocks(html) {
  const blocks = [];
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    blocks.push(match[1]);
  }
  return blocks;
}

async function run() {
  console.log('======================================================');
  console.log('🚀 Bharat Properties - SEO & Quality Gate Check Suite');
  console.log('======================================================\n');

  let mockCrmHandle = null;
  let nextProc = null;

  try {
    const crmPort = await getFreePort();
    const nextPort = await getFreePort();

    console.log(`[1/4] Starting Mock CRM on port ${crmPort}...`);
    mockCrmHandle = await startMockCrm(crmPort);

    console.log(`[2/4] Starting Next.js production server on port ${nextPort}...`);
    const env = {
      ...process.env,
      PORT: String(nextPort),
      NODE_ENV: 'production',
      CRM_API_BASE_URL: `http://127.0.0.1:${crmPort}/api/public`,
      CRM_API_KEY: 'mock-enterprise-test-key',
      NEXT_PUBLIC_SITE_URL: 'https://www.bharatproperties.co',
    };

    nextProc = spawn('npx', ['next', 'start', '-p', String(nextPort)], {
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    nextProc.stdout.on('data', (d) => {
      const msg = d.toString();
      if (process.env.DEBUG) console.log(`[next.js] ${msg.trim()}`);
    });
    nextProc.stderr.on('data', (d) => {
      const msg = d.toString();
      if (process.env.DEBUG || msg.includes('Error')) console.error(`[next.js error] ${msg.trim()}`);
    });

    console.log('[3/4] Awaiting server readiness via /api/health...');
    const baseUrl = `http://127.0.0.1:${nextPort}`;
    await waitForServer(`${baseUrl}/api/health`, 45000);
    console.log('      Next.js server is ready!\n');

    console.log('[4/4] Executing Assertions...\n');
    let failures = 0;
    let passes = 0;

    function assert(condition, message, details = '') {
      if (condition) {
        console.log(`  ✅ PASS: ${message}`);
        passes++;
      } else {
        console.error(`  ❌ FAIL: ${message}${details ? ` -> ${details}` : ''}`);
        failures++;
      }
    }

    // 1. Core Page Assertions Helper
    async function assertPage(pathname, expectedH1Count = 1, pageType = 'Page', requireJsonLd = true) {
      console.log(`\n--- Testing ${pageType} [${pathname}] ---`);
      const url = `${baseUrl}${pathname}`;
      const res = await fetch(url, { redirect: 'manual' });
      assert(res.status === 200, `${pageType} returns HTTP 200`, `Got ${res.status}`);

      const html = await res.text();

      // Title
      const title = extractTitle(html);
      assert(
        title && title.length > 5,
        `${pageType} has non-empty <title>`,
        `Found title: "${title}"`
      );

      // Canonical link
      const canonical = extractCanonical(html);
      assert(
        canonical && canonical.startsWith('https://www.bharatproperties.co'),
        `${pageType} has canonical starting with www domain`,
        `Found canonical: "${canonical}"`
      );

      // Robots meta
      const robots = extractRobotsMeta(html);
      const isNotNoindexed = !robots || !robots.toLowerCase().includes('noindex');
      assert(isNotNoindexed, `${pageType} is not flagged with noindex`, `Robots content: "${robots}"`);

      // Exactly one H1
      const h1Count = countH1(html);
      assert(
        h1Count === expectedH1Count,
        `${pageType} has exactly ${expectedH1Count} <h1> element(s)`,
        `Found ${h1Count} <h1> tag(s)`
      );

      // JSON-LD schema
      const jsonLdBlocks = extractJsonLdBlocks(html);
      if (requireJsonLd) {
        assert(
          jsonLdBlocks.length >= 1,
          `${pageType} has >= 1 application/ld+json block`,
          `Found ${jsonLdBlocks.length} block(s)`
        );

        let allJsonValid = true;
        for (const block of jsonLdBlocks) {
          try {
            JSON.parse(block);
          } catch (e) {
            allJsonValid = false;
            assert(false, `${pageType} JSON-LD parses cleanly`, e.message);
          }
        }
        if (jsonLdBlocks.length >= 1 && allJsonValid) {
          assert(true, `${pageType} JSON-LD parses valid JSON`);
        }
      } else if (jsonLdBlocks.length > 0) {
        for (const block of jsonLdBlocks) {
          try {
            JSON.parse(block);
          } catch (e) {
            assert(false, `${pageType} optional JSON-LD parses cleanly`, e.message);
          }
        }
      }

      // Entity name in raw HTML
      const hasEntity = html.includes('Bharat Properties');
      assert(hasEntity, `${pageType} includes entity name "Bharat Properties" in raw HTML`);
    }

    // Test Home Page
    await assertPage('/', 1, 'Home Page', true);

    // Test About Page
    await assertPage('/about', 1, 'About Page', true);

    // Test Blog Index Page
    await assertPage('/blog', 1, 'Blog Index Page', true);

    // Test Locations Page
    await assertPage('/locations', 1, 'Locations Page', false);

    // Test Calculator Page
    await assertPage('/calculator', 1, 'Calculator Page', false);

    // Test City Page
    await assertPage('/mohali', 1, 'City Page (Mohali)', true);

    // Test Project Page
    await assertPage('/project/mock-project-1', 1, 'Project Detail Page', true);

    // Test Property Page (Standard)
    await assertPage('/property/mock-prop-1', 1, 'Property Detail Page', true);

    // Test Property Page (Sparse / Missing Optional Fields)
    await assertPage(
      '/property/mock-prop-sparse',
      1,
      'Sparse Property Detail Page (Degraded Optional Fields)',
      true
    );

    // Test Blog Post Page
    await assertPage(
      '/blog/top-5-investment-locations-in-north-india-for-2026',
      1,
      'Blog Post Page',
      true
    );

    // Test Unknown URL (404 Page)
    console.log('\n--- Testing Unknown URL [/unknown-404-test-page] ---');
    const notFoundRes = await fetch(`${baseUrl}/unknown-404-test-page`, { redirect: 'manual' });
    assert(notFoundRes.status === 404, 'Unknown URL returns HTTP 404', `Got ${notFoundRes.status}`);
    const notFoundHtml = await notFoundRes.text();
    const notFoundRobots = extractRobotsMeta(notFoundHtml);
    assert(
      notFoundRobots && notFoundRobots.toLowerCase().includes('noindex'),
      '404 Page includes robots noindex meta tag',
      `Found robots: "${notFoundRobots}"`
    );
    assert(
      notFoundHtml.includes('Bharat Properties') || notFoundHtml.includes('404'),
      '404 Page is branded with entity or status'
    );

    // Test Legacy Blog Redirect (308)
    console.log('\n--- Testing Legacy Blog Redirect [/blog/blog-1] ---');
    const redirectRes = await fetch(`${baseUrl}/blog/blog-1`, { redirect: 'manual' });
    assert(
      redirectRes.status === 308,
      'Legacy blog slug /blog/blog-1 returns HTTP 308 Permanent Redirect',
      `Got ${redirectRes.status}`
    );
    const location = redirectRes.headers.get('location');
    assert(
      location === '/blog/top-5-investment-locations-in-north-india-for-2026',
      'Redirect Location matches descriptive slug',
      `Location header: "${location}"`
    );

    // Test /sitemap.xml
    console.log('\n--- Testing Sitemap [/sitemap.xml] ---');
    const sitemapRes = await fetch(`${baseUrl}/sitemap.xml`);
    assert(sitemapRes.status === 200, '/sitemap.xml returns HTTP 200', `Got ${sitemapRes.status}`);
    const sitemapText = await sitemapRes.text();
    assert(
      sitemapText.includes('<urlset') && sitemapText.includes('</urlset>'),
      '/sitemap.xml contains valid <urlset> wrapper'
    );
    assert(
      sitemapText.includes('https://www.bharatproperties.co'),
      '/sitemap.xml contains canonical domain URLs'
    );

    // Verify sitemap lists all 25 mock listings via all=1 export
    const sitemapListingMatches = sitemapText.match(/\/property\/mock-prop-[a-z0-9-]+/g) || [];
    const uniqueSitemapListings = new Set(sitemapListingMatches);
    assert(
      uniqueSitemapListings.size >= 25,
      `Sitemap lists all 25 listings (found ${uniqueSitemapListings.size}) via server all=1 export`,
      `Found ${uniqueSitemapListings.size} listing URLs in sitemap`
    );

    // Test Mock CRM Pagination & Full Export Invariants
    console.log('\n--- Testing CRM Pagination & Full Export Invariants ---');
    const defaultListingsRes = await fetch(`http://127.0.0.1:${crmPort}/api/public/listings`);
    const defaultListingsData = await defaultListingsRes.json();
    assert(
      defaultListingsData.success && defaultListingsData.data?.length === 10,
      'Default CRM /listings call returns exactly 10 listings',
      `Got ${defaultListingsData.data?.length} listings (total: ${defaultListingsData.total})`
    );

    const allListingsRes = await fetch(`http://127.0.0.1:${crmPort}/api/public/listings?all=1`);
    const allListingsData = await allListingsRes.json();
    assert(
      allListingsData.success && allListingsData.data?.length === 25,
      'CRM /listings?all=1 call returns all 25 listings',
      `Got ${allListingsData.data?.length} listings (total: ${allListingsData.total})`
    );

    // Test Proxy Query Stripping: all=1 stripped, visitor receives default (10) not all (25)
    console.log('\n--- Testing Proxy Parameter Stripping & Clamping ---');
    const proxyAllRes = await fetch(`${baseUrl}/api/public/listings?all=1`);
    assert(proxyAllRes.status === 200, '/api/public/listings?all=1 returns HTTP 200');
    const proxyAllData = await proxyAllRes.json();
    assert(
      proxyAllData.data && proxyAllData.data.length === 10,
      'Proxy stripped all=1, returning default 10 listings instead of full 25 export',
      `Got ${proxyAllData.data?.length} listings`
    );

    // Test /robots.txt
    console.log('\n--- Testing Robots [/robots.txt] ---');
    const robotsRes = await fetch(`${baseUrl}/robots.txt`);
    assert(robotsRes.status === 200, '/robots.txt returns HTTP 200', `Got ${robotsRes.status}`);
    const robotsText = await robotsRes.text();
    assert(
      /user-agent:\s*\*/i.test(robotsText),
      '/robots.txt defines User-agent rules'
    );
    assert(
      /sitemap:\s*https:\/\/www\.bharatproperties\.co\/sitemap\.xml/i.test(robotsText),
      '/robots.txt links to canonical sitemap'
    );

    // Test /api/csp-report
    console.log('\n--- Testing CSP Reporting Endpoint [/api/csp-report] ---');
    const cspPostRes = await fetch(`${baseUrl}/api/csp-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/csp-report' },
      body: JSON.stringify({
        'csp-report': {
          'document-uri': 'https://www.bharatproperties.co/',
          'violated-directive': 'img-src',
          'blocked-uri': 'http://evil.com/fake.png',
        },
      }),
    });
    assert(
      cspPostRes.status === 204,
      '/api/csp-report returns HTTP 204 on valid report POST',
      `Got ${cspPostRes.status}`
    );

    const cspGetRes = await fetch(`${baseUrl}/api/csp-report`, { method: 'GET' });
    assert(
      cspGetRes.status === 405,
      '/api/csp-report rejects GET with HTTP 405 Method Not Allowed',
      `Got ${cspGetRes.status}`
    );

    console.log('\n======================================================');
    console.log(`Quality Gate Summary: ${passes} Passed, ${failures} Failed`);
    console.log('======================================================\n');

    if (failures > 0) {
      console.error(`❌ SEO & Quality Check FAILED with ${failures} assertion error(s).`);
      process.exit(1);
    } else {
      console.log('🎉 All SEO, SSR, Redirect & Schema Quality Gates PASSED!');
      process.exit(0);
    }
  } catch (error) {
    console.error('Fatal error during SEO check execution:', error);
    process.exit(1);
  } finally {
    if (nextProc) {
      try {
        nextProc.kill('SIGTERM');
      } catch {
        /* ignore */
      }
    }
    if (mockCrmHandle) {
      try {
        await mockCrmHandle.close();
      } catch {
        /* ignore */
      }
    }
  }
}

run();
