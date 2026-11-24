import React from 'react';
import BlogSection from '../../components/BlogSection';
import { BLOG_DATA } from '../../data/blogData';
import { SITE_URL, breadcrumbSchema, jsonLd } from '../../lib/seo';

export const revalidate = 3600;

export default function BlogPage() {
    const breadcrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
    ];

    const crumbs = breadcrumbSchema(breadcrumbs);

    const blogCollectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: 'Real Estate Insights for Kurukshetra, Mohali & Chandigarh',
        description: 'Property market updates, buying guides and investment insights for Kurukshetra, Mohali, Chandigarh and Panchkula from the Bharat Properties team.',
        publisher: {
            '@id': `${SITE_URL}/#org`,
        },
        blogPost: BLOG_DATA.map((blog) => ({
            '@type': 'BlogPosting',
            '@id': `${SITE_URL}/blog/${encodeURIComponent(blog.slug || blog.id)}#article`,
            headline: blog.title,
            description: blog.excerpt,
            url: `${SITE_URL}/blog/${encodeURIComponent(blog.slug || blog.id)}`,
            image: blog.image,
            datePublished: blog.date,
            author: {
                '@type': 'Organization',
                name: blog.author,
            },
            publisher: {
                '@id': `${SITE_URL}/#org`,
            },
        })),
        hasPart: BLOG_DATA.map((blog) => ({
            '@type': 'BlogPosting',
            '@id': `${SITE_URL}/blog/${encodeURIComponent(blog.slug || blog.id)}#article`,
            headline: blog.title,
            description: blog.excerpt,
            url: `${SITE_URL}/blog/${encodeURIComponent(blog.slug || blog.id)}`,
            image: blog.image,
            datePublished: blog.date,
            author: {
                '@type': 'Organization',
                name: blog.author,
            },
            publisher: {
                '@id': `${SITE_URL}/#org`,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLd(crumbs) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLd(blogCollectionSchema) }}
            />
            <main style={{ marginTop: '80px' }}>
                <BlogSection />
            </main>
        </>
    );
}
