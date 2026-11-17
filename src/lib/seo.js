/* global process */
// Central SEO helpers: site constants, text/URL utilities and JSON-LD builders.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bharatproperties.co').replace(/\/$/, '');
export const SITE_NAME = 'Bharat Properties';
export const DEFAULT_OG_IMAGE = '/opengraph-image';
export const PHONE = '+91-9991333570';

// Verified from src/app/locations/page.js. Add postalCode / per-branch phone once confirmed.
export const BRANCHES = [
    {
        id: 'kurukshetra',
        name: 'Bharat Properties, Kurukshetra',
        street: 'Sector 3 Market',
        city: 'Kurukshetra',
        region: 'Haryana',
        geo: { lat: 29.9602037, lng: 76.8899997 },
        placeId: 'ChIJKzFpydBGDjkRbTCco1_G2I4',
    },
    {
        id: 'mohali',
        name: 'Bharat Properties, Mohali',
        street: 'PR 7, Airport Road',
        city: 'Mohali',
        region: 'Punjab',
        geo: { lat: 30.6327022, lng: 76.7663162 },
    },
];

export const AREAS_SERVED = ['Kurukshetra', 'Mohali', 'Chandigarh', 'Panchkula', 'Zirakpur', 'Kharar', 'New Chandigarh'];

/** Strip HTML, collapse whitespace, optionally truncate at a word boundary. */
export const cleanText = (value, max = 0) => {
    if (value === null || value === undefined) return '';
    const text = String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (!max || text.length <= max) return text;
    const cut = text.slice(0, max - 1);
    return cut.slice(0, Math.max(cut.lastIndexOf(' '), 0) || cut.length).replace(/[,;:\-\s]+$/, '') + '…';
};

export const absoluteUrl = (url) => {
    if (!url || typeof url !== 'string') return undefined;
    if (/^https?:\/\//i.test(url)) return url;
    return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const firstImage = (images) => {
    const first = Array.isArray(images) ? images[0] : null;
    return typeof first === 'string' ? first : first?.url;
};

export const citySlug = (name) => String(name).toLowerCase().trim().replace(/\s+/g, '-');

/** Safe to embed in a <script> tag. */
export const jsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

const toNumber = (v) => {
    const n = typeof v === 'object' && v !== null ? Number(v.amount ?? v.value) : Number(v);
    return Number.isFinite(n) && n > 0 ? n : undefined;
};

export const breadcrumbSchema = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: absoluteUrl(item.path),
    })),
});

const branchNode = (b) => ({
    '@type': 'RealEstateAgent',
    '@id': `${SITE_URL}/#branch-${b.id}`,
    name: b.name,
    url: SITE_URL,
    parentOrganization: { '@id': `${SITE_URL}/#org` },
    address: {
        '@type': 'PostalAddress',
        streetAddress: b.street,
        addressLocality: b.city,
        addressRegion: b.region,
        addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng },
    hasMap: b.placeId ? `https://www.google.com/maps/place/?q=place_id:${b.placeId}` : undefined,
});

/** Site-wide entity graph for the homepage: WebSite + Organization + branches. */
export const organizationGraph = () => ({
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: SITE_NAME,
            inLanguage: 'en-IN',
            publisher: { '@id': `${SITE_URL}/#org` },
        },
        {
            '@type': 'RealEstateAgent',
            '@id': `${SITE_URL}/#org`,
            name: SITE_NAME,
            url: SITE_URL,
            logo: { '@type': 'ImageObject', url: absoluteUrl(DEFAULT_OG_IMAGE) },
            image: absoluteUrl(DEFAULT_OG_IMAGE),
            telephone: PHONE,
            areaServed: AREAS_SERVED.map((name) => ({ '@type': 'City', name })),
            address: {
                '@type': 'PostalAddress',
                streetAddress: BRANCHES[0].street,
                addressLocality: BRANCHES[0].city,
                addressRegion: BRANCHES[0].region,
                addressCountry: 'IN',
            },
        },
        ...BRANCHES.map(branchNode),
    ],
});

export const projectSchema = (project, url) => {
    const images = (project.images || []).map((i) => (typeof i === 'string' ? i : i?.url)).filter(Boolean).slice(0, 6);
    return {
        '@context': 'https://schema.org',
        '@type': 'Place',
        '@id': `${url}#project`,
        name: project.name,
        url,
        description: cleanText(project.overview || project.description, 500) || undefined,
        image: images.length ? images : undefined,
        address: {
            '@type': 'PostalAddress',
            addressLocality: project.address?.city || (project.location !== 'Unknown' ? project.location : undefined),
            addressRegion: project.address?.state || undefined,
            addressCountry: 'IN',
        },
        additionalProperty: [
            project.developer?.name && { '@type': 'PropertyValue', name: 'Developer', value: project.developer.name },
            project.rera && { '@type': 'PropertyValue', name: 'RERA Number', value: String(project.rera) },
            project.status && { '@type': 'PropertyValue', name: 'Status', value: String(project.status) },
        ].filter(Boolean),
    };
};

export const propertySchema = (property, url) => {
    const images = (property.images || []).map((i) => (typeof i === 'string' ? i : i?.url)).filter(Boolean).slice(0, 6);
    const price = toNumber(property.rawPrice);
    return {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        '@id': `${url}#listing`,
        name: property.title || property.unitName,
        url,
        description: cleanText(property.description, 500) || undefined,
        image: images.length ? images : undefined,
        offers: price
            ? { '@type': 'Offer', price, priceCurrency: 'INR', seller: { '@id': `${SITE_URL}/#org` } }
            : undefined,
        contentLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                streetAddress: property.location?.address || undefined,
                addressLocality: property.location?.locality || property.location?.city || undefined,
                addressRegion: property.location?.state || undefined,
                addressCountry: 'IN',
            },
        },
    };
};
