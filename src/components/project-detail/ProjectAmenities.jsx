import React from 'react';
import {
    Waves, Dumbbell, Users, Shield, Zap, Baby, Footprints,
    Car, ArrowUpCircle, Flame, Droplets, Flower2, PhoneCall,
    Camera, Check, Trees, Wifi, Warehouse, Coffee, ShoppingBag,
    Trash2, Bike, ParkingSquare, Map, Info
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
            title: 'Primary Features',
            items: amenities.basic || [],
            color: '#EEF2FF',
            iconBg: '#4F46E5',
            gradient: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)'
        },
        {
            title: 'Security & Safety',
            items: amenities.security || [],
            color: '#FEF3C7',
            iconBg: '#92400E',
            gradient: 'linear-gradient(135deg, #92400E 0%, #D97706 100%)'
        },
        {
            title: 'Lifestyle & Wellness',
            items: amenities.others || [],
            color: '#F0FDF4',
            iconBg: '#166534',
            gradient: 'linear-gradient(135deg, #166534 0%, #22C55E 100%)'
        }
    ];

    const getIcon = (name) => {
        return AMENITY_ICONS[name] || <Check size={18} />;
    };

    return (
        <section style={{ padding: '5rem 0', backgroundColor: '#F8FAFC' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: '#0F172A',
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em'
                    }}>
                        World-Class Amenities
                    </h2>
                    <div style={{
                        width: '80px',
                        height: '4px',
                        background: 'var(--color-primary)',
                        margin: '0 auto',
                        borderRadius: '2px'
                    }}></div>
                    <p style={{ marginTop: '1.5rem', color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '1.5rem auto 0' }}>
                        Experience a lifestyle designed for comfort, safety, and modern living.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {sections.map((section, idx) => (
                        <div key={idx} style={{
                            backgroundColor: 'white',
                            borderRadius: '32px',
                            padding: '2.5rem',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
                            border: '1px solid #f1f5f9',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Accent Bar */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '6px',
                                background: section.gradient
                            }}></div>

                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                color: '#1e293b',
                                marginBottom: '2rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                {section.title}
                            </h3>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem'
                            }}>
                                {section.items.map((item, itemIdx) => (
                                    <div key={itemIdx} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px',
                                        backgroundColor: '#f8fafc',
                                        borderRadius: '16px',
                                        transition: 'all 0.3s ease',
                                        cursor: 'default',
                                        border: '1px solid #f1f5f9'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#fff';
                                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.borderColor = section.iconBg + '33';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f8fafc';
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = '#f1f5f9';
                                        }}
                                    >
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '10px',
                                            backgroundColor: 'white',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: section.iconBg,
                                            flexShrink: 0
                                        }}>
                                            {getIcon(item)}
                                        </div>
                                        <span style={{
                                            color: '#334155',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            lineHeight: '1.2'
                                        }}>
                                            {item}
                                        </span>
                                    </div>
                                ))}
                                {section.items.length === 0 && (
                                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '1rem', color: '#94a3b8', fontStyle: 'italic' }}>
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
