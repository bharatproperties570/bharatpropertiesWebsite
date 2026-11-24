#!/usr/bin/env node

/**
 * Production Cutover & Post-Deploy Read-Only Verification Suite
 *
 * Performs read-only HTTP checks against target production or preview environment.
 * NEVER writes to databases, never sends valid lead data, and never outputs customer data.
 *
 * Usage:
 *   node scripts/post-deploy-verify.mjs [baseUrl]
 *   npm run verify:prod
 */

import {
  countLocEntries,
  countH1,
  extractTitle,
  extractCanonical,
  parseAllJsonLdBlocks,
  hasNoindex,
  findForbiddenStrings,
  isValidXml,
} from './verify-helpers.mjs';

const TARGET_URL = (
  process.argv[2] ||
  process.env.VERIFY_BASE_URL ||
  'https://www.bharatproperties.co'
).replace(/\/+$/, '');

const CANONICAL_DOMAIN = 'https://www.bharatproperties.co';

console.log('================================================================');
console.log('🛡️  Bharat Properties - Post-Deploy Production Verification');
console.log(`    Target Base URL: ${TARGET_URL}`);
console.log(`    Timestamp:       ${new Date().toISOString()}`);
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function pass(desc, detail = '') {
  passCount++;
  console.log(`  ✅ PASS: ${desc}${detail ? ` (${detail})` : ''}`);
}

function fail(desc, detail = '') {
  failCount++;
  console.error(`  ❌ FAIL: ${desc}${detail ? ` -> ${detail}` : ''}`);
}

function resolveTargetUrl(targetBase, fullUrl) {
  try {
    const parsed = new URL(fullUrl);
    const base = new URL(targetBase);
    parsed.protocol = base.protocol;
    parsed.host = base.host;
    return parsed.toString();
  } catch {
    return fullUrl;
  }
}

function sampleRandom(arr, count) {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, arr.length));
}

