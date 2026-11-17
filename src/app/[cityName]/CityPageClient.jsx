'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Hero from '../../components/Hero';
import CityShowcase from '../../components/CityShowcase';
import { useGlobal } from '../../context/GlobalContext';
import FeaturedDeals from '../../components/FeaturedDeals';
import FeaturedProjects from '../../components/FeaturedProjects';
import NewsSection from '../../components/NewsSection';
import AnswerFirst from '../../components/AnswerFirst';
import FAQ from '../../components/FAQ';
import { FAQS } from '../../content/faqs';
import { buildCityAnswerFirst, citySlug } from '../../lib/seo';

export default function CityPageClient({ cityData, initialNews = null }) {
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

    return (
        <>
            <Hero
                onSearch={handleSearch}
                city={cityName}
                videos={cityData?.videos}
                image={cityData?.image}
            />

            <AnswerFirst text={buildCityAnswerFirst(cityData)} />

            <FeaturedDeals city={cityName} />
            <FeaturedProjects city={cityName} />
            
            <CityShowcase city={cityData} />

            {cityFaqs && (
                <FAQ faqs={cityFaqs} title={`Frequently Asked Questions - Property in ${cityName}`} />
            )}

            <NewsSection city={cityName} initialNews={initialNews} />
        </>
    );
}
