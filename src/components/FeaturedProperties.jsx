'use client';

import React from 'react';
import PropertyCard from './PropertyCard';

const FeaturedProperties = ({ properties, onPropertySelect }) => {
    return (
        <section id="featured" style={{ padding: 'var(--spacing-xl) 0', backgroundColor: 'var(--color-bg-light)' }}>
            <div className="container reveal">
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-primary)'
                    }}>
                        Featured Listings
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Explore our hand-picked selection of the most exclusive properties available now.
                    </p>
                </div>

                {properties.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '2rem'
                    }}>
                        {properties.map(property => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                onClick={() => onPropertySelect(property.id === 1 ? 'prop-101' : property.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                        <p>No properties found matching your search.</p>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                marginTop: '1rem',
                                color: 'var(--color-primary)',
                                textDecoration: 'underline',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Show all properties
                        </button>
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)' }}>
                    <button style={{
                        backgroundColor: 'transparent',
                        border: '2px solid var(--color-primary)',
                        color: 'var(--color-primary)',
                        padding: '1rem 2rem',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'var(--color-primary)';
                            e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = 'var(--color-primary)';
                        }}
                    >
                        View All Properties
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProperties;
