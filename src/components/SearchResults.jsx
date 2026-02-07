'use client';

import React, { useState } from 'react';
import PropertyListItem from './PropertyListItem';
import PropertyMapView from './PropertyMapView';
import { Filter, Map, List, Maximize2, Minimize2, MapPin } from 'lucide-react';

// Reusable Filter Component
const FilterSection = ({ transparent = false, onFilterChange, resultsCount, onShowResults }) => {
    const [isHovered, setIsHovered] = useState(false);

    const containerStyle = {
        backgroundColor: isHovered || !transparent ? 'rgba(255, 255, 255, 1)' : 'transparent',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        boxShadow: isHovered || !transparent ? '0 30px 60px rgba(0,0,0,0.2)' : 'none',
        backdropFilter: isHovered || !transparent ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isHovered || !transparent ? 'blur(20px)' : 'none',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        height: '100%',
        overflowY: 'auto',
        border: isHovered || !transparent ? '1px solid white' : '1px solid transparent',
        color: isHovered || !transparent ? 'var(--color-primary)' : 'white',
        pointerEvents: 'auto',
        display: 'flex',
        flexDirection: 'column'
    };

    return (
        <div
            style={containerStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: isHovered || !transparent ? 'var(--color-primary)' : 'white',
                    textShadow: isHovered || !transparent ? 'none' : '0 2px 4px rgba(0,0,0,0.5)',
                    margin: 0
                }}>Filters</h3>
                <Filter size={18} color={isHovered || !transparent ? 'var(--color-primary)' : 'white'} />
            </div>

            <div style={{ flex: 1 }}>
                {/* Budget */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.85rem', color: isHovered || !transparent ? '#64748b' : 'rgba(255,255,255,0.9)' }}>Budget</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select
                            onChange={onFilterChange}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: 'var(--color-text-main)', fontSize: '0.85rem' }}
                        >
                            <option>Min</option>
                            <option>₹ 50 Lac</option>
                            <option>₹ 1 Cr</option>
                        </select>
                        <select
                            onChange={onFilterChange}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: 'var(--color-text-main)', fontSize: '0.85rem' }}
                        >
                            <option>Max</option>
                            <option>₹ 2 Cr</option>
                            <option>₹ 5 Cr</option>
                        </select>
                    </div>
                </div>

                {/* Type of Property */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, fontSize: '0.85rem', color: isHovered || !transparent ? '#64748b' : 'rgba(255,255,255,0.9)' }}>Property Type</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {['Apartment', 'Villa', 'Land', 'Floor'].map(type => (
                            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', cursor: 'pointer', color: isHovered || !transparent ? 'inherit' : 'white' }}>
                                <input
                                    type="checkbox"
                                    onChange={onFilterChange}
                                    style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }}
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Bedrooms */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, fontSize: '0.85rem', color: isHovered || !transparent ? '#64748b' : 'rgba(255,255,255,0.9)' }}>Bedrooms</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {['1 BHK', '2 BHK', '3 BHK', '4 BHK+'].map(bhk => (
                            <button
                                key={bhk}
                                onClick={onFilterChange}
                                style={{
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '20px',
                                    border: '1px solid #e2e8f0',
                                    background: 'white',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    color: 'var(--color-text-main)'
                                }}
                            >
                                {bhk}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Apply Button (Only in transparent/map mode) */}
            {onShowResults && (
                <button
                    onClick={onShowResults}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        marginTop: '1rem',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Show {resultsCount} Properties
                </button>
            )}
        </div>
    );
};

