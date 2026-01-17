import React from 'react';
import { MapPin, Building2, Share2, Heart, ShieldCheck, BadgeCheck, Plus, Calendar } from 'lucide-react';

const PropertyHeader = ({ property, onAddToCompare, onBookConsultation }) => {
    return (
        <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: '80px', zIndex: 100, backdropFilter: 'blur(8px)' }}>
            <div className="container" style={{ padding: '1.5rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <span style={{ padding: '4px 12px', backgroundColor: '#eef2ff', color: '#4f46e5', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                                {property.ownership}
                            </span>
                            <span style={{ padding: '4px 12px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                                {property.stage}
                            </span>
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.03em' }}>
                            {property.unitName}
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px', color: '#64748b', fontWeight: 500 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <MapPin size={16} className="text-primary" />
                                {property.location.sector}, {property.location.city}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Building2 size={16} />
                                {property.block}
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-primary)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                            {property.price}
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={onBookConsultation}
                                style={{ padding: '0 1.25rem', height: '48px', borderRadius: '14px', backgroundColor: '#eef2ff', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontWeight: 800, fontSize: '0.9rem', border: '1px solid #c7d2fe' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#fff'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#eef2ff'}
                            >
                                <Calendar size={18} /> Book Consultation
                            </button>
                            <button
                                onClick={() => onAddToCompare(property)}
                                style={{ padding: '0 1.25rem', height: '48px', borderRadius: '14px', border: '2px solid var(--color-primary)', backgroundColor: '#fff', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}
                            >
                                <Plus size={18} /> Compare
                            </button>
                            <button style={{ width: '48px', height: '48px', borderRadius: '14px', border: '1px solid #e2e8f0', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <Heart size={20} />
                            </button>
                            <button style={{ padding: '0 1.5rem', height: '48px', borderRadius: '14px', backgroundColor: '#f8fafc', color: '#1e293b', border: '1px solid #e2e8f0', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <Share2 size={18} /> Share
                            </button>
                            {property.brochure && (
                                <a
                                    href={property.brochure}
                                    download
                                    style={{
                                        padding: '0 1.5rem',
                                        height: '48px',
                                        borderRadius: '14px',
                                        backgroundColor: '#0F172A',
                                        color: '#fff',
                                        border: 'none',
                                        fontWeight: 700,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.2)'
                                    }}
                                >
                                    📥 Brochure
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyHeader;
