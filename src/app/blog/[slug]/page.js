import React from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import { BLOG_DATA } from '../../../data/blogData';
import {
    SITE_URL, cleanText, absoluteUrl, articleSchema, breadcrumbSchema, jsonLd,
} from '../../../lib/seo';

export const revalidate = 3600;

export function generateStaticParams() {
    return BLOG_DATA.map((b) => ({ slug: b.slug }));
}

const findArticle = (slug) => {
    if (!slug) return null;
    const decoded = decodeURIComponent(slug).toLowerCase().trim();
    return BLOG_DATA.find(
        (b) => (b.slug && b.slug.toLowerCase() === decoded) ||
               b.id.toLowerCase() === decoded ||
               b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === decoded
    ) || null;
};

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const article = findArticle(slug);
    if (!article) return { title: 'Article Not Found', robots: { index: false, follow: false } };

    const title = `${cleanText(article.title)} | Bharat Properties Blog`;
    const description = cleanText(article.excerpt, 158);
    const path = `/blog/${article.slug || article.id}`;
    const image = absoluteUrl(article.image);

    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title,
            description,
            url: path,
            type: 'article',
            publishedTime: article.date ? new Date(article.date).toISOString() : undefined,
            authors: [article.author || 'Bharat Properties'],
            images: image ? [{ url: image, alt: article.title }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: image ? [image] : undefined,
        },
    };
}

export default async function BlogArticlePage({ params }) {
    const { slug } = await params;
    const article = findArticle(slug);
    if (!article) notFound();

    // 308 permanent redirect if accessed via old id parameter
    if (slug === article.id && article.slug && slug !== article.slug) {
        permanentRedirect(`/blog/${article.slug}`);
    }

    const path = `/blog/${article.slug || article.id}`;
    const url = `${SITE_URL}${path}`;

    const graph = [
        articleSchema(article, url),
        breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: article.title, path },
        ]),
    ];

    return (
        <article style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '100px', paddingBottom: '6rem' }}>
            {graph.map((item, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(item) }} />
            ))}

            <div className="container" style={{ maxWidth: '840px', margin: '0 auto', padding: '0 1.5rem' }}>
                {/* Breadcrumb Navigation */}
                <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem', fontSize: '0.9rem', color: '#64748B' }}>
                    <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                        <li>
                            <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>Home</Link>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li>
                            <Link href="/blog" style={{ color: '#64748B', textDecoration: 'none' }}>Blog</Link>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li aria-current="page" style={{ color: '#0F172A', fontWeight: 600 }}>
                            {article.title}
                        </li>
                    </ol>
                </nav>

                <div style={{ marginBottom: '1.5rem' }}>
                    <Link
                        href="/blog"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'var(--color-primary)',
                            fontWeight: 700,
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                        }}
                    >
                        <ArrowLeft size={16} /> Back to all articles
                    </Link>
                </div>

                {/* Article Header */}
                <header style={{ marginBottom: '2.5rem' }}>
                    <span
                        style={{
                            display: 'inline-block',
                            backgroundColor: 'rgba(217, 119, 6, 0.1)',
                            color: 'var(--color-gold, #D97706)',
                            padding: '0.4rem 1rem',
                            borderRadius: '50px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '1rem',
                        }}
                    >
                        {article.category}
                    </span>

                    <h1
                        style={{
                            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                            fontWeight: 800,
                            color: '#0F172A',
                            lineHeight: 1.25,
                            letterSpacing: '-0.02em',
                            marginBottom: '1.5rem',
                        }}
                    >
                        {article.title}
                    </h1>

                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '1.5rem',
                            color: '#64748B',
                            fontSize: '0.95rem',
                            paddingBottom: '1.5rem',
                            borderBottom: '1px solid #E2E8F0',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={16} />
                            <span>{article.date}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={16} />
                            <span>{article.author}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={16} />
                            <span>4 min read</span>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {article.image && (
                    <div
                        style={{
                            borderRadius: '20px',
                            overflow: 'hidden',
                            marginBottom: '3rem',
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
                        }}
                    >
                        <Image
                            src={article.image}
                            alt={article.title}
                            width={1200}
                            height={600}
                            priority
                            style={{
                                width: '100%',
                                maxHeight: '480px',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                    </div>
                )}

                {/* Article Content */}
                <div
                    style={{
                        fontSize: '1.15rem',
                        lineHeight: 1.8,
                        color: '#334155',
                    }}
                >
                    <p
                        style={{
                            fontSize: '1.3rem',
                            lineHeight: 1.7,
                            color: '#1E293B',
                            fontWeight: 500,
                            marginBottom: '2rem',
                            borderLeft: '4px solid var(--color-gold, #D97706)',
                            paddingLeft: '1.25rem',
                        }}
                    >
                        {article.excerpt}
                    </p>

                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginTop: '2.5rem', marginBottom: '1rem' }}>
                        Strategic Property Assessment in North India
                    </h2>
                    <p>
                        Investing in emerging real estate hubs requires a balanced approach focused on verified land records, master plan expansion, and connectivity corridors. In regions like Haryana and Punjab, government infrastructure projects including expressways, ring roads, and industrial corridors continue to redefine long-term property values.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginTop: '2.5rem', marginBottom: '1rem' }}>
                        Key Verification Checklist for Buyers
                    </h2>
                    <p>
                        Before finalizing any property transaction, smart buyers ensure comprehensive due diligence:
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <strong>RERA Compliance:</strong> Ensure the project or layout holds a valid state RERA registration certificate.
                        </li>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <strong>Revenue Records:</strong> Cross-check title deeds, Jamabandi/Fard records, and encumbrance certificates.
                        </li>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <strong>Development Authority Approvals:</strong> Verify HSVP (HUDA), GMADA, or municipal sanction plans.
                        </li>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <strong>Physical Site Inspection:</strong> Perform on-ground boundary checks and evaluate access road width.
                        </li>
                    </ul>

                    {/* Consultation Box */}
                    <div
                        style={{
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            borderRadius: '16px',
                            padding: '2rem',
                            marginTop: '3.5rem',
                            textAlign: 'center',
                        }}
                    >
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>
                            Looking for Expert Guidance?
                        </h3>
                        <p style={{ color: '#64748B', fontSize: '1rem', marginBottom: '1.5rem', maxWidth: '550px', margin: '0 auto 1.5rem' }}>
                            Connect with Bharat Properties property specialists in Kurukshetra and Mohali for verified property consultations, layout plans, and guided site visits.
                        </p>
                        <Link
                            href="/#contact"
                            style={{
                                display: 'inline-block',
                                backgroundColor: '#0F172A',
                                color: 'white',
                                padding: '0.85rem 2rem',
                                borderRadius: '12px',
                                fontWeight: 700,
                                textDecoration: 'none',
                                fontSize: '1rem',
                            }}
                        >
                            Speak to an Advisor
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
