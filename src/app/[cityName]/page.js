'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { CITY_DATA } from '../../data/cityData';
import Hero from '../../components/Hero';
import CityShowcase from '../../components/CityShowcase';
import { useGlobal } from '../../context/GlobalContext';
import { MapPin } from 'lucide-react';
import FeaturedDeals from '../../components/FeaturedDeals';
import FeaturedProjects from '../../components/FeaturedProjects';
import NewsSection from '../../components/NewsSection';

export default function CityPage() {
    const params = useParams();
    const router = useRouter();
    const cityName = decodeURIComponent(params.cityName);
    const { setSelectedCity } = useGlobal();

    useEffect(() => {
        if (cityName) setSelectedCity(cityName);
    }, [cityName, setSelectedCity]);

    const cityData = CITY_DATA.find(c => c.name === cityName);
    if (!cityData) {
        notFound();
    }

    const handleSearch = (term) => {
        if (term) router.push(`/search?q=${term}`);
    };

    return (
        <>
            <Hero
                onSearch={handleSearch}
                city={cityName}
                videos={cityData?.videos}
                image={cityData?.image}
            />

            <CityShowcase city={cityData} />
            
            <FeaturedDeals city={cityName} />
            <FeaturedProjects city={cityName} />

            <NewsSection city={cityName} />
        </>
    )
}
