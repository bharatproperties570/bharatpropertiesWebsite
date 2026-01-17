import React from 'react';
import { Maximize2, Compass, MoveUpRight, FastForward, Hash, Layers } from 'lucide-react';

const PropertyOverview = ({ property }) => {
    const details = [
        { icon: <Hash size={20} />, label: 'Unit Number', value: property.unitNum },
        { icon: <Layers size={20} />, label: 'Unit Type', value: property.unitName.includes('Corner') ? 'Corner' : 'Standard' },
        { icon: <Maximize2 size={20} />, label: 'Plot Size', value: `${property.size.value} ${property.size.unit} (${property.size.sqYard} Sq Yard)` },
        { icon: <Compass size={20} />, label: 'Direction', value: property.direction },
        { icon: <MoveUpRight size={20} />, label: 'Facing', value: property.facing },
        { icon: <FastForward size={20} />, label: 'Main Road', value: property.road }
    ];

    return (
        <section style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                Quick Specifications
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {details.map((item, idx) => (
                    <div key={idx} style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                        <div style={{ color: 'var(--color-primary)', marginBottom: '12px' }}>{item.icon}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>{item.value}</div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '3rem', padding: '2.5rem', backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>Property Categories</h3>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Category</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{property.category}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Sub Category</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{property.subCategory}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Type</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{property.type}</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertyOverview;
