import React from 'react';
import { MapPin, Bed, Bath, Square, Plus, Heart } from 'lucide-react';

const PropertyCard = ({ property, onClick }) => {
    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(0,0,0,0.05)',
            position: 'relative'
        }}
            onClick={onClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
        >
            <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <img
                    src={property.image}
                    alt={property.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />

                {/* Status Badge - Glassmorphism */}
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.7)',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    padding: '0.4rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    {property.status || 'Exclusive'}
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (property.onWishlist) property.onWishlist(property);
                    }}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '4.5rem',
                        backgroundColor: 'white',
                        color: property.isWishlisted ? 'var(--color-accent)' : 'var(--color-text-muted)',
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow-md)',
                        cursor: 'pointer',
                        zIndex: 10,
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    title="Add to Wishlist"
                >
                    <Heart size={20} fill={property.isWishlisted ? 'var(--color-accent)' : 'none'} />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (property.onCompare) property.onCompare(property);
                    }}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        backgroundColor: 'white',
                        color: 'var(--color-primary)',
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow-md)',
                        cursor: 'pointer',
                        zIndex: 10,
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0) scale(1)'}
                >
                    <Plus size={20} />
                </button>

                {/* Price Tag - Premium Accent */}
                <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    backgroundColor: 'white',
                    color: 'var(--color-primary)',
                    padding: '0.5rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    {property.price}
                </div>

                {/* Sustainability Score Badge (Future Feature) */}
                <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    backgroundColor: 'var(--color-emerald)',
                    color: 'white',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    🌱 A+ Eco
                </div>
            </div>

            <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--color-primary)', fontWeight: 700, lineHeight: 1.2 }}>
                        {property.title}
                    </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                    <MapPin size={16} />
                    <span>{property.location}</span>
                </div>

                {/* Future Feature: Appreciation Indicator */}
                <div style={{ marginBottom: '1.5rem', padding: '0.75rem', backgroundColor: 'var(--color-bg-light)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--color-emerald)', fontWeight: 700 }}>↑ +12%</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>Est. 5-yr growth</span>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '1.25rem',
                    marginTop: 'auto',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-main)',
                    fontWeight: 500
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Bed size={18} style={{ color: 'var(--color-text-muted)' }} />
                        <span>{property.beds} <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>BHK</span></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Bath size={18} style={{ color: 'var(--color-text-muted)' }} />
                        <span>{property.baths} <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>Bath</span></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Square size={18} style={{ color: 'var(--color-text-muted)' }} />
                        <span>{property.sqft} <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>Sqft</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
