import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

const ImageGallery = ({ images, projectName }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    if (!images || images.length === 0) {
        return (
            <div style={{
                padding: '3rem',
                textAlign: 'center',
                backgroundColor: '#F9FAFB',
                borderRadius: 'var(--radius-lg)'
            }}>
                <p style={{ color: 'var(--color-text-muted)' }}>
                    No images available for this project
                </p>
            </div>
        );
    }

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    return (
        <>
            {/* Main Gallery */}
            <section style={{ padding: '0', backgroundColor: '#000' }}>
                <div style={{ position: 'relative', maxWidth: '100%', margin: '0 auto' }}>
                    {/* Main Image */}
                    <div style={{
                        position: 'relative',
                        height: '600px',
                        backgroundColor: '#000',
                        overflow: 'hidden'
                    }}>
                        <img
                            src={images[currentIndex]}
                            alt={`${projectName} - Image ${currentIndex + 1}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                            }}
                        />

                        {/* Fullscreen Button */}
                        <button
                            onClick={() => setIsFullscreen(true)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                padding: '0.75rem',
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.8)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.6)'}
                        >
                            <Maximize2 size={20} />
                        </button>

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'white'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.9)'}
                                >
                                    <ChevronLeft size={24} color="#000" />
                                </button>

                                <button
                                    onClick={nextImage}
                                    style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'white'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.9)'}
                                >
                                    <ChevronRight size={24} color="#000" />
                                </button>
                            </>
                        )}

                        {/* Image Counter */}
                        <div style={{
                            position: 'absolute',
                            bottom: '1rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            padding: '0.5rem 1rem',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                            fontWeight: 600
                        }}>
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>

                    {/* Thumbnail Strip */}
                    {images.length > 1 && (
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#1a1a1a',
                            overflowX: 'auto',
                            whiteSpace: 'nowrap'
                        }}>
                            <div style={{ display: 'inline-flex', gap: '0.75rem' }}>
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => goToImage(idx)}
                                        style={{
                                            width: '100px',
                                            height: '70px',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: idx === currentIndex ? '3px solid var(--color-primary)' : '3px solid transparent',
                                            opacity: idx === currentIndex ? 1 : 0.6,
                                            transition: 'all 0.2s',
                                            flexShrink: 0
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = idx === currentIndex ? 1 : 0.6}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${idx + 1}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.95)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Close Button */}
                    <button
                        onClick={() => setIsFullscreen(false)}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                    >
                        <X size={24} />
                    </button>

                    {/* Fullscreen Image */}
                    <img
                        src={images[currentIndex]}
                        alt={`${projectName} - Fullscreen`}
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90%',
                            objectFit: 'contain'
                        }}
                    />

                    {/* Fullscreen Navigation */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                style={{
                                    position: 'absolute',
                                    left: '2rem',
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <ChevronLeft size={32} />
                            </button>

                            <button
                                onClick={nextImage}
                                style={{
                                    position: 'absolute',
                                    right: '2rem',
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <ChevronRight size={32} />
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default ImageGallery;
