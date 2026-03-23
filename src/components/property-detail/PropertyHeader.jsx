'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Building2, Share2, Heart, ShieldCheck, BadgeCheck, Plus, Calendar, ArrowRight, Maximize2 } from 'lucide-react';

const PropertyHeader = ({ property, onBookConsultation }) => {
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
                title: property.title || property.unitName,
                text: `Check out this property: ${property.title || property.unitName}`,
                url: window.location.href
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

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
                    marginBottom: '-80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    {/* Background Image */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${property.media?.[0] || property.images?.[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: 'scale(1.02)'
                    }}>
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%)'
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
                            marginBottom: '2.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            <BadgeCheck size={16} color="var(--color-gold)" />
                            {property.ownership || 'Premium Deal'}
                        </div>

                        <h1 style={{ 
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
                            fontWeight: 900, 
                            color: 'white', 
                            margin: '0 0 1rem',
                            lineHeight: 1.2,
                            letterSpacing: '-1px',
                            textShadow: '0 20px 40px rgba(0,0,0,0.3)'
                        }}>
                            {property.availableString}
                        </h1>

                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '24px', 
                            color: 'rgba(255,255,255,0.9)', 
                            marginBottom: '4rem',
                            fontSize: '1.25rem',
                            fontWeight: 600
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <MapPin size={24} color="var(--color-gold)" />
                                <span>in <span style={{ color: 'var(--color-gold)' }}>{property.title || property.unitName}</span>, {property.location?.locality || property.location?.sector}, {property.location?.city}</span>
                            </div>
                        </div>

                        <div className="glass-card" style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                            gap: '1px', 
                            backgroundColor: 'rgba(255,255,255,0.1)', 
                            padding: '1px',
                            maxWidth: '1200px',
                            margin: '0 auto',
                            overflow: 'hidden'
                        }}>
                            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', padding: '2.5rem', textAlign: 'center' }}>
                                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '2px' }}>Value</div>
                                <div style={{ color: 'var(--color-gold)', fontSize: '2.2rem', fontWeight: 900 }}>{property.price}</div>
                            </div>
                            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', padding: '2.5rem', textAlign: 'center' }}>
                                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '2px' }}>Configuration</div>
                                <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>{property.type || property.propertyType}</div>
                            </div>
                            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', padding: '2.5rem', textAlign: 'center' }}>
                                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '2px' }}>Area</div>
                                <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>{property.sqft}</div>
                            </div>
                            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', padding: '2.5rem', textAlign: 'center' }}>
                                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '2px' }}>Status</div>
                                <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>Available</div>
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
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Explore Details</div>
                        <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, white, transparent)' }}></div>
                    </div>
                </div>
            )}

            {/* Sticky Navigation Header */}
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                position: 'sticky',
                top: '0',
                zIndex: 1000,
                transform: isScrolled ? 'translateY(0)' : 'translateY(-100%)',
                opacity: isScrolled ? 1 : 0,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: '0.75rem 0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{property.title || property.unitName}</h2>
                        <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-primary)' }}>{property.price}</div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button 
                            onClick={() => setIsSaved(!isSaved)}
                            style={{ padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', color: isSaved ? '#ef4444' : '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}
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
                            Enquire Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyHeader;
