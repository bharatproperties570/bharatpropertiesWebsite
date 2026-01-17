import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const ProjectLocation = ({ address, projectName }) => {
    const fullAddress = `${address.street}, ${address.locality}, ${address.city}, ${address.state} ${address.zip}, ${address.country}`;

    // Google Maps URL
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

    return (
        <section style={{ padding: '3rem 0', backgroundColor: '#F9FAFB' }}>
            <div className="container">
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    marginBottom: '2rem'
                }}>
                    Location & Address
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2rem',
                    '@media (max-width: 768px)': {
                        gridTemplateColumns: '1fr'
                    }
                }}>
                    {/* Address Details */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2rem',
                        boxShadow: 'var(--shadow-md)',
                        border: '1px solid #e2e8f0'
                    }}>
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            color: 'var(--color-text-main)',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <MapPin size={24} color="var(--color-primary)" />
                            Project Address
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                    Street
                                </div>
                                <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
                                    {address.street}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                    Locality
                                </div>
                                <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
                                    {address.locality}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                        City
                                    </div>
                                    <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
                                        {address.city}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                        PIN Code
                                    </div>
                                    <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
                                        {address.zip}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                    State
                                </div>
                                <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
                                    {address.state}, {address.country}
                                </div>
                            </div>
                        </div>

                        {/* Get Directions Button */}
                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                marginTop: '1.5rem',
                                padding: '0.75rem 1.5rem',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: 600,
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-primary)'}
                        >
                            <Navigation size={18} />
                            Get Directions
                        </a>
                    </div>

                    {/* Map Placeholder */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-md)',
                        border: '1px solid #e2e8f0',
                        height: '400px'
                    }}>
                        {/* Google Maps Embed - Replace with actual Google Maps API */}
                        <iframe
                            title={`${projectName} Location`}
                            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(fullAddress)}`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                        {/* Fallback if no API key */}
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#E5E7EB',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            textAlign: 'center'
                        }}>
                            <MapPin size={48} color="#9CA3AF" style={{ marginBottom: '1rem' }} />
                            <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
                                Map will be displayed here
                            </p>
                            <p style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>
                                Add Google Maps API key to enable interactive map
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectLocation;