const SearchResults = ({ properties, searchTerm, onPropertySelect }) => {
    const [viewMode, setViewMode] = useState('list');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showResultsOnMap, setShowResultsOnMap] = useState(false);

    // Full Screen Map View
    if (viewMode === 'map' && isFullScreen) {
        return (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 2000 }}>
                {/* Map Side Panel */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '380px',
                    height: '100%',
                    zIndex: 2010,
                    backgroundColor: showResultsOnMap ? 'white' : 'transparent',
                    boxShadow: showResultsOnMap ? '30px 0 60px rgba(0,0,0,0.2)' : 'none',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    pointerEvents: 'none'
                }}>
                    <div style={{ flex: 1, pointerEvents: 'auto', padding: showResultsOnMap ? '0' : '2rem' }}>
                        {showResultsOnMap ? (
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{properties.length} Results Found</h3>
                                    <button
                                        onClick={() => setShowResultsOnMap(false)}
                                        style={{ background: 'var(--color-primary)', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', color: 'white' }}
                                    >
                                        Edit Filters
                                    </button>
                                </div>
                                <div style={{ flex: 1, overflowY: 'auto' }}>
                                    {properties.map(p => (
                                        <div
                                            key={p.id}
                                            onClick={() => onPropertySelect(p.id)}
                                            style={{
                                                display: 'flex',
                                                gap: '1rem',
                                                padding: '1.25rem',
                                                borderBottom: '1px solid #f1f5f9',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <div style={{ width: '100px', height: '100px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden' }}>
                                                <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.4rem', color: '#1e293b' }}>{p.title}</h4>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#64748b', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                                                    <MapPin size={12} /> {p.location}
                                                </div>
                                                <div style={{ fontSize: '1.1rem', color: 'var(--color-primary)', fontWeight: 800 }}>{p.price}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <FilterSection
                                transparent={true}
                                resultsCount={properties.length}
                                onShowResults={() => setShowResultsOnMap(true)}
                                onFilterChange={() => { }} // No transition on filter change anymore
                            />
                        )}
                    </div>
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
                        style={{ padding: '0.75rem', backgroundColor: 'white', border: 'none', borderRadius: '50%', boxShadow: 'var(--shadow-lg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-main)' }}
                        title="Exit Full Screen"
                    >
                        <Minimize2 size={24} />
                    </button>
                    <button
                        onClick={() => { setViewMode('list'); setIsFullScreen(false); }}
                        style={{ padding: '0.75rem', backgroundColor: 'white', border: 'none', borderRadius: '50%', boxShadow: 'var(--shadow-lg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-main)' }}
                        title="Switch to List View"
                    >
                        <List size={24} />
                    </button>
                </div>

                {/* Full Screen Map */}
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <PropertyMapView
                        properties={properties}
                        onPropertySelect={onPropertySelect}
                        onClose={() => { setViewMode('list'); setIsFullScreen(false); }}
                        embedded={true}
                    />
                </div>
            </div>
        );
    }

    // Standard View
    return (
        <div style={{ padding: '2rem 0', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <div className="container" style={{ display: 'flex', gap: '2rem', marginTop: '80px' }}>
                {/* Sidebar Filters */}
                <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="sidebar-hidden-mobile">
                    <FilterSection />
                </div>

                {/* Results Column */}
                <div style={{ flex: 1 }}>
                    {/* Header */}
                    <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>
                            {properties.length} results | Property in {searchTerm || 'All Locations'} for Sale
                        </h1>

                        <div style={{ display: 'flex', backgroundColor: 'white', padding: '0.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <button
                                onClick={() => setViewMode('list')}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', backgroundColor: viewMode === 'list' ? 'var(--color-primary)' : 'transparent', color: viewMode === 'list' ? 'white' : 'var(--color-text-muted)', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}
                            >
                                <List size={18} /> List View
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', backgroundColor: viewMode === 'map' ? 'var(--color-primary)' : 'transparent', color: viewMode === 'map' ? 'white' : 'var(--color-text-muted)', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}
                            >
                                <Map size={18} /> Map View
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    {viewMode === 'list' ? (
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
                    ) : (
                        <div style={{ height: '600px', backgroundColor: '#e2e8f0', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative', border: '1px solid #cbd5e1' }}>
                            <button
                                onClick={() => setIsFullScreen(true)}
                                style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1000, backgroundColor: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem', boxShadow: 'var(--shadow-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-primary)' }}
                            >
                                <Maximize2 size={18} /> Expand Map
                            </button>
                            <PropertyMapView properties={properties} onPropertySelect={onPropertySelect} onClose={() => setViewMode('list')} embedded={true} />
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .sidebar-hidden-mobile { display: none !important; }
                }
            `}</style>
        </div>
    );
};

export default SearchResults;
