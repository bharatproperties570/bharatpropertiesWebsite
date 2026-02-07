import React from 'react';
import Image from 'next/image';

export default function CityShowcase({ city }) {
    if (!city) return null;

    return (
        <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '-20px',
                        width: '100px',
                        height: '100px',
                        backgroundColor: 'var(--color-primary-light)',
                        borderRadius: '20px',
                        zIndex: 0,
                        opacity: 0.3
                    }}></div>
                    <div style={{ position: 'relative', height: '500px', width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', zIndex: 1 }}>
                        <Image
                            src={city.image}
                            alt={city.name}
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                            priority
                        />
                    </div>
                    <div style={{
                        position: 'absolute',
                        bottom: '30px',
                        right: '-20px',
                        backgroundColor: 'white',
                        padding: '1.5rem 2rem',
                        borderRadius: '16px',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        zIndex: 2
                    }}>
                        <div style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.5rem' }}>100+</div>
                        <div style={{ color: '#64748B', fontSize: '0.875rem' }}>Active Projects</div>
                    </div>
                </div>
                <div>
                    <span style={{
                        color: 'var(--color-primary)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontSize: '0.875rem',
                        marginBottom: '1rem',
                        display: 'block'
                    }}>Premium Destination</span>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', color: '#0F172A', lineHeight: 1.2 }}>
                        Experience the Essence of <span style={{ color: 'var(--color-primary)' }}>{city.name}</span>
                    </h2>
                    <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                        {city.description}. Discover a curated selection of properties that reflect the unique spirit and lifestyle of this vibrant city. From modern urban apartments to luxury villas, find your perfect home in the heart of {city.name}.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#334155', fontWeight: 600 }}>
                            <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-accent)', borderRadius: '50%' }}></div>
                            Prime Locations
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#334155', fontWeight: 600 }}>
                            <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-accent)', borderRadius: '50%' }}></div>
                            Verified Listings
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#334155', fontWeight: 600 }}>
                            <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-accent)', borderRadius: '50%' }}></div>
                            Expert Guidance
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
