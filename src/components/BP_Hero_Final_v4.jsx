'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

const HERO_VIDEOS = [
    "https://cdn.pixabay.com/video/2024/01/24/197942-906226451_large.mp4", // Luxury Villa Drone
    "https://cdn.pixabay.com/video/2024/06/01/214888_large.mp4",           // Modern Skyscrapers
];

const HeroSection = ({ onExplore }) => {
    const [videoIndex, setVideoIndex] = React.useState(0);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const defaultExplore = () => {
        const el = document.getElementById('cities');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const handleVideoEnd = () => {
        setVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    };

    return (
        <div style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            marginTop: '-80px',
            overflow: 'hidden'
        }}>
            {/* Video Background */}
            <video
                key={HERO_VIDEOS[videoIndex]}
                autoPlay
                muted
                loop={false}
                onEnded={handleVideoEnd}
                onCanPlay={() => setIsLoaded(true)}
                playsInline
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    minWidth: '100%',
                    minHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    transform: 'translate(-50%, -50%)',
                    objectFit: 'cover',
                    zIndex: 0,
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 1s ease-in-out'
                }}
            >
                <source src={HERO_VIDEOS[videoIndex]} type="video/mp4" />
            </video>

            {/* Poster using next/image for optimization */}
            {!isLoaded && (
                <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
                    <Image 
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                        alt="Real Estate Background"
                        fill
                        priority
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            )}

            {/* Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.4)',
                zIndex: 1
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '950px' }}>
                <h1 className="animate-fade-in-up" style={{
                    fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    textShadow: '0 20px 40px rgba(0,0,0,0.6)',
                    letterSpacing: '-3px',
                    lineHeight: 1,
                    color: '#FFFFFF',
                    position: 'relative'
                }}>
                    Bharat Properties
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
                        zIndex: -1,
                        filter: 'blur(40px)'
                    }}></div>
                </h1>
                <p id="hero-slogan-v2" className="animate-fade-in-up" style={{
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                    marginBottom: '4rem',
                    color: '#f1f5f9',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 400,
                    maxWidth: '800px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    lineHeight: 1.6,
                    letterSpacing: '0.5px',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    opacity: 0.9,
                    animationDelay: '200ms'
                }}>
                    <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Exclusive</span> Destination for Luxury Real Estate in North India. <br />
                    Premium Collections in <span style={{ borderBottom: '2px solid var(--color-gold)' }}>Chandigarh, Mohali, Panchkula & Kurukshetra.</span>
                </p>

                <button
                    onClick={onExplore || defaultExplore}
                    className="btn-premium animate-fade-in-up"
                    style={{
                        background: 'var(--grad-gold)',
                        color: 'var(--color-primary)',
                        padding: '1.25rem 3.5rem',
                        fontSize: '1.15rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 800,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: '0 20px 40px rgba(217, 119, 6, 0.4)',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        animationDelay: '400ms',
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 30px 50px rgba(217, 119, 6, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(217, 119, 6, 0.4)';
                    }}
                >
                    Explore Properties <ArrowDown size={22} />
                </button>
            </div>
        </div>
    );
};

export default HeroSection;
// Force Deploy: Fri Mar 20 18:36:52 IST 2026
