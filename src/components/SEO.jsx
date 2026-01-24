import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_DATA } from '../data/seoData';

const SEO = ({ view, city, title, description, keywords, type = 'website' }) => {
    let seo = SEO_DATA.HOME;

    if (view === 'CITY' && city && SEO_DATA.CITIES[city]) {
        seo = SEO_DATA.CITIES[city];
    } else if (SEO_DATA[view]) {
        seo = SEO_DATA[view];
    }

    const finalTitle = title || seo.title;
    const finalDescription = description || seo.description;
    const finalKeywords = keywords || seo.keywords;
    const siteUrl = 'https://bharatproperties.co/';

    // Dynamic Structured Data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": city ? "LocalBusiness" : "RealEstateAgent",
        "name": "Bharat Properties",
        "url": siteUrl,
        "logo": `${siteUrl}assets/logo.png`,
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
        <Helmet>
            {/* Standard metadata */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:site_name" content="Bharat Properties" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />

            {/* Canonical Link */}
            <link rel="canonical" href={siteUrl} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;
