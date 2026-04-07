'use client';
import React, { useState, useEffect, useRef } from 'react';
import { fetchFeaturedDeals } from '../services/crmService';
import PropertyCard from './PropertyCard';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './FeaturedDeals.css';

const FeaturedDeals = ({ city = '', initialData = [] }) => {
    const [activeTab, setActiveTab] = useState('hot');
    const [deals, setDeals] = useState(initialData);
    const [loading, setLoading] = useState(initialData.length === 0);
    const scrollRef = useRef(null);
    const router = useRouter();

    const tabs = [
        { id: 'hot', label: '🔥 HOT Deal' },
        { id: 'latest', label: '✨ Latest Deal' },
        { id: 'cheapest', label: '💰 Cheapest Deal' }
    ];

    useEffect(() => {
        const loadDeals = async () => {
            if (activeTab === 'hot' && initialData.length > 0 && deals === initialData) {
                setLoading(false);
                return;
            }
            
            setLoading(true);
            const data = await fetchFeaturedDeals(activeTab, city);
            
            if (activeTab === 'hot' && data.length === 0) {
                setActiveTab('latest');
                return;
            }
            
            setDeals(data);
            setLoading(false);
        };
        loadDeals();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, city, initialData]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current: container } = scrollRef;
            const scrollAmount = 400 + 32; // card width + gap
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="featured-deals-section">
            <div className="section-container">
                <div className="section-header">
                    <h2 className="section-title">Exclusive Featured Deals</h2>
                    <p className="section-subtitle">Handpicked premium properties just for you</p>
                    
                    <div className="filter-tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="deals-scroll-container" style={{ position: 'relative' }}>
                    {deals.length > 3 && (
                        <>
                            <button 
                                className="deals-nav-button prev" 
                                onClick={() => scroll('left')}
                                aria-label="Previous deal"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button 
                                className="deals-nav-button next" 
                                onClick={() => scroll('right')}
                                aria-label="Next deal"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}
                    
                    <div className="deals-scroll-container-inner" ref={scrollRef}>
                        {deals.length > 0 ? (
                            <div className="deals-track" style={{ opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                                {deals.map((deal, index) => (
                                    <div key={deal.id || index} className="deal-card-wrapper">
                                        <PropertyCard 
                                            property={deal} 
                                            onClick={() => router.push(`/property/${deal.slug || deal.id}`)}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : loading ? (
                            <div className="loading-state">Loading amazing deals...</div>
                        ) : (
                            <div className="no-deals">No deals found for this category.</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedDeals;
