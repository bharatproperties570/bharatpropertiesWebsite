import React, { useState } from 'react';
import { Camera, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyMedia = ({ media }) => {
    const [selectedImg, setSelectedImg] = useState(0);

    if (!media || !media.images || media.images.length === 0) {
        return (
            <div style={{ height: '400px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)' }}>
                <p style={{ color: 'var(--color-text-muted)' }}>No media available for this property</p>
            </div>
        );
    }

    return (
        <section style={{ paddingBottom: '0' }}>
            <div style={{ position: 'relative', height: '600px', backgroundColor: '#000', overflow: 'hidden' }}>
                <img
                    src={media.images[selectedImg]?.url || ''}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                    alt={media.images[selectedImg]?.description || 'Property Image'}
                />

                {/* Overlay Gradient */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>

                {/* Description Badge */}
                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ padding: '6px 16px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', width: 'fit-content' }}>
                        {media.images[selectedImg].description}
                    </div>
                </div>

                {/* Navigation */}
                {media.images.length > 1 && (
                    <div style={{ position: 'absolute', right: '2rem', bottom: '2rem', display: 'flex', gap: '12px' }}>
                        <button
                            onClick={() => setSelectedImg((prev) => (prev - 1 + media.images.length) % media.images.length)}
                            style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', backdropFilter: 'blur(4px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => setSelectedImg((prev) => (prev + 1) % media.images.length)}
                            style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', backdropFilter: 'blur(4px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}

                {/* Media Stats Floating */}
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', gap: '12px' }}>
                    <div style={{ padding: '8px 16px', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '12px', color: 'white', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                        <Camera size={18} /> {media.images.length} Photos
                    </div>
                    {media.videos && media.videos.length > 0 && (
                        <div style={{ padding: '8px 16px', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '12px', color: 'white', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                            <Play size={18} /> {media.videos.length} Videos
                        </div>
                    )}
                </div>
            </div>

            {/* Thumbnails strip */}
            <div className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '10px 0' }}>
                    {media.images.map((img, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedImg(idx)}
                            style={{
                                width: '120px',
                                height: '80px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: selectedImg === idx ? '3px solid var(--color-primary)' : '3px solid transparent',
                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                flexShrink: 0,
                                transition: 'all 0.2s'
                            }}
                        >
                            <img src={img.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Thumb" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PropertyMedia;
