import React from 'react';
import { 
    Maximize2, Compass, MoveUpRight, FastForward, Hash, Layers, 
    ArrowUpCircle, Info, Landmark, ShieldCheck, Clock, CheckCircle2 
} from 'lucide-react';

const PropertyOverview = ({ property }) => {
    const details = [
        { icon: <Hash size={18} />, label: 'Unit Number', value: property.unitNum },
        { icon: <Layers size={18} />, label: 'Property Type', value: property.propertyType },
        { icon: <Maximize2 size={18} />, label: 'Plot Size', value: property.size ? `${property.size.value} ${property.size.unit}` : '-' },
        { icon: <Compass size={18} />, label: 'Direction/Facing', value: property.facing || property.direction || '-' },
        { icon: <ArrowUpCircle size={18} />, label: 'Floor Level', value: property.floorNumber ? `${property.floorNumber} of ${property.totalFloors}` : '-' },
        { icon: <Clock size={18} />, label: 'Property Age', value: property.ageOfProperty ? `${property.ageOfProperty} Years` : 'New' },
    ];

    const technicals = [
        { label: 'Registration Charges', value: property.registrationCharges || 'As per actuals' },
        { label: 'Maintenance', value: property.maintenanceCharges || 'Included' },
        { label: 'Ownership', value: property.ownership || 'Freehold' },
        { label: 'Status', value: property.stage || 'Ready to Move' }
    ];

    return (
        <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem' }}>
                <span style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-gold)' }}></span>
                Technical Specifications
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {details.map((item, idx) => (
                    <div key={idx} className="glass-card" style={{ padding: '2rem', border: '1px solid #f1f5f9', transition: 'transform 0.3s' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                            <div style={{ 
                                padding: '12px', 
                                background: 'rgba(79, 70, 229, 0.05)', 
                                borderRadius: '16px', 
                                color: 'var(--color-primary)' 
                            }}>
                                {item.icon}
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '1px' }}>{item.label}</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>{item.value || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ 
                marginTop: '3rem', 
                padding: '3rem', 
                background: '#F8FAFC', 
                borderRadius: '32px', 
                border: '1px solid #f1f5f9',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2.5rem'
            }}>
                {technicals.map((tech, idx) => (
                    <div key={idx}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>
                            <CheckCircle2 size={14} className="text-primary" />
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
