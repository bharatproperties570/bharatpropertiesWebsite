import React from 'react';
import { Map, Info, Navigation2 } from 'lucide-react';

const PropertyLocation = ({ location }) => {
    return (
        <div style={{ position: 'sticky', top: '240px' }}>
            <div style={{ padding: '2.5rem', backgroundColor: '#0F172A', color: '#fff', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(15,23,42,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                    <Map size={24} className="text-primary" />
                    <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Exact Location</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.6, fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Address</div>
                        <div style={{ fontWeight: 600, fontSize: '1.05rem', lineHeight: '1.4' }}>
                            {location.address}, {location.street}<br />
                            {location.urbanEstate}, {location.locality}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.6, fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>City</div>
                            <div style={{ fontWeight: 700 }}>{location.city}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.6, fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Zip</div>
                            <div style={{ fontWeight: 700 }}>{location.zip}</div>
                        </div>
                    </div>

                    <div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.6, fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>State/Country</div>
                        <div style={{ fontWeight: 700 }}>{location.state}, {location.country}</div>
                    </div>
                </div>

                <div style={{
                    marginTop: '2.5rem',
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700 }}>
                        <Info size={16} /> Google Maps Note
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8, lineHeight: '1.5' }}>
                        Google Maps API key is required for dynamic loading. Static address is verified.
                    </div>
                    <button style={{
                        marginTop: '8px',
                        width: '100%',
                        padding: '12px',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}>
                        <Navigation2 size={16} /> Get Directions
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyLocation;
