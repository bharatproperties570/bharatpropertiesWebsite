import React from 'react';
import AboutClient from './AboutClient';
import { SITE_URL, breadcrumbSchema, jsonLd } from '../../lib/seo';

export const revalidate = 3600;

export default function Page() {
    const breadcrumbs = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
    ];

    const crumbs = breadcrumbSchema(breadcrumbs);

    const aboutPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/about#webpage`,
        url: `${SITE_URL}/about`,
        name: 'About Bharat Properties',
        description: 'Bharat Properties is a real estate consultancy providing property solutions across Kurukshetra, Mohali, Chandigarh, Panchkula, and North India.',
        isPartOf: {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: 'Bharat Properties',
        },
        mainEntity: {
            '@id': `${SITE_URL}/#org`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLd(crumbs) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLd(aboutPageSchema) }}
            />
            <AboutClient />
        </>
    );
}
