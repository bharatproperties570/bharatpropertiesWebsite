import { CITY_DATA, isAllowedCity } from '../data/cityData';
import { BLOG_DATA } from '../data/blogData';
import { SITE_URL, citySlug } from '../lib/seo';
import { fetchProjects, fetchListings } from '../services/crmService';

export const revalidate = 3600;

/**
 * Maximum URLs allowed per sitemap file under the standard sitemap protocol.
 * If URL count exceeds 50,000, Next.js App Router supports splitting using generateSitemaps().
 */
export const SITEMAP_MAX_URLS = 50000;

const STATIC_ROUTES = [
    { path: '/', priority: 1, changeFrequency: 'daily' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/calculator', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/maps', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/locations', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
];

// In-memory cache to retain last known good CRM entities on transient network/CRM failure
let lastKnownProjects = [];
let lastKnownListings = [];

const uniqueBySlug = (items) => {
    const seen = new Set();
    return (items || []).filter((item) => {
        const slug = (item?.slug || item?.id || item?._id || '').toString().trim();
        if (!slug || seen.has(slug)) return false;
        seen.add(slug);
        return true;
    });
};

const dedupeByUrl = (entries) => {
    const seen = new Set();
    return (entries || []).filter((entry) => {
        if (!entry || !entry.url) return false;
        const normalized = entry.url.toLowerCase().replace(/\/+$/, '');
        if (seen.has(normalized)) return false;
        seen.add(normalized);
        return true;
    });
};

export default async function sitemap(props = {}) {
    const sitemapId = props?.id != null ? Number(props.id) : 0;
    let projects = [];
    let listings = [];

    try {
        projects = await fetchProjects();
        if (Array.isArray(projects) && projects.length > 0) {
            lastKnownProjects = projects;
        }
    } catch (err) {
        console.warn('[Sitemap] ⚠️ CRM fetchProjects failed during sitemap generation. Retaining previous CRM project URLs:', err?.message || err);
        if (lastKnownProjects.length > 0) {
            projects = lastKnownProjects;
        }
    }

    try {
        listings = await fetchListings();
        if (Array.isArray(listings) && listings.length > 0) {
            lastKnownListings = listings;
        }
    } catch (err) {
        console.warn('[Sitemap] ⚠️ CRM fetchListings failed during sitemap generation. Retaining previous CRM listing URLs:', err?.message || err);
        if (lastKnownListings.length > 0) {
            listings = lastKnownListings;
        }
    }

    const allEntries = dedupeByUrl([
        ...STATIC_ROUTES.map(({ path, ...rest }) => ({ url: `${SITE_URL}${path === '/' ? '' : path}` || SITE_URL, ...rest })),
        ...uniqueBySlug(BLOG_DATA).map((b) => ({
            url: `${SITE_URL}/blog/${encodeURIComponent(b.slug || b.id)}`,
            changeFrequency: 'monthly',
            priority: 0.6,
            ...(b.date ? { lastModified: new Date(b.date) } : {})
        })),
        ...CITY_DATA.filter((c) => isAllowedCity(c.name)).map((c) => ({
            url: `${SITE_URL}/${citySlug(c.name)}`,
            changeFrequency: 'weekly',
            priority: 0.8
        })),
        ...uniqueBySlug(projects).map((p) => ({
            url: `${SITE_URL}/project/${encodeURIComponent(p.slug || p.id)}`,
            changeFrequency: 'weekly',
            priority: 0.8,
            ...(p.updatedAt ? { lastModified: new Date(p.updatedAt) } : {})
        })),
        ...uniqueBySlug(listings).map((l) => ({
            url: `${SITE_URL}/property/${encodeURIComponent(l.slug || l.id)}`,
            changeFrequency: 'weekly',
            priority: 0.7,
            ...(l.updatedAt ? { lastModified: new Date(l.updatedAt) } : {})
        })),
    ]);

    const start = sitemapId * SITEMAP_MAX_URLS;
    return allEntries.slice(start, start + SITEMAP_MAX_URLS);
}
