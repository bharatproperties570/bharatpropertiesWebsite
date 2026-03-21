import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import { ChevronLeft, ChevronRight, Star, Loader2 } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';
import { fetchGoogleReviews } from '../services/crmService';

const ReviewsSection = ({ onLeaveFeedback }) => {
    const { setShowFeedbackModal } = useGlobal();
    const [reviews, setReviews] = useState([]);
    const [stats, setStats] = useState({ rating: 5, total: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const reviewsPerPage = 3;

    useEffect(() => {
        const loadReviews = async () => {
            setIsLoading(true);
            const data = await fetchGoogleReviews();
            if (data && data.reviews && data.reviews.length > 0) {
                setReviews(data.reviews);
                setStats({ rating: data.rating, total: data.totalReviews });
            }
            setIsLoading(false);
        };
        loadReviews();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev + reviewsPerPage >= reviews.length ? 0 : prev + reviewsPerPage
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? Math.max(0, reviews.length - reviewsPerPage) : Math.max(0, prev - reviewsPerPage)
        );
    };

    const handleFeedbackClick = () => {
        if (onLeaveFeedback) {
            onLeaveFeedback();
        } else {
            setShowFeedbackModal(true);
        }
    };

    const visibleReviews = reviews.slice(currentIndex, currentIndex + reviewsPerPage);

    return (
        <section style={{ padding: 'var(--spacing-xl) 0', backgroundColor: 'var(--color-bg-light)' }}>
            <div className="container reveal">
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{ 
                            backgroundColor: '#4285F4', 
                            color: 'white', 
                            padding: '4px 12px', 
                            borderRadius: '20px', 
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '14px', height: '14px' }} />
                            Google Reviews
                        </span>
                    </div>
                    <h2 style={{
                        fontSize: '2.56rem',
                        marginBottom: '0.5rem',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-primary)',
                        fontWeight: '700'
                    }}>
                        What Our Clients Say
                    </h2>
                    
                    {stats.total > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', color: '#FABB05' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill={i < Math.floor(stats.rating) ? "#FABB05" : "none"} strokeWidth={1.5} />
                                ))}
                            </div>
                            <span style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--color-primary)' }}>{stats.rating}</span>
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>({stats.total} Reviews)</span>
                        </div>
                    )}
                    
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Real reflections of our commitment to excellence in the Kurukshetra real estate market.
                    </p>
                </div>

                {/* Reviews Carousel */}
                <div style={{ position: 'relative', minHeight: '300px' }}>
                    {isLoading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', gap: '1rem' }}>
                            <Loader2 className="animate-spin" size={40} color="var(--color-primary)" />
                            <p style={{ color: 'var(--color-text-muted)' }}>Syncing latest reviews from Google...</p>
                        </div>
                    ) : (
                        <>
                            {/* Reviews Grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '2rem',
                                marginBottom: '2rem'
                            }}>
                                {visibleReviews.map(review => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>

                            {/* Navigation Buttons */}
                            {reviews.length > reviewsPerPage && (
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                                    <button
                                        onClick={prevSlide}
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            border: '2px solid var(--color-primary)',
                                            backgroundColor: 'white',
                                            color: 'var(--color-primary)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.2s'
                                        }}
                                        className="carousel-nav-btn"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            border: '2px solid var(--color-primary)',
                                            backgroundColor: 'white',
                                            color: 'var(--color-primary)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.2s'
                                        }}
                                        className="carousel-nav-btn"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            )}

                            {/* Dots Indicator */}
                            {reviews.length > reviewsPerPage && (
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                                    {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }).map((_, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: idx === Math.floor(currentIndex / reviewsPerPage) ? 'var(--color-primary)' : '#D1D5DB',
                                                transition: 'background-color 0.2s'
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* CTA to leave review */}
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                        Had a great experience with us?
                    </p>
                    <button
                        onClick={handleFeedbackClick}
                        className="btn-premium"
                        style={{
                            backgroundColor: 'var(--color-accent)',
                            color: 'white',
                            padding: '1rem 2.5rem',
                            borderRadius: '50px',
                            fontWeight: 600,
                            fontSize: '1rem',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: 'var(--shadow-md)'
                        }}
                    >
                        Share Your Feedback
                    </button>
                </div>
            </div>
            <style jsx>{`
                .carousel-nav-btn:hover {
                    background-color: var(--color-primary) !important;
                    color: white !important;
                }
            `}</style>
        </section>
    );
};

export default ReviewsSection;
