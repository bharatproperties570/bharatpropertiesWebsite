import React from 'react';
import { Sofa, Construction, CalendarSync, Ruler } from 'lucide-react';

const PropertyBuiltup = ({ builtup, furnishing }) => {
    if (!builtup || !furnishing) return null;

    return (
        <section style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2.5rem' }}>
                Builtup & Cluster Details
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div style={{ padding: '2rem', background: 'linear-gradient(to right, #F8FAFC, #fff)', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ padding: '8px', backgroundColor: '#eef2ff', color: '#4f46e5', borderRadius: '10px' }}>
                            <Ruler size={20} />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>Structure: {builtup.type || 'N/A'}</div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Detailed room analysis and floor clusters</div>
                        </div>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    {builtup.floors && builtup.floors.length > 0 ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f8fafc' }}>
                                    <th style={{ padding: '1.25rem 2rem', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Floor</th>
                                    <th style={{ padding: '1.25rem 2rem', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Room/Detail</th>
                                    <th style={{ padding: '1.25rem 2rem', textAlign: 'center', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Length (ft)</th>
                                    <th style={{ padding: '1.25rem 2rem', textAlign: 'center', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Breadth (ft)</th>
                                    <th style={{ padding: '1.25rem 2rem', textAlign: 'right', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Total Area</th>
                                </tr>
                            </thead>
                            <tbody>
                                {builtup.floors.map((floor) => (
                                    floor.clusters?.map((cluster, cIdx) => (
                                        <tr key={`${floor.name}-${cIdx}`} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '1rem 2rem', fontWeight: 700, color: '#1e293b' }}>{cIdx === 0 ? floor.name : ''}</td>
                                            <td style={{ padding: '1rem 2rem', color: '#475569', fontWeight: 600 }}>{cluster.name}</td>
                                            <td style={{ padding: '1rem 2rem', textAlign: 'center', color: '#1e293b', fontWeight: 700 }}>{cluster.length}</td>
                                            <td style={{ padding: '1rem 2rem', textAlign: 'center', color: '#1e293b', fontWeight: 700 }}>{cluster.breadth}</td>
                                            <td style={{ padding: '1rem 2rem', textAlign: 'right', color: 'var(--color-primary)', fontWeight: 800 }}>{cluster.area} <span style={{ fontSize: '0.7rem' }}>SQ.FT</span></td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No building details available</div>
                    )}
                </div>
            </div>

            {/* Construction & Furnishing */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                <div style={{ padding: '2.5rem', backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', color: '#0F172A' }}>
                        <CalendarSync size={24} className="text-primary" />
                        <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Age & Lifecycle</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b' }}>Occupation Date</span>
                            <span style={{ fontWeight: 700 }}>{furnishing.occupationDate}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b' }}>Construction Age</span>
                            <span style={{ fontWeight: 700 }}>{furnishing.age}</span>
                        </div>
                    </div>
                </div>

                <div style={{ padding: '2.5rem', backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', color: '#0F172A' }}>
                        <Sofa size={24} className="text-primary" />
                        <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Furnishing Details</h4>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ width: '100%', marginBottom: '8px', color: '#64748b', fontWeight: 600 }}>Status: <span style={{ color: '#166534' }}>{furnishing.furnishing || 'N/A'}</span></div>
                        {furnishing.furnishingDetails && furnishing.furnishingDetails.map((item, idx) => (
                            <span key={idx} style={{ padding: '6px 14px', backgroundColor: '#F8FAFC', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize' }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertyBuiltup;
