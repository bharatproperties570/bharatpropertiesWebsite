import React, { useState } from 'react';
import { Star, Send, CheckCircle, X } from 'lucide-react';
import { countryCodes } from '../data/countryCodes';

const FeedbackForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+91',
        phone: '',
        rating: 0,
        review: ''
    });
    const [hoverRating, setHoverRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real implementation, this would send to backend
        console.log('Feedback submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', rating: 0, review: '' });
            if (onClose) onClose();
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '2rem'
        }}
            onClick={onClose}
        >
            <div
                style={{
                    maxWidth: '700px',
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    padding: '3rem',
                    position: 'relative',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: '#f1f5f9',
                        border: 'none',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#64748b',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{
                        fontSize: '2rem',
                        marginBottom: '0.75rem',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-primary)'
                    }}>
                        Share Your Experience
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.5 }}>
                        Your feedback helps us serve you better and helps others make informed decisions.
                    </p>
                </div>

                {submitted ? (
                    /* Success Message */
                    <div style={{
                        backgroundColor: '#F0FDF4',
                        border: '2px solid #86EFAC',
                        borderRadius: '16px',
                        padding: '3rem',
                        textAlign: 'center'
                    }}>
                        <CheckCircle size={64} color="#22C55E" style={{ margin: '0 auto 1rem' }} />
                        <h3 style={{ color: '#166534', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                            Thank You!
                        </h3>
                        <p style={{ color: '#15803D' }}>
                            Your feedback has been submitted successfully. We appreciate your time!
                        </p>
                    </div>
                ) : (
                    /* Feedback Form */
                    <form onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: 700,
                                color: '#334155',
                                fontSize: '0.9rem'
                            }}>
                                Your Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your full name"
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1.25rem',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.2s'
                                }}
                                onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.1)'; }}
                                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>

                        {/* Email and Phone */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: 700,
                                    color: '#334155',
                                    fontSize: '0.9rem'
                                }}>
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your@email.com"
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1.25rem',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'all 0.2s'
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.1)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: 700,
                                    color: '#334155',
                                    fontSize: '0.9rem'
                                }}>
                                    Phone *
                                </label>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <select
                                        name="countryCode"
                                        value={formData.countryCode}
                                        onChange={handleChange}
                                        style={{
                                            width: '100px',
                                            padding: '0.875rem 0.5rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '12px',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            transition: 'all 0.2s',
                                            backgroundColor: 'white',
                                            cursor: 'pointer'
                                        }}
                                        onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.1)'; }}
                                        onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                    >
                                        {countryCodes.map((item) => (
                                            <option key={`${item.country}-${item.code}`} value={item.code}>
                                                {item.flag} {item.code}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your phone number"
                                        style={{
                                            flex: 1,
                                            padding: '0.875rem 1.25rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'all 0.2s'
                                        }}
                                        onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.1)'; }}
                                        onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Rating */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.75rem',
                                fontWeight: 700,
                                color: '#334155',
                                fontSize: '0.9rem'
                            }}>
                                Your Rating *
                            </label>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={36}
                                        fill={(hoverRating || formData.rating) >= star ? '#FBBF24' : 'none'}
                                        color={(hoverRating || formData.rating) >= star ? '#FBBF24' : '#CBD5E1'}
                                        style={{ cursor: 'pointer', transition: 'all 0.2s', transform: (hoverRating || formData.rating) >= star ? 'scale(1.1)' : 'scale(1)' }}
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Review Text */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: 700,
                                color: '#334155',
                                fontSize: '0.9rem'
                            }}>
                                Your Review *
                            </label>
                            <textarea
                                name="review"
                                value={formData.review}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Tell us about your experience with Bharat Properties..."
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1.25rem',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    resize: 'none',
                                    fontFamily: 'inherit'
                                }}
                                onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.1)'; }}
                                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!formData.name || !formData.email || !formData.phone || !formData.rating || !formData.review}
                            style={{
                                width: '100%',
                                padding: '1.25rem',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '14px',
                                fontSize: '1.1rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                transition: 'all 0.3s ease',
                                opacity: (!formData.name || !formData.email || !formData.phone || !formData.rating || !formData.review) ? 0.5 : 1,
                                boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.4)'
                            }}
                            onMouseEnter={(e) => {
                                if (formData.name && formData.email && formData.phone && formData.rating && formData.review) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                            }}
                        >
                            <Send size={20} />
                            Submit Feedback
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default FeedbackForm;
