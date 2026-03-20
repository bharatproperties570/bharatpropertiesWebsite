'use client';

import React from 'react';
import {
    Waves, Dumbbell, Users, Shield, Zap, Baby, Footprints,
    Car, ArrowUpCircle, Flame, Droplets, Flower2, PhoneCall,
    Camera, Check, Trees, Wifi, Warehouse, Coffee, ShoppingBag,
    Trash2, Bike, ParkingSquare, Map, Info, Star
} from 'lucide-react';

const AMENITY_ICONS = {
    'Swimming Pool': <Waves size={20} />,
    'Gymnasium': <Dumbbell size={20} />,
    'Club House': <Users size={20} />,
    '24x7 Security': <Shield size={20} />,
    'Power Supply': <Zap size={20} />,
    'Power Backup': <Zap size={20} />,
    'Children Play Area': <Baby size={20} />,
    'Jogging Track': <Footprints size={20} />,
    'Car Parking': <Car size={20} />,
    'Ample Parking': <ParkingSquare size={20} />,
    'Lift': <ArrowUpCircle size={20} />,
    'Fire Fighting System': <Flame size={20} />,
    'Water Supply': <Droplets size={20} />,
    'Landscape Garden': <Flower2 size={20} />,
    'Greenery': <Trees size={20} />,
    'Intercom': <PhoneCall size={20} />,
    'CCTV': <Camera size={20} />,
    'WiFi': <Wifi size={20} />,
    'Storage': <Warehouse size={20} />,
    'Cafeteria': <Coffee size={20} />,
    'Shopping Center': <ShoppingBag size={20} />,
    'Garbage Disposal': <Trash2 size={20} />,
    'Cycling Track': <Bike size={20} />,
    'Gated Community': <Map size={20} />
};

const ProjectAmenities = ({ amenities }) => {
    const sections = [
        {
            title: 'Premier Features',
            items: amenities.basic || [],
            gradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            accent: 'var(--color-gold)'
        },
        {
            title: 'Security & Safety',
            items: amenities.security || [],
            gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
            accent: '#38bdf8'
        },
        {
            title: 'Lifestyle & Wellness',
            items: amenities.others || [],
            gradient: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
            accent: '#4ade80'
        }
    ];

    const getIcon = (name) => {
        return AMENITY_ICONS[name] || <Check size={18} />;
    };

    return (
        <section style={{ padding: '8rem 0', backgroundColor: '#0F172A', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
            
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'left', marginBottom: '6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-gold)', fontWeight: 800, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
                        <Star size={20} /> Unmatched Lifestyle
                    </div>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 900,
                        color: 'white',
                        margin: 0,
                        letterSpacing: '-2px'
                    }}>
                        World-Class <span style={{ color: 'var(--color-gold)' }}>Amenities</span>
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                    gap: '3rem'
                }}>
                    {sections.map((section, idx) => (
                        <div key={idx} className="glass-card-dark" style={{
                            padding: '3rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2.5rem',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ width: '40px', height: '2px', background: section.accent }}></div>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    fontWeight: 900,
                                    color: 'white',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    {section.title}
                                </h3>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1.25rem'
                            }}>
                                {section.items.map((item, itemIdx) => (
                                    <div key={itemIdx} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '16px',
                                        backgroundColor: 'rgba(255,255,255,0.03)',
                                        borderRadius: '16px',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                            e.currentTarget.style.borderColor = section.accent + '44';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                        }}
                                    >
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '12px',
                                            backgroundColor: 'rgba(255,255,255,0.05)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: section.accent,
                                            flexShrink: 0
                                        }}>
                                            {getIcon(item)}
                                        </div>
                                        <span style={{
                                            color: 'rgba(255,255,255,0.8)',
                                            fontWeight: 700,
                                            fontSize: '0.9rem'
                                        }}>
                                            {item}
                                        </span>
                                    </div>
                                ))}
                                {section.items.length === 0 && (
                                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '1rem', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                                        Not specified
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectAmenities;

