import React, { useState } from 'react';
import PropertyListItem from './PropertyListItem';
import { Filter, Map, List, Maximize2, Minimize2 } from 'lucide-react';

// Reusable Filter Component
const FilterSection = ({ transparent = false }) => (
    <div
        style={{
            backgroundColor: transparent ? 'rgba(255, 255, 255, 0.15)' : 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
            backdropFilter: transparent ? 'blur(10px)' : 'none',
            transition: 'all 0.3s ease',
            height: '100%',
            overflowY: 'auto'
        }}
        onMouseEnter={(e) => {
            if (transparent) {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.opacity = '1';
            }
        }}
        onMouseLeave={(e) => {
            if (transparent) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            }
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Filters</h3>
            <Filter size={16} />
        </div>

        {/* Budget */}
        <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Budget</label>
            <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', color: 'var(--color-text-main)' }}>
                <option>Min Budget</option>
                <option>₹ 50 Lac</option>
                <option>₹ 1 Cr</option>
            </select>
            <div style={{ marginTop: '0.5rem' }}></div>
            <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', color: 'var(--color-text-main)' }}>
                <option>Max Budget</option>
                <option>₹ 2 Cr</option>
                <option>₹ 5 Cr</option>
            </select>
        </div>

        {/* Type of Property */}
        <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, fontSize: '0.9rem' }}>Type of property</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Residential Apartment', 'Independent House/Villa', 'Residential Land', 'Builder Floor'].map(type => (
                    <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }} />
                        {type}
                    </label>
                ))}
            </div>
        </div>

        {/* Bedrooms */}
        <div>
            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, fontSize: '0.9rem' }}>No. of Bedrooms</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK+'].map(bhk => (
                    <button key={bhk} style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px',
                        border: '1px solid #e2e8f0',
                        background: 'white',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                        onMouseEnter={(e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.color = 'var(--color-primary)'; }}
                        onMouseLeave={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.color = 'inherit'; }}
                    >
                        {bhk}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const SearchResults = ({ properties, searchTerm, onPropertySelect }) => {
    const [viewMode, setViewMode] = useState('list');
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Full Screen Map View
    if (viewMode === 'map' && isFullScreen) {
        return (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 2000 }}>
                {/* Map Filters Overlay */}
                <div style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    width: '300px',
                    maxHeight: 'calc(100vh - 4rem)',
                    zIndex: 2010
                }}>
                    <FilterSection transparent={true} />
                </div>

                {/* Map Control Buttons */}
                <div style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    zIndex: 2010,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <button
                        onClick={() => setIsFullScreen(false)}
                        style={{
                            padding: '0.75rem',
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            boxShadow: 'var(--shadow-lg)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-text-main)'
                        }}
                        title="Exit Full Screen"
                    >
                        <Minimize2 size={24} />
                    </button>

                    {/* View Switcher inside Full Screen */}
                    <button
                        onClick={() => { setViewMode('list'); setIsFullScreen(false); }}
                        style={{
                            padding: '0.75rem',
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            boxShadow: 'var(--shadow-lg)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-text-main)'
                        }}
                        title="Switch to List View"
                    >
                        <List size={24} />
                    </button>
                </div>

                {/* Full Screen Map Placeholder */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#e2e8f0',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                        alt="Map View"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </div>
        );
    }

    // Standard View (List or Map in container)
    return (
        <div style={{ padding: '2rem 0', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <div className="container" style={{ display: 'flex', gap: '2rem', marginTop: '80px' }}>

                {/* Sidebar Filters - Left Column (25%) */}
                <div style={{
                    width: '280px',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }} className="sidebar-hidden-mobile">
                    <FilterSection />
                </div>

                {/* Results - Right Column (75%) */}
                <div style={{ flex: 1 }}>

                    {/* Results Header with View Toggles */}
                    <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>
                            {properties.length} results | Property in {searchTerm || 'All Locations'} for Sale
                        </h1>

                        {/* View Toggles */}
                        <div style={{ display: 'flex', backgroundColor: 'white', padding: '0.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <button
                                onClick={() => setViewMode('list')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '6px',
                                    border: 'none',
                                    backgroundColor: viewMode === 'list' ? 'var(--color-primary)' : 'transparent',
                                    color: viewMode === 'list' ? 'white' : 'var(--color-text-muted)',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <List size={18} /> List View
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '6px',
                                    border: 'none',
                                    backgroundColor: viewMode === 'map' ? 'var(--color-primary)' : 'transparent',
                                    color: viewMode === 'map' ? 'white' : 'var(--color-text-muted)',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <Map size={18} /> Map View
                            </button>
                        </div>
                    </div>

                    {/* List View */}
                    {viewMode === 'list' && (
                        properties.length > 0 ? (
                            <div>
                                {properties.map(property => (
                                    <PropertyListItem
                                        key={property.id}
                                        property={property}
                                        onClick={() => onPropertySelect(property.id === 1 ? 'prop-101' : property.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>No properties found</h3>
                                <p style={{ color: 'var(--color-text-muted)' }}>Try adjusting your filters or search for a different city.</p>
                            </div>
                        )
                    )}

                    {/* Map View */}
                    {viewMode === 'map' && (
                        <div style={{
                            height: '600px',
                            backgroundColor: '#e2e8f0',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #cbd5e1'
                        }}>
                            <button
                                onClick={() => setIsFullScreen(true)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    zIndex: 10,
                                    backgroundColor: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0.5rem',
                                    boxShadow: 'var(--shadow-md)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    color: 'var(--color-primary)'
                                }}
                            >
                                <Maximize2 size={18} />
                                Expand Map
                            </button>

                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" // Map Placeholder
                                alt="Map View"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                            />
                            <div style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-lg)',
                                textAlign: 'center',
                                maxWidth: '300px'
                            }}>
                                <Map size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Map View Enabled</h3>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                    Interactive Google Maps integration requires an API key.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <style>{`
          @media (max-width: 900px) {
            .sidebar-hidden-mobile { display: none !important; }
          }
        `}</style>

            </div>
        </div>
    );
};

export default SearchResults;
