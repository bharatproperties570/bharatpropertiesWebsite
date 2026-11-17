/* global process */
// Central SEO helpers: site constants, text/URL utilities and JSON-LD builders.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bharatproperties.co').replace(/\/$/, '');
export const SITE_NAME = 'Bharat Properties';
export const DEFAULT_OG_IMAGE = '/opengraph-image';
export const PHONE = '+91-9991333570';
export const EMAIL = 'info@bharatproperties.co';
export const RERA_NUMBER = process.env.NEXT_PUBLIC_RERA_NUMBER || '';

// Official verified social profiles (with env override support)
export const SOCIAL_PROFILES = [
    process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/bharatproperties570',
    process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/bhaaratproperties',
    process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/company/42752175/',
    process.env.NEXT_PUBLIC_TWITTER_URL,
    process.env.NEXT_PUBLIC_YOUTUBE_URL,
].filter(Boolean);

// Verified NAP (Name, Address, Phone) from src/app/locations/page.js
export const BRANCHES = [
    {
        id: 'kurukshetra',
        name: 'Bharat Properties, Kurukshetra (HQ)',
        street: 'Shop No 166, Sector 3 Market',
        city: 'Kurukshetra',
        region: 'Haryana',
        postalCode: '136118',
        phone: '+91-9991333570',
        geo: { lat: 29.9608111, lng: 76.8934231 },
        placeId: 'ChIJKzFpydBGDjkRbTCco1_G2I4',
        mapUrl: 'https://maps.app.goo.gl/Yfr1YSYGP1mrLbNR6',
    },
    {
        id: 'mohali',
        name: 'Bharat Properties, Mohali',
        street: 'PR 7, Airport Road, Sector 82 Industrial Area',
        city: 'Mohali',
        region: 'Punjab',
        postalCode: '', // TODO_OWNER: supply Mohali postal code
        phone: '+91-9991000570',
        geo: { lat: 30.6327022, lng: 76.7663162 },
        mapUrl: 'https://maps.app.goo.gl/SrXsJrh5L23qLEtM6',
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
    url: `${SITE_URL}/locations`,
    telephone: b.phone || PHONE,
    parentOrganization: { '@id': `${SITE_URL}/#org` },
    address: {
        '@type': 'PostalAddress',
        streetAddress: b.street,
        addressLocality: b.city,
        addressRegion: b.region,
        postalCode: b.postalCode || undefined,
        addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng },
    hasMap: b.mapUrl || (b.placeId ? `https://www.google.com/maps/place/?q=place_id:${b.placeId}` : undefined),
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
            logo: { '@type': 'ImageObject', url: absoluteUrl('/assets/logo.png') },
            image: absoluteUrl(DEFAULT_OG_IMAGE),
            telephone: PHONE,
            email: EMAIL,
            sameAs: SOCIAL_PROFILES.length ? SOCIAL_PROFILES : undefined,
            areaServed: AREAS_SERVED.map((name) => ({ '@type': 'City', name })),
            address: {
                '@type': 'PostalAddress',
                streetAddress: BRANCHES[0].street,
                addressLocality: BRANCHES[0].city,
                addressRegion: BRANCHES[0].region,
                postalCode: BRANCHES[0].postalCode || undefined,
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

export const faqPageSchema = (faqs) => {
    const validFaqs = (faqs || []).filter((f) => f && f.question && f.answer && !f.answer.includes('TODO_OWNER'));
    if (!validFaqs.length) return null;
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: validFaqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer,
            },
        })),
    };
};

const safeIsoDate = (d) => {
    if (!d) return undefined;
    try {
        const date = new Date(d);
        return isNaN(date.getTime()) ? undefined : date.toISOString();
    } catch {
        return undefined;
    }
};

export const articleSchema = (article, url) => {
    const isoDate = safeIsoDate(article.date);
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: cleanText(article.title),
        description: cleanText(article.excerpt),
        image: article.image ? absoluteUrl(article.image) : undefined,
        datePublished: isoDate,
        dateModified: isoDate,
        author: {
            '@type': 'Person',
            name: article.author || 'Bharat Properties Team',
        },
        publisher: {
            '@id': `${SITE_URL}/#org`,
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
    };
};

export const buildCityAnswerFirst = (city) => {
    const name = city.name;
    const state = city.state || (['Kurukshetra', 'Panchkula', 'Karnal', 'Sonepat', 'Panipat', 'Rewari', 'Faridabad', 'Gurgaon'].includes(name) ? 'Haryana' : ['Mohali', 'Zirakpur', 'Kharar', 'New Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar'].includes(name) ? 'Punjab' : 'North India');
    return `${name} is a premier real estate hub in ${state}. Explore verified residential plots, luxury flats, builder floors, and commercial investment opportunities with Bharat Properties. We offer transparent pricing, on-ground site visits, and comprehensive documentation guidance across all key sectors in ${name}.`;
};

export const buildProjectAnswerFirst = (project) => {
    const name = cleanText(project.name);
    const city = project.address?.city || (project.location !== 'Unknown' ? project.location : '');
    const developer = project.developer?.name || project.developer;
    const category = project.category || project.type || '';
    const price = project.pricing?.basePrice?.amount ? `${project.pricing.basePrice.amount} ${project.pricing.basePrice.unit || ''}`.trim() : (project.price && !/contact/i.test(project.price) ? project.price : '');
    const rera = project.rera ? String(project.rera) : '';

    const parts = [];
    parts.push(`${name} is a${category ? ` ${category}` : ''} project${city ? ` in ${city}` : ''}${developer ? ` by ${developer}` : ''}.`);
    if (price) parts.push(`Starting price: ${price}.`);
    if (rera) parts.push(`RERA: ${rera}.`);
    parts.push('Schedule an on-ground site visit and access verified layout details through Bharat Properties.');
    return parts.join(' ');
};

export const buildPropertyAnswerFirst = (property) => {
    const title = cleanText(property.title || property.unitName) || 'Property';
    const city = property.location?.city && property.location.city !== 'Unknown' ? property.location.city : '';
    const locality = property.location?.locality || property.location?.address || '';
    const subCategory = property.subCategory || property.category || '';
    const size = property.sqft ? `${property.sqft} ${property.builtupDetails?.unit || 'Sqft'}` : (property.sizeLabel || '');
    const price = property.price && !/contact/i.test(property.price) ? property.price : '';

    const parts = [];
    const locationPart = [locality, city].filter(Boolean).join(', ');
    parts.push(`${title} is a verified property${locationPart ? ` located in ${locationPart}` : ''}.`);
    if (subCategory) parts.push(`Category: ${subCategory}.`);
    if (size) parts.push(`Built-up area: ${size}.`);
    if (price) parts.push(`Offered price: ${price}.`);
    parts.push('Consult Bharat Properties for verified ownership records, on-ground site visits, and purchase advisory.');
    return parts.join(' ');
};
