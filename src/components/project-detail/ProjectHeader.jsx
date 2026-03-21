'use client';

import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Calendar, CheckCircle, Download, Share2, Heart, ShieldCheck, ArrowRight, Plus, ExternalLink } from 'lucide-react';

const ProjectHeader = ({ project, onBookConsultation }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: project.name,
                text: project.description,
                url: window.location.href
            }).catch(() => {});
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
        <>
            {/* Cinematic Hero Section (Full Bleed) */}
            {!isScrolled && (
                <div style={{
                    position: 'relative',
                    height: '85vh',
                    minHeight: '600px',
                    width: '100%',
                    backgroundColor: '#0f172a',
                    marginBottom: '-80px', // Pull content up
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    {/* Background Image with Parallax-ready style */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${project.featuredImage || (project.images?.[0]?.url)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: 'scale(1.05)',
                        transition: 'transform 10s linear'
                    }}>
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)'
                        }}></div>
                    </div>

                    <div className="container animate-reveal" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                        <div style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            padding: '10px 24px', 
                            backgroundColor: 'rgba(255,255,255,0.1)', 
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '100px',
                            color: 'white',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            marginBottom: '2rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            <Building2 size={16} color="var(--color-gold)" />
                            {project.category || 'Premium Collection'}
                        </div>

                        <h1 style={{ 
                            fontSize: 'clamp(3rem, 8vw, 6rem)', 
                            fontWeight: 900, 
                            color: 'white', 
                            margin: '0 0 1.5rem',
                            lineHeight: 1,
                            letterSpacing: '-2px',
                            textShadow: '0 20px 40px rgba(0,0,0,0.3)'
                        }}>
                            {project.name}
                        </h1>

                        <p style={{ 
                            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
                            color: 'rgba(255,255,255,0.7)', 
                            maxWidth: '800px', 
                            margin: '0 auto 4rem',
                            lineHeight: 1.6
                        }}>
                            {project.address?.locality ? `${project.address.locality}, ` : ''}{project.address?.city}
                        </p>

                        <div className="glass-card" style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                            gap: '1px', 
                            backgroundColor: 'rgba(255,255,255,0.1)', 
                            padding: '1px',
                            maxWidth: '1000px',
                            margin: '0 auto'
                        }}>
                            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', padding: '2rem', textAlign: 'center' }}>
                                <div style={{ color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>Status</div>
                                <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700 }}>{project.status}</div>
                            </div>
                            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', padding: '2rem', textAlign: 'center' }}>
                                <div style={{ color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>Possession</div>
                                <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700 }}>{project.possession || 'Commenced'}</div>
                            </div>
                            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', padding: '2rem', textAlign: 'center' }}>
                                <div style={{ color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>Inventory</div>
                                <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700 }}>{project.totalUnits > 0 ? `${project.totalUnits} Units` : 'Select Lots'}</div>
                            </div>
                            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', padding: '2rem', textAlign: 'center' }}>
                                <div style={{ color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>RERA</div>
                                <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700 }}>{project.rera || 'Applied'}</div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        opacity: 0.5
                    }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Scroll to Explore</div>
                        <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, white, transparent)' }}></div>
                    </div>
                </div>
            )}

            {/* Sticky Navigation Header */}
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                position: 'sticky',
                top: '0',
                zIndex: 1000,
                transform: isScrolled ? 'translateY(0)' : 'translateY(-100%)',
                opacity: isScrolled ? 1 : 0,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: '0.75rem 0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{project.name}</h2>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: status.bg, color: status.text, padding: '4px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800 }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: status.dot }}></span>
                                {project.status}
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button 
                            onClick={() => setIsSaved(!isSaved)}
                            style={{ padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', color: isSaved ? '#ef4444' : '#64748b', cursor: 'pointer' }}
                        >
                            <Heart size={20} fill={isSaved ? '#ef4444' : 'none'} />
                        </button>
                        <button 
                            onClick={handleShare}
                            style={{ padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', color: '#1e293b', cursor: 'pointer' }}
                        >
                            <Share2 size={20} />
                        </button>
                        <button 
                            onClick={onBookConsultation}
                            style={{ 
                                padding: '10px 24px', 
                                background: 'var(--grad-gold)', 
                                color: 'var(--color-primary)', 
                                border: 'none', 
                                borderRadius: '12px', 
                                fontWeight: 800, 
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px rgba(217, 119, 6, 0.2)'
                            }}
                        >
                            Book Site Visit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectHeader;
