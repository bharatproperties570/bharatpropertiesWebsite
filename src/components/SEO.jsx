import React from 'react';
import { SEO_DATA } from '../data/seoData';

const SEO = ({ view, city, title, description, keywords, type = 'website' }) => {
    let seo = SEO_DATA.HOME || {};

    if (view === 'CITY' && city && SEO_DATA.CITIES && SEO_DATA.CITIES[city]) {
        seo = SEO_DATA.CITIES[city];
    } else if (SEO_DATA[view]) {
        seo = SEO_DATA[view];
    }

    const finalTitle = title || seo.title || 'Bharat Properties';
    const finalDescription = description || seo.description || '';
    const finalKeywords = keywords || seo.keywords || '';
    const siteUrl = 'https://bharatproperties.co';

    // Professional dynamic canonical URL
    let canonicalUrl = siteUrl;
    if (view === 'CITY' && city) canonicalUrl = `${siteUrl}/${city.toLowerCase()}`;
    else if (view === 'PROJECT' && title) canonicalUrl = `${siteUrl}/project/${title.replace(/\s+/g, '-').toLowerCase()}`;
    else if (view === 'PROPERTY' && title) canonicalUrl = `${siteUrl}/property/${title.replace(/\s+/g, '-').toLowerCase()}`;
    else if (view && view !== 'HOME') canonicalUrl = `${siteUrl}/${view.toLowerCase()}`;

    // Dynamic Structured Data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": city ? "LocalBusiness" : "RealEstateAgent",
        "name": "Bharat Properties",
        "url": siteUrl,
        "logo": `${siteUrl}/assets/logo.png`,
        "description": finalDescription,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city || "Kurukshetra",
            "addressRegion": city === "Kurukshetra" ? "Haryana" : "Punjab",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9991333570",
            "contactType": "Sales"
        }
    };

    return (
        <>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content="Bharat Properties" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />

            <link rel="canonical" href={canonicalUrl} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        </>
    );
};

export default SEO;

