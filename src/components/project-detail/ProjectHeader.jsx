import React, { useState } from 'react';
import { Building2, MapPin, Calendar, CheckCircle, Download, Share2, Heart, ShieldCheck, ArrowRight, Plus } from 'lucide-react';

const ProjectHeader = ({ project, onAddToCompare }) => {
    const [isSaved, setIsSaved] = useState(false);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: project.name,
                text: project.description,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const statusColors = {
        'Ready to Move': { bg: '#dcfce7', text: '#166534', dot: '#22c55e' },
        'Under Construction': { bg: '#fef9c3', text: '#854d0e', dot: '#eab308' },
        'Upcoming': { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6' }
    };

    const status = statusColors[project.status] || { bg: '#f1f5f9', text: '#475569', dot: '#94a3b8' };

    return (
        <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #f1f5f9',
            position: 'sticky',
            top: '80px',
            zIndex: 100
        }}>
            <div className="container" style={{ padding: '1.25rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>

                    {/* Left: Project Branding */}
                    <div style={{ flex: 1, minWidth: '320px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                                {project.name}
                            </h1>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                backgroundColor: status.bg,
                                color: status.text,
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: status.dot }}></span>
                                {project.status}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.95rem', fontWeight: 500 }}>
                                <MapPin size={16} className="text-primary" />
                                {project.address.locality}, {project.address.city}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.95rem', fontWeight: 500 }}>
                                <Building2 size={16} />
                                By <span style={{ color: '#1e293b', fontWeight: 700 }}>{project.developer.name}</span>
                            </div>
                            {project.approvals.reraCertificate && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontSize: '0.85rem', fontWeight: 700, backgroundColor: '#f0fdf4', padding: '2px 8px', borderRadius: '6px' }}>
                                    <ShieldCheck size={14} />
                                    RERA: {project.reraNumber}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button
                            onClick={onAddToCompare}
                            style={{
                                padding: '0 1.25rem',
                                height: '48px',
                                borderRadius: '14px',
                                border: '2px solid var(--color-primary)',
                                backgroundColor: 'white',
                                color: 'var(--color-primary)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontWeight: 800,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'white';
                                e.currentTarget.style.color = 'var(--color-primary)';
                            }}
                        >
                            <Plus size={18} /> Compare
                        </button>
                        <button
                            onClick={() => setIsSaved(!isSaved)}
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                border: '1px solid #e2e8f0',
                                backgroundColor: 'white',
                                color: isSaved ? '#ef4444' : '#64748b',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                            }}
                        >
                            <Heart size={20} fill={isSaved ? '#ef4444' : 'none'} />
                        </button>

                        <button
                            onClick={handleShare}
                            style={{
                                padding: '0 1.25rem',
                                height: '48px',
                                borderRadius: '14px',
                                border: '1px solid #e2e8f0',
                                backgroundColor: 'white',
                                color: '#1e293b',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                        >
                            <Share2 size={18} /> Share
                        </button>

                        {project.brochure && (
                            <a
                                href={project.brochure}
                                download
                                style={{
                                    padding: '0 1.5rem',
                                    height: '48px',
                                    borderRadius: '14px',
                                    backgroundColor: '#0F172A',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                                <Download size={18} /> Brochure
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectHeader;
