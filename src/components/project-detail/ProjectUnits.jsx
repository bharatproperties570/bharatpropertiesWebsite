import React from 'react';
import { Home, Maximize, Download, IndianRupee, ArrowRight, Layout } from 'lucide-react';

const ProjectUnits = ({ unitSizes, floorPlans }) => {

    // Group units by type
    const groupedUnits = unitSizes.reduce((acc, unit) => {
        if (!acc[unit.unitType]) {
            acc[unit.unitType] = [];
        }
        acc[unit.unitType].push(unit);
        return acc;
    }, {});

    return (
        <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                            <Layout size={20} /> Inventory & Pricing
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                            Unit <span style={{ color: 'var(--color-primary)' }}>Configurations</span>
                        </h2>
                    </div>
                    {floorPlans && floorPlans.length > 0 && (
                        <button style={{
                            padding: '1rem 2rem',
                            backgroundColor: '#0F172A',
                            color: 'white',
                            border: 'none',
                            borderRadius: '16px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.2)'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.backgroundColor = '#0F172A';
                            }}
                        >
                            <Download size={20} />
                            Download Brochure
                        </button>
                    )}
                </div>

                {/* Units by Type */}
                {Object.entries(groupedUnits).map(([unitType, units]) => (
                    <div key={unitType} style={{ marginBottom: '5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                                {unitType} Apartments
                            </h3>
                            <div style={{ height: '2px', flex: 1, background: 'linear-gradient(to right, #e2e8f0, transparent)' }}></div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                            gap: '2.5rem'
                        }}>
                            {units.map((unit, index) => (
                                <div key={index} style={{
                                    backgroundColor: 'white',
                                    border: '1px solid #f1f5f9',
                                    borderRadius: '32px',
                                    padding: '2.5rem',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--color-primary)33';
                                        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.05)';
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = '#f1f5f9';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {/* Unit Header */}
                                    <div style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                                                {unit.name}
                                            </h4>
                                            <div style={{ padding: '6px 12px', background: '#eef2ff', borderRadius: '10px', color: '#4f46e5', fontSize: '0.75rem', fontWeight: 800 }}>
                                                {unit.block}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pricing Card */}
                                    <div style={{
                                        padding: '1.5rem',
                                        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                                        borderRadius: '24px',
                                        marginBottom: '2rem',
                                        border: '1px solid #86efac44'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#166534' }}>₹</span>
                                            <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#166534', letterSpacing: '-0.02em' }}>{unit.price.split(' ')[0]}</span>
                                            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#166534' }}>{unit.price.split(' ')[1]}</span>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#15803d', fontWeight: 600, marginTop: '4px', opacity: 0.8 }}>
                                            approx. ₹{unit.pricePerSqFt} / sq.ft
                                        </div>
                                    </div>

                                    {/* Detailed Dimensions */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.25rem', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                                            <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>Carpet Area</span>
                                            <span style={{ fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Maximize size={16} /> {unit.carpetArea} <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>SQ.FT</span>
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.25rem', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                                            <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>Architecture</span>
                                            <span style={{ fontWeight: 800, color: '#1e293b' }}>
                                                {unit.dimensions.length.value}' × {unit.dimensions.breadth.value}' <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>FT</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button style={{
                                        width: '100%',
                                        height: '56px',
                                        backgroundColor: 'white',
                                        border: '2px solid #e2e8f0',
                                        color: '#1e293b',
                                        borderRadius: '18px',
                                        fontWeight: 800,
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                                            e.currentTarget.style.color = 'var(--color-primary)';
                                            e.currentTarget.style.backgroundColor = 'var(--color-primary)05';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#e2e8f0';
                                            e.currentTarget.style.color = '#1e293b';
                                            e.currentTarget.style.backgroundColor = 'white';
                                        }}
                                    >
                                        Plan Details <ArrowRight size={18} />
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
