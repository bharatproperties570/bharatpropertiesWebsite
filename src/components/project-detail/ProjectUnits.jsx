'use client';

import React from 'react';
import { Home, Maximize, Download, IndianRupee, ArrowRight, Layout, Sparkles } from 'lucide-react';

const ProjectUnits = ({ unitSizes }) => {

    // Group units by type
    const groupedUnits = unitSizes.reduce((acc, unit) => {
        const typeKey = unit.unitType || unit.type || 'Standard';
        if (!acc[typeKey]) {
            acc[typeKey] = [];
        }
        acc[typeKey].push(unit);
        return acc;
    }, {});

    const splitPrice = (price) => {
        if (!price) return ['Contact', 'for Price'];
        const parts = price.split(' ');
        return [parts[0], parts.slice(1).join(' ')];
    };

    return (
        <section style={{ padding: '8rem 0', backgroundColor: '#fff', position: 'relative' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
                            <Sparkles size={20} color="var(--color-gold)" /> Luxury Configurations
                        </div>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-2.5px', lineHeight: 1 }}>
                            Curated <span style={{ color: 'var(--color-primary)' }}>Selections</span>
                        </h2>
                    </div>
                </div>

                {/* Units by Type */}
                {Object.entries(groupedUnits).map(([unitType, units]) => (
                    <div key={unitType} style={{ marginBottom: '6rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '4rem' }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#1e293b', margin: 0, letterSpacing: '-1px' }}>
                                {unitType} Residences
                            </h3>
                            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent)' }}></div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                            gap: '3rem'
                        }}>
                            {units.map((unit, index) => (
                                <div key={index} className="glass-card" style={{
                                    backgroundColor: '#fff',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    padding: '3rem',
                                    transition: 'var(--transition-bounce)',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-12px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    {/* Unit Header */}
                                    <div style={{ marginBottom: '2.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <h4 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                                                    {unit.name}
                                                </h4>
                                                <div style={{ display: 'inline-flex', padding: '6px 16px', background: 'var(--color-primary)', borderRadius: '100px', color: 'white', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                    {unit.block || 'Main Phase'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pricing Card */}
                                    <div style={{
                                        padding: '2rem',
                                        background: 'var(--grad-gold)',
                                        borderRadius: '24px',
                                        marginBottom: '2.5rem',
                                        boxShadow: '0 15px 30px -10px rgba(217, 119, 6, 0.3)'
                                    }}>
                                        <div style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', opacity: 0.8 }}>Starting From</div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', color: 'var(--color-primary)' }}>
                                            <span style={{ fontSize: '1.25rem', fontWeight: 900 }}>₹</span>
                                            <span style={{ fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-2px' }}>{splitPrice(unit.price)[0]}</span>
                                            <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{splitPrice(unit.price)[1]}</span>
                                        </div>
                                    </div>

                                    {/* Detailed Dimensions */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                                        <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                                            <span style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Carpet Area</span>
                                            <span style={{ fontWeight: 900, color: '#1e293b', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                {unit.carpetArea || 'N/A'} <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>SQFT</span>
                                            </span>
                                        </div>
                                        <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                                            <span style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Layout</span>
                                            <span style={{ fontWeight: 900, color: '#1e293b', fontSize: '1.1rem' }}>
                                                {unit.dimensions?.area?.value || 'Premium'} <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>PLAN</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button style={{
                                        width: '100%',
                                        height: '64px',
                                        backgroundColor: '#0F172A',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '20px',
                                        fontWeight: 900,
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '12px',
                                        boxShadow: '0 10px 20px -5px rgba(15, 23, 42, 0.2)'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F172A'}
                                    >
                                        View Floor Plan <ArrowRight size={20} color="var(--color-gold)" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectUnits;
