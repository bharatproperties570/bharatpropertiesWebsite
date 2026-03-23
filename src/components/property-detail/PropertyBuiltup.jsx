import React from 'react';
import { Sofa, Construction, CalendarSync, Ruler, CheckCircle2, LayoutGrid, Info } from 'lucide-react';

const PropertyBuiltup = ({ builtup, furnishing }) => {
    if (!builtup || !furnishing) return null;

    return (
        <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2.5rem' }}>
                <span style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-gold)' }}></span>
                Architecture & Interiors
            </div>

            <div className="glass-card" style={{ backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                <div style={{ padding: '2.5rem', background: 'linear-gradient(to right, rgba(248, 250, 252, 0.5), #fff)', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ padding: '12px', backgroundColor: 'rgba(79, 70, 229, 0.05)', color: 'var(--color-primary)', borderRadius: '14px' }}>
                            <LayoutGrid size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>{builtup.type || 'Standard Layout'}</div>
                            <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>Structural analysis and floor clusters</div>
                        </div>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    {builtup.floors && builtup.floors.length > 0 ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f8fafc' }}>
                                    <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontSize: '0.75rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Level</th>
                                    <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontSize: '0.75rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Component</th>
                                    <th style={{ padding: '1.5rem 2rem', textAlign: 'center', fontSize: '0.75rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Dim (ft)</th>
                                    <th style={{ padding: '1.5rem 2rem', textAlign: 'right', fontSize: '0.75rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Area</th>
                                </tr>
                            </thead>
                            <tbody>
                                {builtup.floors?.map((floor) => (
                                    floor.clusters?.map((cluster, cIdx) => (
                                        <tr key={`${floor.name}-${cIdx}`} style={{ borderBottom: '1px solid #f1f5f9', transition: 'all 0.2s' }}>
                                            <td style={{ padding: '1.25rem 2rem', fontWeight: 800, color: '#0F172A', verticalAlign: 'top' }}>{cIdx === 0 ? floor.name : ''}</td>
                                            <td style={{ padding: '1.25rem 2rem', color: '#475569', fontWeight: 600 }}>{cluster.name}</td>
                                            <td style={{ padding: '1.25rem 2rem', textAlign: 'center', color: '#0F172A', fontWeight: 700 }}>{cluster.length} <span style={{ opacity: 0.3 }}>×</span> {cluster.breadth}</td>
                                            <td style={{ padding: '1.25rem 2rem', textAlign: 'right', color: 'var(--color-primary)', fontWeight: 900 }}>{cluster.area} <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>SQ.FT</span></td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                            <Info size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <div style={{ fontWeight: 600 }}>Structural data being updated</div>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', marginTop: '3rem' }}>
                <div className="glass-card" style={{ padding: '2.5rem', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                        <div style={{ padding: '10px', background: 'rgba(79, 70, 229, 0.05)', borderRadius: '12px', color: 'var(--color-primary)' }}>
                            <CalendarSync size={20} />
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Age & Lifecycle</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Occupation Date</span>
                            <span style={{ fontWeight: 800, color: '#0F172A' }}>{furnishing.occupationDate || 'TBD'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Construction Age</span>
                            <span style={{ fontWeight: 800, color: '#0F172A' }}>{furnishing.age || 'Brand New'}</span>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '2.5rem', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '10px', background: 'rgba(79, 70, 229, 0.05)', borderRadius: '12px', color: 'var(--color-primary)' }}>
                            <Sofa size={20} />
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Furnishing & Fixtures</h4>
                    </div>
                    <div>
                        <div style={{ marginBottom: '1.5rem', fontSize: '0.95rem', fontWeight: 700, color: '#166534', background: '#dcfce7', padding: '8px 16px', borderRadius: '10px', width: 'fit-content' }}>
                           Status: {String(furnishing.furnishing || 'Unfurnished')}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {furnishing.furnishingDetails && furnishing.furnishingDetails.length > 0 ? (
                                furnishing.furnishingDetails.map((item, idx) => (
                                    <span key={idx} style={{ 
                                        padding: '8px 16px', 
                                        backgroundColor: 'white', 
                                        border: '1px solid #e2e8f0', 
                                        borderRadius: '12px', 
                                        fontSize: '0.85rem', 
                                        fontWeight: 600, 
                                        color: '#475569',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}>
                                        <CheckCircle2 size={12} className="text-primary" />
                                        {item}
                                    </span>
                                ))
                            ) : (
                                <span style={{ color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' }}>Standard fixtures included.</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertyBuiltup;
