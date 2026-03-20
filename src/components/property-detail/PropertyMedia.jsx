'use client';

import React, { useState } from 'react';
import { Camera, Play, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const PropertyMedia = ({ media }) => {
    const [selectedImg, setSelectedImg] = useState(0);

    // Normalize media to array of objects
    const images = Array.isArray(media) ? media.map(m => typeof m === 'string' ? { url: m, description: 'Property Image' } : m) : [];

    if (images.length === 0) {
        return (
            <div style={{ 
                height: '500px', 
                backgroundColor: '#f8fafc', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                borderRadius: '32px',
                border: '1px dashed #e2e8f0',
                gap: '1rem'
            }}>
                <Camera size={48} color="#cbd5e1" />
                <p style={{ color: '#94a3b8', fontWeight: 600 }}>Visual showcase coming soon</p>
            </div>
        );
    }

    return (
        <section style={{ position: 'relative' }}>
            {/* Main Stage */}
            <div style={{ 
                position: 'relative', 
                height: '700px', 
                backgroundColor: '#0F172A', 
                borderRadius: '32px', 
                overflow: 'hidden',
                boxShadow: '0 40px 80px -20px rgba(0,0,0,0.2)'
            }}>
                <img
                    src={images[selectedImg]?.url}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    alt={images[selectedImg]?.description}
                />

                {/* Glass Overlays */}
                <div style={{ 
                    position: 'absolute', 
                    top: '2rem', 
                    left: '2rem', 
                    display: 'flex', 
                    gap: '12px',
                    zIndex: 10
                }}>
                    <div style={{ 
                        padding: '10px 20px', 
                        backgroundColor: 'rgba(15, 23, 42, 0.6)', 
                        backdropFilter: 'blur(12px)',
                        borderRadius: '100px', 
                        color: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        fontSize: '0.85rem', 
                        fontWeight: 700,
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <Camera size={16} color="var(--color-gold)" />
                        {selectedImg + 1} / {images.length}
                    </div>
                </div>

                {/* Navigation Controls */}
                <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '0 2rem',
                    pointerEvents: 'none'
                }}>
                    <button
                        onClick={() => setSelectedImg((prev) => (prev - 1 + images.length) % images.length)}
                        style={{ 
                            width: '60px', 
                            height: '60px', 
                            borderRadius: '50%', 
                            backgroundColor: 'rgba(255,255,255,0.1)', 
                            backdropFilter: 'blur(12px)',
                            color: 'white', 
                            border: '1px solid rgba(255,255,255,0.2)', 
                            cursor: 'pointer', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            pointerEvents: 'auto',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={() => setSelectedImg((prev) => (prev + 1) % images.length)}
                        style={{ 
                            width: '60px', 
                            height: '60px', 
                            borderRadius: '50%', 
                            backgroundColor: 'rgba(255,255,255,0.1)', 
                            backdropFilter: 'blur(12px)',
                            color: 'white', 
                            border: '1px solid rgba(255,255,255,0.2)', 
                            cursor: 'pointer', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            pointerEvents: 'auto',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>

                {/* Bottom Caption Bar */}
                <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    padding: '4rem 2rem 2rem 2rem',
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                }}>
                    <div style={{ color: 'white' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.6, marginBottom: '8px' }}>Space View</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{images[selectedImg].description || 'Property Interior'}</div>
                    </div>
                </div>
            </div>

            {/* Thumbnails */}
            <div style={{ 
                marginTop: '1.5rem', 
                display: 'flex', 
                gap: '12px', 
                overflowX: 'auto', 
                padding: '10px 0',
                scrollbarWidth: 'none'
            }}>
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedImg(idx)}
                        style={{
                            width: '120px',
                            height: '80px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: selectedImg === idx ? '3px solid var(--color-gold)' : '3px solid transparent',
                            transform: selectedImg === idx ? 'translateY(-4px)' : 'none',
                            transition: 'all 0.3s ease',
                            flexShrink: 0,
                            boxShadow: selectedImg === idx ? '0 10px 20px rgba(0,0,0,0.1)' : 'none'
                        }}
                    >
                        <img src={img.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Thumb" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PropertyMedia;
