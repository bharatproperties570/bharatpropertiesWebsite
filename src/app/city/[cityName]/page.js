'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CITY_DATA } from '../../../data/cityData';
import { PROPERTY_DATA } from '../../../data/propertyData';
import Hero from '../../../components/Hero';
import FeaturedProperties from '../../../components/FeaturedProperties';
import NewsSection from '../../../components/NewsSection';
import CityShowcase from '../../../components/CityShowcase';
import { useGlobal } from '../../../context/GlobalContext';
import { MapPin } from 'lucide-react';

export default function CityPage() {
    const params = useParams();
    const router = useRouter();
    const cityName = decodeURIComponent(params.cityName);
    const {
        setSelectedCity, wishlist, handleToggleWishlist, handleAddToPropertyComparison,
        setShowMapView
    } = useGlobal();

    useEffect(() => {
        if (cityName) setSelectedCity(cityName);
    }, [cityName, setSelectedCity]);

    const cityData = CITY_DATA.find(c => c.name === cityName);

    const handleSearch = (term) => {
        if (term) router.push(`/search?q=${term}`);
    };

    const handleSelectProperty = (id) => router.push(`/property/${id}`);

    const cityProperties = PROPERTY_DATA.filter(p => p.location === cityName);

    return (
        <>
            <Hero
                onSearch={handleSearch}
                city={cityName}
                videos={cityData?.videos}
                image={cityData?.image}
            />

            <CityShowcase city={cityData} />

            <FeaturedProperties
                properties={cityProperties.map(p => ({
                    ...p,
                    onCompare: handleAddToPropertyComparison,
                    onWishlist: handleToggleWishlist,
                    isWishlisted: wishlist.some(w => w.id === p.id)
                }))}
                onPropertySelect={handleSelectProperty}
            />

            <div style={{ padding: '2rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>
                    Showing Active Projects in <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{cityName}</span>
                </h3>
                <button
                    onClick={() => setShowMapView(true)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-md)'
                    }}
                >
                    <MapPin size={20} /> View on Map
                </button>
            </div>

            <NewsSection city={cityName} />
        </>
    )
}
