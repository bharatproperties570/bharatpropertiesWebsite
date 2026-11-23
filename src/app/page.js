import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '../components/BP_Hero_Final_v4';
import SearchBarOverlay from '../components/SearchBarOverlay';
import CityGrid from '../components/CityGrid';
import { AboutSection, ContactSection } from '../components/Sections';
import FeaturedDeals from '../components/FeaturedDeals';
import FeaturedProjects from '../components/FeaturedProjects';
import { organizationGraph, faqPageSchema, jsonLd } from '../lib/seo';
import { FAQS } from '../content/faqs';
import { fetchFeaturedDeals, fetchFeaturedProjects, fetchGoogleReviews } from '../services/crmService';
import { fetchRealEstateNews } from '../services/NewsService';

const ReviewsSection = dynamic(() => import('../components/ReviewsSection'), {
    loading: () => <div style={{ minHeight: '350px' }} />,
});
const NewsSection = dynamic(() => import('../components/NewsSection'), {
    loading: () => <div style={{ minHeight: '350px' }} />,
});
const FAQ = dynamic(() => import('../components/FAQ'), {
    loading: () => <div style={{ minHeight: '300px' }} />,
});
const OfficeInfo = dynamic(() => import('../components/OfficeInfo'), {
    loading: () => <div style={{ minHeight: '400px' }} />,
});
const MarketTrends = dynamic(() => import('../components/MarketTrends'), {
    loading: () => <div style={{ minHeight: '300px' }} />,
});

// Incremental static regeneration: fast, cacheable HTML that still refreshes from the CRM.
export const revalidate = 300;

export default async function HomePage() {
    // Parallel fetching on server
    const [hotDeals, allProjects, googleReviews, newsData] = await Promise.all([
        fetchFeaturedDeals('hot').catch(() => []),
        fetchFeaturedProjects('All').catch(() => []),
        fetchGoogleReviews().catch(() => ({ reviews: [], rating: 5, totalReviews: 0 })),
        fetchRealEstateNews().catch(() => [])
    ]);

    const faqSchema = faqPageSchema(FAQS.homepage);

    return (
        <div id="bp-root-v4-5-definitive-sync">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationGraph()) }} />
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
            )}
            <HeroSection /> {/* v4.5-FINAL-SYNC */}
            <SearchBarOverlay />
            
            <FeaturedDeals initialData={hotDeals} />
            <FeaturedProjects initialData={allProjects} />

            <div id="cities">
                <CityGrid />
            </div>

            <ReviewsSection initialData={googleReviews} />
            <OfficeInfo />
            <NewsSection initialNews={newsData} />
            <AboutSection />
            <MarketTrends />
            <FAQ faqs={FAQS.homepage} />
            <ContactSection />
        </div>
    );
}
