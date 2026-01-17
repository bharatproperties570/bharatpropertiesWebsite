import React from 'react';
import { ArrowDown } from 'lucide-react';

const HERO_VIDEOS = [
    "https://cdn.pixabay.com/video/2024/01/24/197942-906226451_large.mp4", // Luxury Villa Drone
    "https://cdn.pixabay.com/video/2024/06/01/214888_large.mp4",           // Modern Skyscrapers
    "https://cdn.pixabay.com/video/2021/06/22/78557-566388813_large.mp4",   // Luxury Pool/Villa
    "https://cdn.pixabay.com/video/2025/05/27/282084_large.mp4"            // Green Residential
];

const BrandHero = ({ onExplore }) => {
    const [videoIndex, setVideoIndex] = React.useState(0);

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
                key={HERO_VIDEOS[videoIndex]} // Use key to force reload when index changes
                autoPlay
                muted
                onEnded={handleVideoEnd}
                playsInline
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
                    zIndex: 0
                }}
            >
                <source src={HERO_VIDEOS[videoIndex]} type="video/mp4" />
            </video>

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
                <h1 style={{
                    fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    letterSpacing: '-2px',
                    lineHeight: 1
                }}>
                    Bharat Properties
                </h1>
                <p style={{
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                    marginBottom: '4rem',
                    opacity: 0.9,
                    fontWeight: 400,
                    maxWidth: '750px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    lineHeight: 1.6,
                    letterSpacing: '0.5px'
                }}>
                    Redefining Luxury Real Estate in North India. <br />
                    Exclusive Homes for the Discerning Lifestyle.
                </p>

                <button
                    onClick={onExplore}
                    className="btn-premium"
                    style={{
                        backgroundColor: 'var(--color-gold)',
                        color: 'var(--color-primary)',
                        padding: '1.2rem 3rem',
                        fontSize: '1.1rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: '0 15px 35px rgba(251, 191, 36, 0.3)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}
                >
                    Explore Properties <ArrowDown size={22} />
                </button>
            </div>
        </div>
    );
};

export default BrandHero;
