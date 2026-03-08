import React from 'react';
import BrandHero from '../components/BrandHero';
import SearchBarOverlay from '../components/SearchBarOverlay';
import CityGrid from '../components/CityGrid';
import ReviewsSection from '../components/ReviewsSection';
import OfficeInfo from '../components/OfficeInfo';
import MarketTrends from '../components/MarketTrends';
import NewsSection from '../components/NewsSection';
import { AboutSection, ContactSection } from '../components/Sections';

export default function HomePage() {
    return (
        <>
            <BrandHero />
            <SearchBarOverlay />

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
