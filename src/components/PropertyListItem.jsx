import React from 'react';
import { Heart, Phone, MapPin, MessageCircle, Plus } from 'lucide-react';

const PropertyListItem = ({ property, onClick }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            marginBottom: '1.5rem',
            transition: 'box-shadow 0.2s',
            minHeight: '280px', // Changed to minHeight
            cursor: 'pointer'
        }}
            onClick={onClick}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
        >
            {/* Image Section (Left) */}
            <div style={{
                width: '35%',
                position: 'relative',
                minHeight: '100%'
            }}>
                <img
                    src={property.image}
                    alt={property.title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                {property.status && (
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                    }}>
                        {property.status}
                    </div>
                )}
                <button style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer'
                }}>
                    <Heart size={24} />
                </button>
            </div>

            {/* Content Section (Right) */}
            <div style={{
                flex: 1,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                {/* Top Info */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <div>
                            <h3 style={{
                                fontSize: '1.4rem',
                                fontWeight: 700,
                                color: 'var(--color-text-main)',
                                marginBottom: '0.25rem'
                            }}>
                                {property.title}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                <MapPin size={16} />
                                {property.location}
                            </div>
                        </div>
                        {/* RERA Check or similar badge can go here */}
                    </div>

                    {/* Price and Area Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                                {property.price}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                Price (Approx.)
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                                {property.sqft} sqft
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                Super Built-up Area
                            </div>
                        </div>
                    </div>

                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        Experience luxury living with this stunning {property.beds} BHK property in {property.location}.
                        Features {property.baths} bathrooms, modern amenities, and a prime location.
                    </p>
                </div>

                {/* Buttons */}
                <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (property.onCompare) property.onCompare(property);
                        }}
                        style={{
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '2px solid var(--color-primary)',
                            backgroundColor: 'transparent',
                            color: 'var(--color-primary)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Plus size={18} />
                        Compare
                    </button>
                    <button style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'background-color 0.2s'
                    }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-primary)'}
                    >
                        <Phone size={18} />
                        Call Us
                    </button>

                    <button
                        onClick={() => window.open('https://wa.me/919876543210?text=Hi, I am interested in this property', '_blank')}
                        style={{
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#25D366',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#128C7E'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#25D366'}
                    >
                        <MessageCircle size={18} />
                        WhatsApp
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PropertyListItem;
