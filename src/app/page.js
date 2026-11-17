import React from 'react';
import HeroSection from '../components/BP_Hero_Final_v4';
import SearchBarOverlay from '../components/SearchBarOverlay';
import CityGrid from '../components/CityGrid';
import ReviewsSection from '../components/ReviewsSection';
import OfficeInfo from '../components/OfficeInfo';
import MarketTrends from '../components/MarketTrends';
import NewsSection from '../components/NewsSection';
import { AboutSection, ContactSection } from '../components/Sections';
import FeaturedDeals from '../components/FeaturedDeals';
import FeaturedProjects from '../components/FeaturedProjects';
import { organizationGraph, faqPageSchema, jsonLd } from '../lib/seo';
import FAQ from '../components/FAQ';
import { FAQS } from '../content/faqs';
import { fetchFeaturedDeals, fetchFeaturedProjects, fetchGoogleReviews } from '../services/crmService';
import { fetchRealEstateNews } from '../services/NewsService';

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
