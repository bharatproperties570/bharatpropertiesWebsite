'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CITY_DATA } from '../../../data/cityData';
import { PROPERTY_DATA } from '../../../data/propertyData';
import { getProjectsByCity } from '../../../data/sampleProjects';
import Hero from '../../../components/Hero';
import FeaturedProperties from '../../../components/FeaturedProperties';
import NewsSection from '../../../components/NewsSection';
import CityShowcase from '../../../components/CityShowcase';
import { useGlobal } from '../../../context/GlobalContext';
import { MapPin } from 'lucide-react';
import { fetchListings, fetchProjects } from '../../../services/crmService';
import FeaturedDeals from '../../../components/FeaturedDeals';
import FeaturedProjects from '../../../components/FeaturedProjects';
import SkeletonLoader from '../../../components/SkeletonLoader';

export default function CityPage() {
    const params = useParams();
    const router = useRouter();
    const cityName = decodeURIComponent(params.cityName);
    const {
        setSelectedCity, wishlist, handleToggleWishlist, handleAddToPropertyComparison,
        setShowMapView
    } = useGlobal();

    const [cityProperties, setCityProperties] = React.useState([]);
    const [cityProjects, setCityProjects] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if (cityName) setSelectedCity(cityName);

        const loadCrmData = async () => {
            setLoading(true);
            try {
                const [listings, projects] = await Promise.all([
                    fetchListings(),
                    fetchProjects()
                ]);
                
                // Filter listings by city
                const filteredLiveProps = listings.filter(p => {
                    const city = (typeof p.location === 'object' ? p.location.city : p.location)?.toLowerCase() || '';
                    const target = cityName.toLowerCase();
                    return city === target || city.includes(target) || (p.title || '').toLowerCase().includes(target);
                });

                // Filter projects by city
                const filteredLiveProjects = projects.filter(p => {
                    const city = (p.address?.city || '').toLowerCase();
                    const loc = (p.locationSearch || '').toLowerCase();
                    const target = cityName.toLowerCase();
                    return city === target || loc.includes(target) || p.name.toLowerCase().includes(target);
                });

                setCityProperties(filteredLiveProps);
                setCityProjects(filteredLiveProjects);
            } catch (error) {
                console.error("Error loading CRM data:", error);
                setCityProperties([]);
                setCityProjects([]);
            } finally {
                setLoading(false);
            }
        };

        loadCrmData();
    }, [cityName, setSelectedCity]);

    const cityData = CITY_DATA.find(c => c.name === cityName);

    const handleSearch = (term) => {
        if (term) router.push(`/search?q=${term}`);
    };

    const handleSelectProperty = (id) => router.push(`/property/${id}`);

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

            {loading ? (
                <div style={{ padding: '4rem 1rem' }}>
                    <div className="container">
                        <SkeletonLoader type="card" count={3} />
                    </div>
                </div>
            ) : (
                <FeaturedProperties
                    properties={cityProperties.map(p => ({
                        ...p,
                        onCompare: handleAddToPropertyComparison,
                        onWishlist: handleToggleWishlist,
                        isWishlisted: wishlist.some(w => w.id === p.id)
                    }))}
                    onPropertySelect={handleSelectProperty}
                />
            )}

            <div style={{ padding: '4rem 1rem', backgroundColor: '#fcfcfc' }}>
                <div className="container">
                    <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', color: '#1e293b', textAlign: 'center' }}>
                        Active Projects in <span style={{ color: 'var(--color-primary)' }}>{cityName}</span>
                    </h3>
                    {loading ? (
                        <SkeletonLoader type="card" count={3} />
                    ) : cityProjects.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                            {cityProjects.map(project => (
                                <div 
                                    key={project.id}
                                    onClick={() => router.push(`/project/${project.id}`)}
                                    style={{ 
                                        backgroundColor: 'white', 
                                        borderRadius: '20px', 
                                        overflow: 'hidden', 
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ height: '200px', position: 'relative' }}>
                                        <img src={project.images[0]} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem', color: '#0F172A' }}>{project.name}</h4>
                                        <p style={{ color: '#64748B', fontSize: '0.9rem', margin: '0 0 1rem' }}>{project.developer.name}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)' }}>{project.unitSizes?.[0]?.price || 'Contact for Price'}</span>
                                            <span style={{ fontSize: '0.8rem', backgroundColor: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '50px' }}>{project.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                            No active projects listed for {cityName} yet. Check back soon!
                        </div>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button
                            onClick={() => setShowMapView(true)}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 2rem',
                                borderRadius: 'var(--radius-full)',
                                fontWeight: 600,
                                cursor: 'pointer',
                                boxShadow: 'var(--shadow-md)'
                            }}
                        >
                            <MapPin size={20} /> View All in Map
                        </button>
                    </div>
                </div>
            </div>

            <NewsSection city={cityName} />
        </>
    )
}
