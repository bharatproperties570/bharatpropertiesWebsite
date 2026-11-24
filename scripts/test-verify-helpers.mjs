/**
 * Unit Test Suite: Verification Helper Functions
 *
 * Verifies pure helper functions used in post-deploy checks:
 * 1. XML <loc> counting and categorisation (property vs project).
 * 2. <h1> tag detection and counting.
 * 3. JSON-LD extraction and schema parsing.
 * 4. Robots noindex evaluation (header & meta tag).
 * 5. Mock string leak scanning.
 * 6. Basic XML structure validation.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  countLocEntries,
  countH1,
  extractTitle,
  extractCanonical,
  extractJsonLdBlocks,
  parseJsonLd,
  parseAllJsonLdBlocks,
  hasNoindex,
  findForbiddenStrings,
  isValidXml,
} from './verify-helpers.mjs';

test('countLocEntries: correctly extracts and counts total, property, and project URLs', () => {
  const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://www.bharatproperties.co/</loc></url>
    <url><loc>https://www.bharatproperties.co/about</loc></url>
    <url><loc>https://www.bharatproperties.co/mohali</loc></url>
    <url><loc>https://www.bharatproperties.co/property/luxury-villa-sector-82-mohali</loc></url>
    <url><loc>https://www.bharatproperties.co/property/commercial-booth-panchkula</loc></url>
    <url><loc>https://www.bharatproperties.co/project/homeland-heights-sector-70</loc></url>
    <url><loc>https://www.bharatproperties.co/project/marbella-grand-itin-sector-88</loc></url>
    <url><loc>https://www.bharatproperties.co/blog/top-locations-2026</loc></url>
  </urlset>`;

  const result = countLocEntries(sampleXml);
  assert.equal(result.total, 8, 'Total loc entries should be 8');
  assert.equal(result.propertyUrls.length, 2, 'Should find 2 property URLs');
  assert.equal(result.projectUrls.length, 2, 'Should find 2 project URLs');
  assert.ok(result.propertyUrls.includes('https://www.bharatproperties.co/property/luxury-villa-sector-82-mohali'));
  assert.ok(result.projectUrls.includes('https://www.bharatproperties.co/project/homeland-heights-sector-70'));
});

test('countLocEntries: handles empty or malformed XML gracefully', () => {
  assert.deepEqual(countLocEntries(''), { total: 0, propertyUrls: [], projectUrls: [], allUrls: [] });
  assert.deepEqual(countLocEntries(null), { total: 0, propertyUrls: [], projectUrls: [], allUrls: [] });
  assert.deepEqual(countLocEntries('<foo>no loc tags here</foo>'), { total: 0, propertyUrls: [], projectUrls: [], allUrls: [] });
});

test('countH1: accurately counts <h1> elements across varying formatting', () => {
  // Exactly 1 H1
  const htmlSingle = `
    <html>
      <body>
        <h1 class="text-4xl font-bold">Bharat Properties</h1>
        <p>Subtitle</p>
      </body>
    </html>
  `;
  assert.equal(countH1(htmlSingle), 1);

  // Multiple H1s (violation)
  const htmlMultiple = `
    <div>
      <H1>First Heading</H1>
      <section>
        <h1 id="secondary">Second Heading</h1>
      </section>
    </div>
  `;
  assert.equal(countH1(htmlMultiple), 2);

  // Zero H1s (violation)
  const htmlNone = `
    <div>
      <h2>Only Subheadings</h2>
      <h3>Level 3</h3>
    </div>
  `;
  assert.equal(countH1(htmlNone), 0);

  // Empty or invalid input
  assert.equal(countH1(''), 0);
  assert.equal(countH1(null), 0);
});

test('extractTitle: retrieves page title text correctly', () => {
  const html = '<head><title>Plots & Flats in Mohali | Bharat Properties</title></head>';
  assert.equal(extractTitle(html), 'Plots & Flats in Mohali | Bharat Properties');
  assert.equal(extractTitle('<div>no title</div>'), null);
});

test('extractCanonical: retrieves canonical link href correctly', () => {
  const html1 = '<link rel="canonical" href="https://www.bharatproperties.co/mohali" />';
  const html2 = '<link href="https://www.bharatproperties.co/about" rel="canonical" />';
  assert.equal(extractCanonical(html1), 'https://www.bharatproperties.co/mohali');
  assert.equal(extractCanonical(html2), 'https://www.bharatproperties.co/about');
  assert.equal(extractCanonical('<div>no canonical</div>'), null);
});

test('JSON-LD: parses single and multiple structured data blocks', () => {
  const htmlWithSchema = `
    <html>
      <head>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Bharat Properties",
            "url": "https://www.bharatproperties.co"
          }
        </script>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": []
          }
        </script>
      </head>
      <body><h1>Title</h1></body>
    </html>
  `;

  const blocks = extractJsonLdBlocks(htmlWithSchema);
  assert.equal(blocks.length, 2, 'Should extract 2 JSON-LD blocks');

  const parsed1 = parseJsonLd(blocks[0]);
  assert.equal(parsed1['@type'], 'RealEstateAgent');
  assert.equal(parsed1.name, 'Bharat Properties');

  const parsed2 = parseJsonLd(blocks[1]);
  assert.equal(parsed2['@type'], 'BreadcrumbList');

  const allSummary = parseAllJsonLdBlocks(htmlWithSchema);
  assert.equal(allSummary.count, 2);
  assert.equal(allSummary.validCount, 2);
});

test('JSON-LD: handles malformed JSON without throwing', () => {
  const malformed = '{ not valid json: 123, }';
  assert.equal(parseJsonLd(malformed), null);

  const htmlMalformed = '<script type="application/ld+json">{ broken json</script>';
  const summary = parseAllJsonLdBlocks(htmlMalformed);
  assert.equal(summary.count, 1);
  assert.equal(summary.validCount, 0);
});

test('hasNoindex: accurately evaluates X-Robots-Tag header and robots meta tag', () => {
  // Case 1: Header has noindex
  assert.equal(hasNoindex({ 'x-robots-tag': 'noindex, nofollow' }, '<html></html>'), true);
  assert.equal(hasNoindex(new Headers({ 'X-Robots-Tag': 'noindex' }), '<html></html>'), true);

  // Case 2: Meta tag has noindex
  const htmlNoindex = '<meta name="robots" content="noindex, nofollow" />';
  assert.equal(hasNoindex({}, htmlNoindex), true);

  // Case 3: Both indicate indexable
  const htmlIndex = '<meta name="robots" content="index, follow" />';
  assert.equal(hasNoindex({ 'x-robots-tag': 'all' }, htmlIndex), false);
  assert.equal(hasNoindex({}, '<html><head></head></html>'), false);
});

test('findForbiddenStrings: flags forbidden mock strings', () => {
  const dirty = 'This listing belongs to mock-project and is hosted on localhost with mock-prop data';
  const found = findForbiddenStrings(dirty);
  assert.deepEqual(found.sort(), ['localhost', 'mock-project', 'mock-prop'].sort());

  const clean = 'Genuine listing in Sector 82 Mohali with verified title';
  assert.deepEqual(findForbiddenStrings(clean), []);
});

test('isValidXml: checks basic sitemap XML structural validity', () => {
  assert.equal(isValidXml('<?xml version="1.0"?><urlset><url></url></urlset>'), true);
  assert.equal(isValidXml('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url></url></urlset>'), true);
  assert.equal(isValidXml('<sitemapindex><sitemap></sitemap></sitemapindex>'), true);
  assert.equal(isValidXml('<html><body>not xml</body></html>'), false);
  assert.equal(isValidXml('<urlset><unclosed>'), false);
  assert.equal(isValidXml(''), false);
});
