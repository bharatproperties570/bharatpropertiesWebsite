import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const PLATFORM_COLORS = {
    google: '#4285F4',
    facebook: '#1877F2',
    instagram: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    form: '#0f766e'
};

const PLATFORM_NAMES = {
    google: 'Google Reviews',
    facebook: 'Facebook',
    instagram: 'Instagram',
    form: 'Client Feedback'
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

                {/* Platform Badge */}
                <div style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'white',
                    background: review.platform === 'instagram' ? PLATFORM_COLORS[review.platform] : PLATFORM_COLORS[review.platform] || '#6B7280',
                    whiteSpace: 'nowrap'
                }}>
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
