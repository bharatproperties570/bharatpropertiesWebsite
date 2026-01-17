import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample review data - mix of social media and form submissions
const SAMPLE_REVIEWS = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        photo: null,
        rating: 5,
        review: 'Excellent service! Bharat Properties helped me find my dream home in Chandigarh. The team was professional, responsive, and guided me through every step of the process.',
        platform: 'google',
        date: '2026-01-05',
        verified: true
    },
    {
        id: 2,
        name: 'Priya Sharma',
        photo: null,
        rating: 4.5,
        review: 'Very satisfied with their services. They showed me multiple properties in Mohali and helped negotiate a great deal. Highly recommended for anyone looking for property in the tricity area.',
        platform: 'facebook',
        date: '2026-01-03',
        verified: true
    },
    {
        id: 3,
        name: 'Amit Singh',
        photo: null,
        rating: 5,
        review: 'Best real estate consultants in Kurukshetra! Their knowledge of the local market is exceptional. Found the perfect commercial space for my business.',
        platform: 'form',
        date: '2025-12-28',
        verified: true
    },
    {
        id: 4,
        name: 'Neha Gupta',
        photo: null,
        rating: 4,
        review: 'Professional team with great market insights. They helped me invest in a property in Panchkula. The entire process was smooth and transparent.',
        platform: 'instagram',
        date: '2025-12-20',
        verified: false
    },
    {
        id: 5,
        name: 'Vikram Malhotra',
        photo: null,
        rating: 5,
        review: 'Outstanding experience! From property search to documentation, everything was handled professionally. Special thanks to the Bharat Properties team for their dedication.',
        platform: 'google',
        date: '2025-12-15',
        verified: true
    },
    {
        id: 6,
        name: 'Sunita Rani',
        photo: null,
        rating: 4.5,
        review: 'Great service and honest advice. They helped me sell my property in Karnal at a good price. Would definitely work with them again.',
        platform: 'form',
        date: '2025-12-10',
        verified: true
    }
];

const ReviewsSection = ({ onLeaveFeedback }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const reviewsPerPage = 3;

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev + reviewsPerPage >= SAMPLE_REVIEWS.length ? 0 : prev + reviewsPerPage
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? Math.max(0, SAMPLE_REVIEWS.length - reviewsPerPage) : Math.max(0, prev - reviewsPerPage)
        );
    };

    const visibleReviews = SAMPLE_REVIEWS.slice(currentIndex, currentIndex + reviewsPerPage);

    return (
        <section style={{ padding: 'var(--spacing-xl) 0', backgroundColor: 'var(--color-bg-light)' }}>
            <div className="container reveal">
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-primary)'
                    }}>
                        What Our Clients Say
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Real reviews from our valued clients across Google, Facebook, Instagram, and direct feedback.
                    </p>
                </div>

                {/* Reviews Carousel */}
                <div style={{ position: 'relative' }}>
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
                    {SAMPLE_REVIEWS.length > reviewsPerPage && (
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
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = 'var(--color-primary)';
                                    e.target.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'white';
                                    e.target.style.color = 'var(--color-primary)';
                                }}
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
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = 'var(--color-primary)';
                                    e.target.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'white';
                                    e.target.style.color = 'var(--color-primary)';
                                }}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    )}

                    {/* Dots Indicator */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                        {Array.from({ length: Math.ceil(SAMPLE_REVIEWS.length / reviewsPerPage) }).map((_, idx) => (
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
                </div>

                {/* CTA to leave review */}
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                        Had a great experience with us?
                    </p>
                    <button
                        onClick={onLeaveFeedback}
                        style={{
                            backgroundColor: 'var(--color-accent)',
                            color: 'white',
                            padding: '1rem 2.5rem',
                            borderRadius: '50px',
                            fontWeight: 600,
                            fontSize: '1rem',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            boxShadow: 'var(--shadow-md)'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Share Your Feedback
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
