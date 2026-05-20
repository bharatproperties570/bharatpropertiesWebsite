'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Building2, Share2, Heart, ShieldCheck, BadgeCheck, Plus, Calendar, ArrowRight, Maximize2 } from 'lucide-react';

const PropertyHeader = ({ property, onBookConsultation }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const getFormattedExpectedPrice = () => {
        const rawPrice = property.rawPrice;
        if (!rawPrice || isNaN(rawPrice) || rawPrice === 0) {
            return property.price || 'Price on Request';
        }

        const numFormatted = `₹${Number(rawPrice).toLocaleString('en-IN')}`;

        let wordFormatted = '';
        if (rawPrice >= 10000000) {
            const val = (rawPrice / 10000000).toFixed(2).replace(/\.00$/, '');
            wordFormatted = `${val} Crore`;
        } else if (rawPrice >= 100000) {
            const val = (rawPrice / 100000).toFixed(2).replace(/\.00$/, '');
            wordFormatted = `${val} Lac`;
        } else {
            wordFormatted = `${Number(rawPrice).toLocaleString('en-IN')}`;
        }

        return `${numFormatted} (${wordFormatted})`;
    };

    const getPricingNatureLabel = () => {
        if (property.pricingNature?.negotiable) {
            return 'Negotiable';
        }
        if (property.pricingNature?.fixed) {
            return 'Fixed Price';
        }
        return '';
    };

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
                    backgroundImage: `url(${
                        property.image ||
                        (typeof property.media?.[0] === 'object' ? property.media?.[0]?.url : property.media?.[0]) || 
                        (typeof property.images?.[0] === 'object' ? property.images?.[0]?.url : property.images?.[0]) || 
                        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000'
                    })`,
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

                    {/* Size Label • Sub Category (Unit Type) */}
                    {(property.unitType || property.subCategory || property.sqft) && (
                        <div style={{
                            fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                            fontWeight: 800,
                            color: 'var(--color-gold)',
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            flexWrap: 'wrap'
                        }}>
                            {(() => {
                                const toSentenceCase = (str) => {
                                    if (!str) return '';
                                    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
                                };

                                const parts = [];
                                if (property.sqft) {
                                    parts.push(<span key="sz">{property.sqft}</span>);
                                }
                                
                                if (property.subCategory) {
                                    const formattedUnitType = property.unitType ? toSentenceCase(property.unitType) : '';
                                    parts.push(
                                        <span key="sc-ut">
                                            {property.subCategory}
                                            {formattedUnitType && (
                                                <span style={{ textTransform: 'none', marginLeft: '6px' }}>
                                                    ({formattedUnitType})
                                                </span>
                                            )}
                                        </span>
                                    );
                                } else if (property.unitType) {
                                    parts.push(
                                        <span key="ut" style={{ textTransform: 'none' }}>
                                            ({toSentenceCase(property.unitType)})
                                        </span>
                                    );
                                }
                                
                                return parts.reduce((acc, part, index) => {
                                    if (index === 0) return [part];
                                    return [
                                        ...acc, 
                                        <span key={`sep-${index}`} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center' }}>•</span>, 
                                        part
                                    ];
                                }, []);
                            })()}
                        </div>
                    )}

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

                    <div className="glass-card hero-price-card">
                        <div className="hero-price-card-inner">
                            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '3px', whiteSpace: 'nowrap' }}>Expected Price</div>
                            <div className="hero-price-value">
                                {getFormattedExpectedPrice()}
                            </div>
                            {getPricingNatureLabel() && (
                                <div style={{ 
                                    color: 'rgba(255, 255, 255, 0.85)', 
                                    fontSize: '0.8rem', 
                                    fontWeight: 700, 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '2px', 
                                    marginTop: '12px',
                                    display: 'inline-block',
                                    backgroundColor: property.pricingNature?.negotiable ? 'rgba(217, 119, 6, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                                    padding: '4px 16px',
                                    borderRadius: '6px',
                                    border: property.pricingNature?.negotiable ? '1px solid rgba(217, 119, 6, 0.4)' : '1px solid rgba(255, 255, 255, 0.15)',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {getPricingNatureLabel()}
                                </div>
                            )}
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
                <div className="container sticky-nav-row">
                    <div className="sticky-nav-info">
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{property.title || property.unitName}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-primary)' }}>{getFormattedExpectedPrice()}</div>
                            {getPricingNatureLabel() && (
                                <span style={{ 
                                    fontSize: '0.65rem', 
                                    fontWeight: 700, 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '1px', 
                                    backgroundColor: property.pricingNature?.negotiable ? 'rgba(217, 119, 6, 0.12)' : 'rgba(100, 116, 139, 0.1)',
                                    color: property.pricingNature?.negotiable ? 'var(--color-gold)' : '#64748b',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    border: property.pricingNature?.negotiable ? '1px solid rgba(217, 119, 6, 0.2)' : '1px solid rgba(100, 116, 139, 0.15)'
                                }}>
                                    {getPricingNatureLabel()}
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <div className="sticky-nav-actions">
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
