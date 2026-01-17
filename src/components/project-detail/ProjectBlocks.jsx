import React from 'react';
import { Building2, Layers, Home, Calendar, ShieldCheck, Map, LayoutPanelLeft } from 'lucide-react';

const ProjectBlocks = ({ blocks }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' });
    };

    return (
        <section style={{ padding: '5rem 0', backgroundColor: '#F8FAFC' }}>
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                    <LayoutPanelLeft size={20} /> Architectural Layout
                </div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '3rem', letterSpacing: '-0.02em' }}>
                    Towers & <span style={{ color: 'var(--color-primary)' }}>Blocks</span>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {blocks.map((block, index) => (
                        <div key={index} style={{
                            backgroundColor: 'white',
                            borderRadius: '32px',
                            padding: '2.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)',
                            border: '1px solid #f1f5f9',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.05)';
                                e.currentTarget.style.borderColor = 'var(--color-primary)22';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.02)';
                                e.currentTarget.style.borderColor = '#f1f5f9';
                            }}
                        >
                            {/* Status Ribbon */}
                            <div style={{
                                position: 'absolute',
                                top: '24px',
                                right: '24px',
                                padding: '6px 14px',
                                borderRadius: '12px',
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                backgroundColor: block.status === 'Ready to Move' ? '#dcfce7' : '#fef9c3',
                                color: block.status === 'Ready to Move' ? '#166534' : '#854d0e',
                                letterSpacing: '0.05em'
                            }}>
                                {block.status}
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>
                                    {block.name}
                                </h3>
                                <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Map size={14} /> {block.category} • {block.subCategory}
                                </div>
                            </div>

                            {/* Tower Stats */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem',
                                marginBottom: '2rem'
                            }}>
                                <div style={{ padding: '1.25rem', backgroundColor: '#f8fafc', borderRadius: '20px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>{block.totalFloors}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Floors</div>
                                </div>
                                <div style={{ padding: '1.25rem', backgroundColor: '#f8fafc', borderRadius: '20px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6366f1' }}>{block.totalUnits}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Total Units</div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0 4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>Land Area</span>
                                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>{block.landArea} Acres</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>Possession By</span>
                                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Calendar size={16} className="text-primary" /> {formatDate(block.possession)}
                                    </span>
                                </div>
                            </div>

                            {block.reraNumber && (
                                <div style={{
                                    marginTop: '2rem',
                                    paddingTop: '1.5rem',
                                    borderTop: '1px dashed #e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '0.85rem',
                                    color: '#166534',
                                    fontWeight: 700
                                }}>
                                    <ShieldCheck size={18} />
                                    <span>Verified RERA: {block.reraNumber}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectBlocks;
