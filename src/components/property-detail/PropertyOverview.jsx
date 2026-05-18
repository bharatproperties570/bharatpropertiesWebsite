import React, { useState } from 'react';
import { 
    Maximize2, Compass, MoveUpRight, Layers, ArrowUpCircle, Info, 
    Landmark, Clock, CheckCircle2, Home, Award, Navigation, 
    ArrowLeftRight, ArrowUpDown, ChevronRight
} from 'lucide-react';

const PropertyOverview = ({ property }) => {
    // Hover state for sections inside the unified card
    const [hoveredSection, setHoveredSection] = useState(null);

    // Plate 1 Data: Classification & Type
    const plate1Items = [
        { 
            icon: <Layers size={18} />, 
            label: 'Category', 
            value: property.category || property.type || property.propertyType || 'Residential',
            color: '#4f46e5' 
        },
        { 
            icon: <Home size={18} />, 
            label: 'Sub Category', 
            value: property.subCategory || '-',
            color: '#10b981' 
        },
        { 
            icon: <Award size={18} />, 
            label: 'Unit Type', 
            value: property.unitType || 'Ordinary',
            color: '#f59e0b' 
        }
    ];

    // Plate 2 Data: Orientation & Access
    const plate2Items = [
        { 
            icon: <MoveUpRight size={18} />, 
            label: 'Direction', 
            value: property.technical?.direction || property.direction || '-',
            color: '#3b82f6' 
        },
        { 
            icon: <Compass size={18} />, 
            label: 'Facing', 
            value: property.technical?.facing || property.facing || '-',
            color: '#8b5cf6' 
        },
        { 
            icon: <Navigation size={18} />, 
            label: 'Road Width', 
            value: property.technical?.roadWidth || property.roadWidth || '-',
            color: '#ec4899' 
        }
    ];

    // Plate 3 Data: Dimensional Intelligence
    const plate3Items = [
        { 
            icon: <Maximize2 size={18} />, 
            label: 'Size Label', 
            value: property.sizeLabel || property.sqft || 'Area on Request',
            color: '#14b8a6' 
        },
        { 
            icon: <ArrowLeftRight size={18} />, 
            label: 'Width (Frontage)', 
            value: property.width ? `${property.width} Ft.` : '-',
            color: '#f97316' 
        },
        { 
            icon: <ArrowUpDown size={18} />, 
            label: 'Length (Depth)', 
            value: property.length ? `${property.length} Ft.` : '-',
            color: '#06b6d4' 
        }
    ];

    // Technical parameters for bottom facts
    const technicals = [
        { label: 'Unit Number', value: property.unitNo || '-', icon: <Info size={16} /> },
        { label: 'Floor Level', value: property.technical?.floorNumber ? `${property.technical.floorNumber} of ${property.technical.totalFloors}` : '-', icon: <ArrowUpCircle size={16} /> },
        { label: 'Property Age', value: property.technical?.age ? `${property.technical.age} Years` : 'New', icon: <Clock size={16} /> },
        { label: 'Registration', value: property.technical?.registration || 'Extra', icon: <Landmark size={16} /> }
    ];

    // Styled Category Panel Helper
    const getSectionStyle = (sectionId, baseColor) => {
        const isHovered = hoveredSection === sectionId;
        return {
            padding: '2.25rem 1.75rem',
            borderRadius: '24px',
            background: isHovered ? `${baseColor}0b` : `${baseColor}04`,
            border: isHovered ? `1px solid ${baseColor}30` : `1px solid ${baseColor}0e`,
            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: isHovered ? `0 15px 30px -10px ${baseColor}1a` : 'none',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            cursor: 'pointer'
        };
    };

    return (
        <section>
            {/* Header Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2.5rem' }}>
                <span style={{ width: '40px', height: '1.5px', backgroundColor: '#e2e8f0' }}></span>
                <span style={{ color: '#4f46e5' }}>01 / TECHNICAL PROFILE</span>
                <span style={{ fontWeight: 900, color: '#0F172A' }}>Specifications</span>
            </div>

            {/* UNIFIED SPECIFICATION CARD */}
            <div style={{
                padding: '2.5rem',
                borderRadius: '36px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.99) 100%)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.04)'
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
                    
                    {/* SECTION 1: Classification details */}
                    <div 
                        style={getSectionStyle('class', '#4f46e5')}
                        onMouseEnter={() => setHoveredSection('class')}
                        onMouseLeave={() => setHoveredSection(null)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Classification</span>
                            <ChevronRight size={14} style={{ color: hoveredSection === 'class' ? '#4f46e5' : '#94a3b8', transform: hoveredSection === 'class' ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.3s' }} />
                        </div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>Type & Category</h3>
                        
                        <div style={{ height: '1px', background: 'rgba(79, 70, 229, 0.08)' }}></div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                            {plate1Items.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ padding: '8px', borderRadius: '10px', background: `${item.color}0d`, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {item.icon}
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{item.label}</span>
                                    </div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 2: Orientation details */}
                    <div 
                        style={getSectionStyle('orient', '#8b5cf6')}
                        onMouseEnter={() => setHoveredSection('orient')}
                        onMouseLeave={() => setHoveredSection(null)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Orientation</span>
                            <ChevronRight size={14} style={{ color: hoveredSection === 'orient' ? '#8b5cf6' : '#94a3b8', transform: hoveredSection === 'orient' ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.3s' }} />
                        </div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>Facing & Access</h3>
                        
                        <div style={{ height: '1px', background: 'rgba(139, 92, 246, 0.08)' }}></div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                            {plate2Items.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ padding: '8px', borderRadius: '10px', background: `${item.color}0d`, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {item.icon}
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{item.label}</span>
                                    </div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 3: Size & Metric details */}
                    <div 
                        style={getSectionStyle('size', '#14b8a6')}
                        onMouseEnter={() => setHoveredSection('size')}
                        onMouseLeave={() => setHoveredSection(null)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#14b8a6', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Space Metrics</span>
                            <ChevronRight size={14} style={{ color: hoveredSection === 'size' ? '#14b8a6' : '#94a3b8', transform: hoveredSection === 'size' ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.3s' }} />
                        </div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>Size & Dimensions</h3>
                        
                        <div style={{ height: '1px', background: 'rgba(20, 184, 166, 0.08)' }}></div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                            {plate3Items.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ padding: '8px', borderRadius: '10px', background: `${item.color}0d`, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {item.icon}
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{item.label}</span>
                                    </div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom facts / Technical Parameters card */}
            <div style={{ 
                marginTop: '2.5rem', 
                padding: '2.5rem 3rem', 
                background: '#F8FAFC', 
                borderRadius: '32px', 
                border: '1px solid #f1f5f9',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '2.5rem'
            }}>
                {technicals.map((tech, idx) => (
                    <div key={idx}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>
                            <div style={{ color: '#4f46e5' }}>{tech.icon}</div>
                            {tech.label}
                        </div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>{tech.value}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PropertyOverview;
