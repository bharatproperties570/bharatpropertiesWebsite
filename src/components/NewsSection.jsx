import React, { useState, useEffect } from 'react';
import { Newspaper, ChevronRight, RefreshCw } from 'lucide-react';
import NewsCard from './NewsCard';
import { fetchRealEstateNews } from '../services/NewsService';

const NewsSection = ({ city = null }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            const data = await fetchRealEstateNews(city);
            setNews(data);
            setLoading(false);
        };
        loadNews();
    }, [city]);

    return (
        <section style={{ padding: 'var(--spacing-xl) 0', backgroundColor: 'white' }}>
            <div className="container reveal">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                            {city ? `Property News: ${city}` : 'Live Real Estate Updates'}
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                            Stay informed with the latest from HSVP, GMADA, PUDA, and Home Loan markets.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        <RefreshCw className="animate-spin" size={40} style={{ margin: '0 auto 1rem', display: 'block' }} />
                        <p>Fetching latest updates...</p>
                    </div>
                ) : news.length > 0 ? (
                    <div className="ticker-wrapper" style={{
                        overflow: 'hidden',
                        padding: '1rem 0',
                        position: 'relative'
                    }}>
                        <div className="ticker-track" style={{
                            display: 'flex',
                            gap: '2rem',
                            animation: 'ticker 40s linear infinite',
                            width: 'fit-content'
                        }}>
                            {/* Duplicate news for seamless loop */}
                            {[...news, ...news].map((item, index) => (
                                <div key={index} style={{
                                    flex: '0 0 350px', // Fixed width for ticker items
                                }}>
                                    <NewsCard news={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-muted)', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-lg)' }}>
                        <p>No new updates found for this region at the moment.</p>
                    </div>
                )}

                <style>{`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    .animate-spin {
                        animation: spin 1.5s linear infinite;
                    }
                    
                    @keyframes ticker {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-50% - 1rem)); }
                    }
                    
                    .ticker-wrapper:hover .ticker-track {
                        animation-play-state: paused;
                    }

                    .ticker-track {
                        will-change: transform;
                    }
                `}</style>
            </div>
        </section>
    );
};

export default NewsSection;