async function run() {
  // 1. /api/health check
  console.log('--- 1. API Health Check [/api/health] ---');
  try {
    const res = await fetch(`${TARGET_URL}/api/health`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
    });
    if (res.status === 200) {
      const data = await res.json().catch(() => ({}));
      if (data.crmReachable === true) {
        pass('/api/health returns HTTP 200 with crmReachable: true');
      } else {
        fail('/api/health did not return crmReachable: true', `crmReachable = ${data.crmReachable}`);
      }
    } else {
      fail('/api/health returned non-200 status', `HTTP ${res.status}`);
    }
  } catch (err) {
    fail('/api/health network request failed', err.message);
  }

  // 2. Core pages check: /, /kurukshetra, /mohali, /about, /blog
  console.log('\n--- 2. Core Pages Verification ---');
  const corePages = ['/', '/kurukshetra', '/mohali', '/about', '/blog'];
  let homeHtml = '';
  let homeHeaders = null;

  for (const pagePath of corePages) {
    const pageUrl = `${TARGET_URL}${pagePath}`;
    try {
      const res = await fetch(pageUrl, {
        headers: { Accept: 'text/html' },
        signal: AbortSignal.timeout(10000),
      });

      if (pagePath === '/') {
        homeHeaders = res.headers;
      }

      if (res.status !== 200) {
        fail(`${pagePath} returned unexpected status`, `HTTP ${res.status}`);
        continue;
      }

      const html = await res.text();
      if (pagePath === '/') homeHtml = html;

      // Check <h1> count
      const h1Count = countH1(html);
      if (h1Count === 1) {
        pass(`${pagePath} has exactly one <h1>`);
      } else {
        fail(`${pagePath} has invalid <h1> count`, `Found ${h1Count}`);
      }

      // Check canonical
      const canonical = extractCanonical(html);
      if (canonical && (canonical === CANONICAL_DOMAIN || canonical.startsWith(`${CANONICAL_DOMAIN}/`))) {
        pass(`${pagePath} canonical is on ${CANONICAL_DOMAIN}`, canonical);
      } else {
        fail(`${pagePath} canonical is missing or incorrect`, canonical || 'None');
      }

      // Check title
      const title = extractTitle(html);
      if (title && title.length > 0) {
        pass(`${pagePath} has non-empty <title>`);
      } else {
        fail(`${pagePath} has empty or missing <title>`);
      }

      // Check JSON-LD
      const jsonLdInfo = parseAllJsonLdBlocks(html);
      if (jsonLdInfo.validCount >= 1) {
        pass(`${pagePath} contains valid JSON-LD schema`, `Found ${jsonLdInfo.validCount} block(s)`);
      } else {
        fail(`${pagePath} missing valid parseable JSON-LD blocks`, `Found ${jsonLdInfo.validCount}`);
      }
    } catch (err) {
      fail(`${pagePath} fetch error`, err.message);
    }
  }

  // 2b. Utility pages check: /calculator, /locations, /privacy, /terms
  console.log('\n--- 2b. Utility Pages Verification (H1, Title, Canonical Required; JSON-LD Optional) ---');
  const utilityPages = ['/calculator', '/locations', '/privacy', '/terms'];

  for (const pagePath of utilityPages) {
    const pageUrl = `${TARGET_URL}${pagePath}`;
    try {
      const res = await fetch(pageUrl, {
        headers: { Accept: 'text/html' },
        signal: AbortSignal.timeout(10000),
      });

      if (res.status !== 200) {
        fail(`${pagePath} returned unexpected status`, `HTTP ${res.status}`);
        continue;
      }

      const html = await res.text();

      // Check <h1> count
      const h1Count = countH1(html);
      if (h1Count === 1) {
        pass(`${pagePath} has exactly one <h1>`);
      } else {
        fail(`${pagePath} has invalid <h1> count`, `Found ${h1Count}`);
      }

      // Check canonical
      const canonical = extractCanonical(html);
      if (canonical && (canonical === CANONICAL_DOMAIN || canonical.startsWith(`${CANONICAL_DOMAIN}/`))) {
        pass(`${pagePath} canonical is on ${CANONICAL_DOMAIN}`, canonical);
      } else {
        fail(`${pagePath} canonical is missing or incorrect`, canonical || 'None');
      }

      // Check title
      const title = extractTitle(html);
      if (title && title.length > 0) {
        pass(`${pagePath} has non-empty <title>`);
      } else {
        fail(`${pagePath} has empty or missing <title>`);
      }

      // JSON-LD is optional; if present, must parse cleanly
      const jsonLdInfo = parseAllJsonLdBlocks(html);
      if (jsonLdInfo.count > 0) {
        if (jsonLdInfo.validCount === jsonLdInfo.count) {
          pass(`${pagePath} optional JSON-LD parsed validly`, `Found ${jsonLdInfo.validCount} block(s)`);
        } else {
          fail(`${pagePath} contains malformed JSON-LD`, `${jsonLdInfo.validCount}/${jsonLdInfo.count} valid`);
        }
      } else {
        pass(`${pagePath} JSON-LD check (optional, none present)`);
      }
    } catch (err) {
      fail(`${pagePath} fetch error`, err.message);
    }
  }

  // 3. /delhi returns noindex
  console.log('\n--- 3. Non-Allowed City [/delhi] ---');
  try {
    const res = await fetch(`${TARGET_URL}/delhi`, {
      redirect: 'manual',
      signal: AbortSignal.timeout(10000),
    });
    const html = await res.text();
    const markedNoindex = hasNoindex(res.headers, html);
    if (markedNoindex) {
      pass('/delhi returns noindex directive (via meta robots or header)');
    } else {
      fail('/delhi did not return noindex');
    }
  } catch (err) {
    fail('/delhi fetch error', err.message);
  }

  // 4. Unknown URL returns 404 with noindex
  console.log('\n--- 4. Unknown Route Handling ---');
  const unknownPath = `/unknown-route-check-${Date.now()}`;
  try {
    const res = await fetch(`${TARGET_URL}${unknownPath}`, {
      redirect: 'manual',
      signal: AbortSignal.timeout(10000),
    });
    const html = await res.text();
    const is404 = res.status === 404;
    const markedNoindex = hasNoindex(res.headers, html);

    if (is404 && markedNoindex) {
      pass('Unknown URL returns HTTP 404 with noindex');
    } else {
      fail('Unknown URL failed 404/noindex invariant', `status=${res.status}, noindex=${markedNoindex}`);
    }
  } catch (err) {
    fail('Unknown URL probe failed', err.message);
  }

  // 5. /blog/blog-1 returns 308 redirect
  console.log('\n--- 5. Legacy Blog Slug Redirect [/blog/blog-1] ---');
  try {
    const res = await fetch(`${TARGET_URL}/blog/blog-1`, {
      redirect: 'manual',
      signal: AbortSignal.timeout(10000),
    });
    if (res.status === 308) {
      const location = res.headers.get('location') || '';
      if (location.includes('/blog/top-5-investment-locations-in-north-india-for-2026')) {
        pass('/blog/blog-1 returns HTTP 308 redirecting to descriptive slug');
      } else {
        fail('/blog/blog-1 redirected to unexpected location', location);
      }
    } else {
      fail('/blog/blog-1 returned non-308 status', `HTTP ${res.status}`);
    }
  } catch (err) {
    fail('/blog/blog-1 probe failed', err.message);
  }

  // 6. /sitemap.xml validation and sampled deep checks
  console.log('\n--- 6. Sitemap Validation & Deep Sample Check ---');
  let sitemapXml = '';
  let sampledProjectHtml = '';
  let sampledPropertyHtml = '';

  try {
    const res = await fetch(`${TARGET_URL}/sitemap.xml`, {
      signal: AbortSignal.timeout(15000),
    });
    if (res.status === 200) {
      sitemapXml = await res.text();
      if (isValidXml(sitemapXml)) {
        pass('/sitemap.xml returns HTTP 200 and valid XML structure');
      } else {
        fail('/sitemap.xml is not valid XML');
      }

      const sitemapStats = countLocEntries(sitemapXml);
      console.log(`     📊 Sitemap Total URLs:    ${sitemapStats.total}`);
      console.log(`     📊 Sitemap Property URLs: ${sitemapStats.propertyUrls.length}`);
      console.log(`     📊 Sitemap Project URLs:  ${sitemapStats.projectUrls.length}`);

      if (sitemapStats.total > 0) {
        pass('/sitemap.xml contains valid <loc> entries', `count=${sitemapStats.total}`);
      } else {
        fail('/sitemap.xml contains 0 <loc> entries');
      }

      // Sample up to 5 properties and up to 5 projects
      const sampledProps = sampleRandom(sitemapStats.propertyUrls, 5);
      const sampledProjects = sampleRandom(sitemapStats.projectUrls, 5);

      for (const propUrl of sampledProps) {
        const fetchUrl = resolveTargetUrl(TARGET_URL, propUrl);
        try {
          const propRes = await fetch(fetchUrl, { signal: AbortSignal.timeout(10000) });
          if (propRes.status === 200) {
            const html = await propRes.text();
            if (!sampledPropertyHtml) sampledPropertyHtml = html;
            const h1Count = countH1(html);
            const jsonLdInfo = parseAllJsonLdBlocks(html);
            if (h1Count === 1 && jsonLdInfo.validCount >= 1) {
              pass(`Sampled property returns 200, 1 H1, valid JSON-LD (${new URL(propUrl).pathname})`);
            } else {
              fail(`Sampled property check failed (${new URL(propUrl).pathname})`, `h1=${h1Count}, jsonLd=${jsonLdInfo.validCount}`);
            }
          } else {
            fail(`Sampled property URL returned non-200 (${new URL(propUrl).pathname})`, `HTTP ${propRes.status}`);
          }
        } catch (err) {
          fail(`Sampled property URL fetch error (${propUrl})`, err.message);
        }
      }

      for (const projUrl of sampledProjects) {
        const fetchUrl = resolveTargetUrl(TARGET_URL, projUrl);
        try {
          const projRes = await fetch(fetchUrl, { signal: AbortSignal.timeout(10000) });
          if (projRes.status === 200) {
            const html = await projRes.text();
            if (!sampledProjectHtml) sampledProjectHtml = html;
            const h1Count = countH1(html);
            const jsonLdInfo = parseAllJsonLdBlocks(html);
            if (h1Count === 1 && jsonLdInfo.validCount >= 1) {
              pass(`Sampled project returns 200, 1 H1, valid JSON-LD (${new URL(projUrl).pathname})`);
            } else {
              fail(`Sampled project check failed (${new URL(projUrl).pathname})`, `h1=${h1Count}, jsonLd=${jsonLdInfo.validCount}`);
            }
          } else {
            fail(`Sampled project URL returned non-200 (${new URL(projUrl).pathname})`, `HTTP ${projRes.status}`);
          }
        } catch (err) {
          fail(`Sampled project URL fetch error (${projUrl})`, err.message);
        }
      }
    } else {
      fail('/sitemap.xml returned non-200 status', `HTTP ${res.status}`);
    }
  } catch (err) {
    fail('/sitemap.xml probe failed', err.message);
  }

  // 7. Mock strings scan: Home, Project, Property, Sitemap
  console.log('\n--- 7. Mock Strings Production Leak Scan ---');
  // When testing production, 'localhost' is forbidden. When testing against a local host URL, omit 'localhost' from forbidden.
  const isLocalTarget = TARGET_URL.includes('localhost') || TARGET_URL.includes('127.0.0.1');
  const forbiddenList = isLocalTarget
    ? ['mock-project', 'mock-prop', 'Test Heights']
    : ['mock-project', 'mock-prop', 'Test Heights', 'localhost'];

  const pagesToScan = [
    { name: 'Home Page', content: homeHtml },
    { name: 'Sitemap XML', content: sitemapXml },
    { name: 'Sampled Project Page', content: sampledProjectHtml },
    { name: 'Sampled Property Page', content: sampledPropertyHtml },
  ];

  for (const page of pagesToScan) {
    if (!page.content) {
      // If content was not fetched due to earlier failure, report that
      continue;
    }
    const leaks = findForbiddenStrings(page.content, forbiddenList);
    if (leaks.length === 0) {
      pass(`${page.name} body contains NO forbidden mock strings`);
    } else {
      fail(`${page.name} body contains forbidden mock strings`, leaks.join(', '));
    }
  }

  // 8. /robots.txt validation
  console.log('\n--- 8. Robots Configuration [/robots.txt] ---');
  try {
    const res = await fetch(`${TARGET_URL}/robots.txt`, { signal: AbortSignal.timeout(10000) });
    if (res.status === 200) {
      const text = await res.text();
      const hasSitemap = /sitemap:\s*https:\/\/[^\s]+\/sitemap\.xml/i.test(text);
      const disallowsApi = /disallow:\s*\/api\//i.test(text);

      if (hasSitemap) {
        pass('/robots.txt contains sitemap URL');
      } else {
        fail('/robots.txt missing sitemap reference');
      }

      if (disallowsApi) {
        pass('/robots.txt disallows /api/ indexing');
      } else {
        fail('/robots.txt does not disallow /api/');
      }
    } else {
      fail('/robots.txt returned non-200 status', `HTTP ${res.status}`);
    }
  } catch (err) {
    fail('/robots.txt fetch error', err.message);
  }

  // 9. Response headers on /
  console.log('\n--- 9. Security Response Headers on [/] ---');
  if (homeHeaders) {
    const requiredHeaders = [
      'strict-transport-security',
      'x-content-type-options',
      'referrer-policy',
      'permissions-policy',
    ];

    for (const h of requiredHeaders) {
      if (homeHeaders.has(h)) {
        pass(`Header ${h} is present`);
      } else {
        fail(`Missing required security header: ${h}`);
      }
    }

    // CSP Report-Only or Enforced CSP
    const hasCsp =
      homeHeaders.has('content-security-policy-report-only') ||
      homeHeaders.has('content-security-policy');
    if (hasCsp) {
      pass('Content Security Policy header is present');
    } else {
      fail('Missing Content-Security-Policy header');
    }

    // Must NOT have X-Powered-By
    if (!homeHeaders.has('x-powered-by')) {
      pass('Header X-Powered-By is absent');
    } else {
      fail('Header X-Powered-By is leaked', homeHeaders.get('x-powered-by'));
    }
  } else {
    fail('Could not verify headers on / because home fetch failed');
  }

  // 10. POST /api/public/submit-lead origin protection
  console.log('\n--- 10. Origin Protection [POST /api/public/submit-lead] ---');
  try {
    const res = await fetch(`${TARGET_URL}/api/public/submit-lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://evil.example',
      },
      body: JSON.stringify({}),
      signal: AbortSignal.timeout(10000),
    });

    if (res.status === 403) {
      pass('POST /api/public/submit-lead with foreign Origin returns HTTP 403');
    } else {
      fail('POST /api/public/submit-lead did not block cross-origin request', `HTTP ${res.status}`);
    }
  } catch (err) {
    fail('Cross-origin lead POST probe error', err.message);
  }

  // 11. GET /api/public/admin/users
  console.log('\n--- 11. Admin Path Protection [GET /api/public/admin/users] ---');
  try {
    const res = await fetch(`${TARGET_URL}/api/public/admin/users`, {
      method: 'GET',
      signal: AbortSignal.timeout(10000),
    });

    if (res.status === 404 || res.status === 405) {
      pass(`GET /api/public/admin/users blocked with HTTP ${res.status}`);
    } else {
      fail('GET /api/public/admin/users returned unexpected status', `HTTP ${res.status}`);
    }
  } catch (err) {
    fail('Admin path probe error', err.message);
  }

  // 12. Final summary
  console.log('\n================================================================');
  console.log(`📊 Post-Deploy Verification Summary: ${passCount} Passed, ${failCount} Failed`);
  console.log('================================================================');

  if (failCount > 0) {
    console.error('\n🚨 Verification FAILED. Do NOT cut over production traffic.\n');
    process.exit(1);
  } else {
    console.log('\n✨ All post-deployment verification checks PASSED successfully.\n');
    process.exit(0);
  }
}

run().catch((err) => {
  console.error('Fatal runner error:', err);
  process.exit(1);
});
