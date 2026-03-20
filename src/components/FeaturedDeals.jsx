'use client';
import React, { useState, useEffect, useRef } from 'react';
import { fetchFeaturedDeals } from '../services/crmService';
import PropertyCard from './PropertyCard';
import './FeaturedDeals.css';

const FeaturedDeals = ({ city = '', initialData = [] }) => {
    const [activeTab, setActiveTab] = useState('hot');
    const [deals, setDeals] = useState(initialData);
    const [loading, setLoading] = useState(initialData.length === 0);
    const scrollRef = useRef(null);

    const tabs = [
        { id: 'hot', label: '🔥 HOT Deal' },
        { id: 'latest', label: '✨ Latest Deal' },
        { id: 'cheapest', label: '💰 Cheapest Deal' }
    ];

    useEffect(() => {
        const loadDeals = async () => {
            // If we have initialData and it's not the first load, use it
            if (activeTab === 'hot' && initialData.length > 0 && deals === initialData) {
                setLoading(false);
                return;
            }
            
            setLoading(true);
            const data = await fetchFeaturedDeals(activeTab, city);
            
            // Smart Fallback: If hot deals are empty, switch to latest
            if (activeTab === 'hot' && data.length === 0) {
                setActiveTab('latest');
                return; // The next useEffect cycle will handle 'latest'
            }
            
            setDeals(data);
            setLoading(false);
        };
        loadDeals();
    }, [activeTab, city, initialData]);

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

                <div className="deals-scroll-container" ref={scrollRef}>
                    {deals.length > 0 ? (
                        <div className="deals-track" style={{ opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                            {deals.map((deal, index) => (
                                <div key={deal.id || index} className="deal-card-wrapper">
                                    <PropertyCard property={deal} />
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
        </section>
    );
};

export default FeaturedDeals;
