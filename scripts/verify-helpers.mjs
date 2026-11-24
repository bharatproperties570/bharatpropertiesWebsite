/**
 * Pure Helper Functions for Post-Deploy & SEO Verification
 *
 * Designed for both CLI verification scripts and unit test assertions.
 * Contains pure string & document parsing logic with zero network side-effects.
 */

/**
 * Extracts and categorizes <loc> URLs from a sitemap XML document.
 *
 * @param {string} xmlString - Raw sitemap XML string
 * @returns {{ total: number, propertyUrls: string[], projectUrls: string[], allUrls: string[] }}
 */
export function countLocEntries(xmlString) {
  if (!xmlString || typeof xmlString !== 'string') {
    return { total: 0, propertyUrls: [], projectUrls: [], allUrls: [] };
  }

  const locRegex = /<loc\s*>([\s\S]*?)<\/loc\s*>/gi;
  const allUrls = [];
  const propertyUrls = [];
  const projectUrls = [];

  let match;
  while ((match = locRegex.exec(xmlString)) !== null) {
    const rawUrl = match[1].trim();
    if (rawUrl) {
      allUrls.push(rawUrl);
      if (rawUrl.includes('/property/')) {
        propertyUrls.push(rawUrl);
      } else if (rawUrl.includes('/project/')) {
        projectUrls.push(rawUrl);
      }
    }
  }

  return {
    total: allUrls.length,
    propertyUrls,
    projectUrls,
    allUrls,
  };
}

/**
 * Counts the occurrences of <h1> tags in an HTML string.
 *
 * @param {string} htmlString - Raw HTML document string
 * @returns {number} Count of <h1> elements
 */
export function countH1(htmlString) {
  if (!htmlString || typeof htmlString !== 'string') return 0;
  const matches = htmlString.match(/<h1[\s>]/gi);
  return matches ? matches.length : 0;
}

/**
 * Extracts the contents of the <title> tag.
 *
 * @param {string} htmlString - Raw HTML document string
 * @returns {string|null} Trimmed title text or null
 */
export function extractTitle(htmlString) {
  if (!htmlString || typeof htmlString !== 'string') return null;
  const match = htmlString.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? match[1].trim() : null;
}

/**
 * Extracts the canonical URL from <link rel="canonical" href="...">
 *
 * @param {string} htmlString - Raw HTML document string
 * @returns {string|null} Canonical URL or null
 */
export function extractCanonical(htmlString) {
  if (!htmlString || typeof htmlString !== 'string') return null;
  const match =
    htmlString.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
    htmlString.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  return match ? match[1].trim() : null;
}

/**
 * Extracts all JSON-LD script blocks from an HTML string.
 *
 * @param {string} htmlString - Raw HTML document string
 * @returns {string[]} Array of raw text contents inside application/ld+json scripts
 */
export function extractJsonLdBlocks(htmlString) {
  if (!htmlString || typeof htmlString !== 'string') return [];
  const blocks = [];
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(htmlString)) !== null) {
    const content = match[1].trim();
    if (content) {
      blocks.push(content);
    }
  }
  return blocks;
}

/**
 * Safely parses a JSON-LD string into an object or array.
 *
 * @param {string} jsonString - Raw JSON-LD string
 * @returns {object|array|null} Parsed JSON-LD or null if invalid
 */
export function parseJsonLd(jsonString) {
  if (!jsonString || typeof jsonString !== 'string') return null;
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}

/**
 * Parses and validates all JSON-LD script blocks in an HTML document.
 *
 * @param {string} htmlString - Raw HTML document string
 * @returns {{ count: number, validCount: number, schemas: any[] }}
 */
export function parseAllJsonLdBlocks(htmlString) {
  const blocks = extractJsonLdBlocks(htmlString);
  const schemas = [];
  for (const block of blocks) {
    const parsed = parseJsonLd(block);
    if (parsed) schemas.push(parsed);
  }
  return {
    count: blocks.length,
    validCount: schemas.length,
    schemas,
  };
}

/**
 * Checks whether a response contains noindex via X-Robots-Tag header or robots <meta> tag.
 *
 * @param {Headers|object} headers - Response headers
 * @param {string} htmlString - Raw HTML document string
 * @returns {boolean} True if marked noindex
 */
export function hasNoindex(headers, htmlString = '') {
  // Check headers
  let xRobots = '';
  if (headers && typeof headers.get === 'function') {
    xRobots = headers.get('x-robots-tag') || '';
  } else if (headers && typeof headers === 'object') {
    xRobots = headers['x-robots-tag'] || headers['X-Robots-Tag'] || '';
  }

  if (/noindex/i.test(xRobots)) return true;

  // Check HTML meta
  if (htmlString && typeof htmlString === 'string') {
    const match = htmlString.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
    if (match && /noindex/i.test(match[1])) return true;
  }

  return false;
}

/**
 * Checks a text payload for forbidden mock strings.
 *
 * @param {string} text - Text content to scan
 * @param {string[]} forbiddenList - List of forbidden strings
 * @returns {string[]} Any forbidden strings detected
 */
export function findForbiddenStrings(
  text,
  forbiddenList = ['mock-project', 'mock-prop', 'Test Heights', 'localhost']
) {
  if (!text || typeof text !== 'string') return [];
  const found = [];
  for (const forbidden of forbiddenList) {
    if (text.includes(forbidden)) {
      found.push(forbidden);
    }
  }
  return found;
}

/**
 * Basic XML document structure validity check.
 *
 * @param {string} xmlString - Raw XML content
 * @returns {boolean} True if basic XML tags are present and balanced
 */
export function isValidXml(xmlString) {
  if (!xmlString || typeof xmlString !== 'string') return false;
  const trimmed = xmlString.trim();
  if (!trimmed.startsWith('<?xml') && !trimmed.startsWith('<urlset') && !trimmed.startsWith('<sitemapindex')) {
    return false;
  }
  if (trimmed.includes('<urlset') && !trimmed.includes('</urlset>')) return false;
  if (trimmed.includes('<sitemapindex') && !trimmed.includes('</sitemapindex>')) return false;
  return true;
}
