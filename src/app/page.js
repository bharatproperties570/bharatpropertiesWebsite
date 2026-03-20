import React from 'react';
import HeroSection from '../components/HeroSection';
import SearchBarOverlay from '../components/SearchBarOverlay';
import CityGrid from '../components/CityGrid';
import ReviewsSection from '../components/ReviewsSection';
import OfficeInfo from '../components/OfficeInfo';
import MarketTrends from '../components/MarketTrends';
import NewsSection from '../components/NewsSection';
import { AboutSection, ContactSection } from '../components/Sections';
import FeaturedDeals from '../components/FeaturedDeals';
import FeaturedProjects from '../components/FeaturedProjects';
import { fetchFeaturedDeals, fetchFeaturedProjects } from '../services/crmService';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
    // Parallel fetching on server
    const [hotDeals, allProjects] = await Promise.all([
        fetchFeaturedDeals('hot'),
        fetchFeaturedProjects('All')
    ]);

    return (
        <>
            <HeroSection />
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
        </>
    );
}
