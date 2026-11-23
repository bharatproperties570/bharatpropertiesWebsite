import { CITY_DATA, isAllowedCity } from '../data/cityData';
import { BLOG_DATA } from '../data/blogData';
import { SITE_URL, citySlug } from '../lib/seo';
import { fetchProjects, fetchListings } from '../services/crmService';

export const revalidate = 3600;

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

const unique = (items) => {
    const seen = new Set();
    return items.filter((item) => {
        if (!item.slug || seen.has(item.slug)) return false;
        seen.add(item.slug);
        return true;
    });
};

export default async function sitemap() {
    let projects = [];
    let listings = [];

    try {
        projects = await fetchProjects();
    } catch (err) {
        console.warn('[Sitemap] CRM fetchProjects failed during sitemap generation; retaining static and city routes:', err.message);
    }

    try {
        listings = await fetchListings();
    } catch (err) {
        console.warn('[Sitemap] CRM fetchListings failed during sitemap generation; retaining static and city routes:', err.message);
    }

    return [
        ...STATIC_ROUTES.map(({ path, ...rest }) => ({ url: `${SITE_URL}${path === '/' ? '' : path}` || SITE_URL, ...rest })),
        ...BLOG_DATA.map((b) => ({ url: `${SITE_URL}/blog/${encodeURIComponent(b.slug || b.id)}`, changeFrequency: 'monthly', priority: 0.6 })),
        ...CITY_DATA.filter((c) => isAllowedCity(c.name)).map((c) => ({ url: `${SITE_URL}/${citySlug(c.name)}`, changeFrequency: 'weekly', priority: 0.8 })),
        ...unique(projects).map((p) => ({ url: `${SITE_URL}/project/${encodeURIComponent(p.slug)}`, changeFrequency: 'weekly', priority: 0.8 })),
        ...unique(listings).map((l) => ({ url: `${SITE_URL}/property/${encodeURIComponent(l.slug)}`, changeFrequency: 'weekly', priority: 0.7 })),
    ];
}
