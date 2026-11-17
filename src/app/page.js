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
import { organizationGraph, jsonLd } from '../lib/seo';
import { fetchFeaturedDeals, fetchFeaturedProjects } from '../services/crmService';

// Incremental static regeneration: fast, cacheable HTML that still refreshes from the CRM.
export const revalidate = 300;

export default async function HomePage() {
    // Parallel fetching on server
    const [hotDeals, allProjects] = await Promise.all([
        fetchFeaturedDeals('hot'),
        fetchFeaturedProjects('All')
    ]);

    return (
        <div id="bp-root-v4-5-definitive-sync">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationGraph()) }} />
            <HeroSection /> {/* v4.5-FINAL-SYNC */}
            <SearchBarOverlay />
            
            <FeaturedDeals initialData={hotDeals} />
            <FeaturedProjects initialData={allProjects} />

            <div id="cities">
                <CityGrid />
            </div>

            <ReviewsSection />
            <OfficeInfo />
            <NewsSection />
            <AboutSection />
            <MarketTrends />
            <ContactSection />
        </div>
    );
}
