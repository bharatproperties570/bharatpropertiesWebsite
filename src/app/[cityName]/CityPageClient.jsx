'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Hero from '../../components/Hero';
import CityShowcase from '../../components/CityShowcase';
import { useGlobal } from '../../context/GlobalContext';
import FeaturedDeals from '../../components/FeaturedDeals';
import FeaturedProjects from '../../components/FeaturedProjects';
import NewsSection from '../../components/NewsSection';
import AnswerFirst from '../../components/AnswerFirst';
import FAQ from '../../components/FAQ';
import Breadcrumbs from '../../components/Breadcrumbs';
import { FAQS } from '../../content/faqs';
import { buildCityAnswerFirst, citySlug } from '../../lib/seo';
import { Building2, Home, MapPin, Tag, Compass } from 'lucide-react';

export default function CityPageClient({
    cityData,
    initialNews = null,
    breadcrumbs = [],
    citySummary = null,
    nearbyCities = [],
    initialProjects = [],
    initialListings = []
}) {
    const router = useRouter();
    const cityName = cityData.name;
    const { setSelectedCity } = useGlobal();

    useEffect(() => {
        if (cityName) setSelectedCity(cityName);
    }, [cityName, setSelectedCity]);

    const handleSearch = (term) => {
        if (term) router.push(`/search?q=${encodeURIComponent(term)}`);
    };

    const slug = citySlug(cityName);
    const cityFaqs = FAQS[slug];

    const hasCrmData = citySummary && (citySummary.projectCount > 0 || citySummary.listingCount > 0);

    return (
        <>
            <Hero
                onSearch={handleSearch}
                city={cityName}
                videos={cityData?.videos}
                image={cityData?.image}
            />

            <div className="container" style={{ paddingTop: '1rem' }}>
                <Breadcrumbs items={breadcrumbs} />
            </div>

            <AnswerFirst text={buildCityAnswerFirst(cityData)} />

            {/* CRM Data-Driven Inventory Overview (Hidden if no live data) */}
            {hasCrmData && (
                <section style={{ padding: '2rem 0', backgroundColor: '#f8fafc' }}>
                    <div className="container">
                        <div style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '1.25rem',
                            padding: '2rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            border: '1px solid #e2e8f0'
                        }}>
                            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Compass size={22} color="var(--color-accent)" />
                                {cityName} Real Estate Overview & Live Inventory
                            </h2>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                {citySummary.projectCount > 0 && (
                                    <div style={{ padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '0.75rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                            <Building2 size={16} /> Active Projects
                                        </div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                                            {citySummary.projectCount}
                                        </div>
                                    </div>
                                )}

                                {citySummary.listingCount > 0 && (
                                    <div style={{ padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '0.75rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                            <Home size={16} /> Verified Listings
                                        </div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                                            {citySummary.listingCount}
                                        </div>
                                    </div>
                                )}

                                {citySummary.propertyTypes && citySummary.propertyTypes.length > 0 && (
                                    <div style={{ padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '0.75rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                            <Tag size={16} /> Available Types
                                        </div>
                                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '0.25rem' }}>
                                            {citySummary.propertyTypes.join(', ')}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {citySummary.localities && citySummary.localities.length > 0 && (
                                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '0.75rem' }}>
                                        Active Localities in {cityName}:
                                    </span>
                                    <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        {citySummary.localities.map((loc) => (
                                            <span key={loc} style={{ padding: '0.3rem 0.75rem', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '0.375rem', fontSize: '0.85rem', color: '#1e293b' }}>
                                                <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
                                                {loc}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            <FeaturedDeals city={cityName} initialData={initialListings} />
            <FeaturedProjects city={cityName} initialData={initialProjects} />
            
            <CityShowcase city={cityData} />

            {/* Internal Linking: Nearby Core Markets */}
            {nearbyCities && nearbyCities.length > 0 && (
                <section style={{ padding: '3.5rem 0', backgroundColor: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
                    <div className="container">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1rem', textAlign: 'center' }}>
                            Explore Real Estate in Connected North India Cities
                        </h2>
                        <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '2rem', maxWidth: '640px', margin: '0 auto 2rem' }}>
                            Looking for alternatives? Explore verified listings and new developer projects in our core regional markets.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                            {nearbyCities.map((nc) => (
                                <Link
                                    key={nc.slug}
                                    href={`/${nc.slug}`}
                                    style={{
                                        padding: '0.65rem 1.25rem',
                                        backgroundColor: '#f8fafc',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '0.75rem',
                                        color: 'var(--color-primary)',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Property in {nc.name} →
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {cityFaqs && (
                <FAQ faqs={cityFaqs} title={`Frequently Asked Questions - Property in ${cityName}`} />
            )}

            <NewsSection city={cityName} initialNews={initialNews} />
        </>
    );
}
