import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const PLATFORM_ICONS = {
    google: (
        <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
    ),
    facebook: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
    ),
    instagram: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
    ),
    linkedin: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#0077b5" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
    ),
    twitter: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="black" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/>
        </svg>
    ),
    form: (
        <Star size={14} fill="white" />
    )
};

const PLATFORM_COLORS = {
    google: '#FFFFFF',
    facebook: '#FFFFFF',
    instagram: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    linkedin: '#FFFFFF',
    twitter: '#FFFFFF',
    form: '#0f766e'
};

const PLATFORM_TEXT_COLORS = {
    google: '#4285F4',
    facebook: '#1877F2',
    instagram: '#FFFFFF',
    linkedin: '#0077b5',
    twitter: '#000000',
    form: '#FFFFFF'
};

const PLATFORM_NAMES = {
    google: 'Google',
    facebook: 'Facebook',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    twitter: 'X (Twitter)',
    form: 'Feedback'
};

const ReviewCard = ({ review }) => {
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`full-${i}`} size={16} fill="#FFD700" color="#FFD700" />);
        }
        if (hasHalfStar) {
            stars.push(<StarHalf key="half" size={16} fill="#FFD700" color="#FFD700" />);
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} size={16} color="#E5E7EB" />);
        }
        return stars;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' });
    };

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid #e2e8f0',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: review.photo || 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1.2rem'
                    }}>
                        {review.photo ? (
                            <img src={review.photo} alt={review.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                            review.name.charAt(0).toUpperCase()
                        )}
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.25rem' }}>
                            {review.name}
                        </h4>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                            {formatDate(review.date)}
                        </div>
                    </div>
                </div>

                {/* Platform Badge with Icon */}
                <div style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: PLATFORM_TEXT_COLORS[review.platform] || '#4B5563',
                    background: PLATFORM_COLORS[review.platform] || '#F3F4F6',
                    border: review.platform === 'instagram' ? 'none' : `1px solid ${PLATFORM_TEXT_COLORS[review.platform]}40`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                    {PLATFORM_ICONS[review.platform] || <Star size={14} />}
                    {PLATFORM_NAMES[review.platform] || 'Review'}
                </div>
            </div>

            {/* Rating */}
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem' }}>
                {renderStars(review.rating)}
            </div>

            {/* Review Text */}
            <p style={{
                color: 'var(--color-text-main)',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                flex: 1,
                margin: 0
            }}>
                "{review.review}"
            </p>

            {/* Verified Badge (if applicable) */}
            {review.verified && (
                <div style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e2e8f0',
                    fontSize: '0.75rem',
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                }}>
                    ✓ Verified Client
                </div>
            )}
        </div>
    );
};

export default ReviewCard;
