import React, { useState } from 'react';
import { X, Check, Minus, Plus, ChevronDown, MapPin, Building2, Wallet, Zap, ShieldCheck, Ruler, Compass, MoveUpRight } from 'lucide-react';
import { INDIVIDUAL_PROPERTIES } from '../data/individualProperties';

const PropertyComparison = ({ properties, onClose, onRemoveProperty, onAddProperty }) => {
    const [isAdding, setIsAdding] = useState(properties.length === 0);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedBlock, setSelectedBlock] = useState('');
    const [selectedPropertyId, setSelectedPropertyId] = useState('');
    const [hoveredRow, setHoveredRow] = useState(null);

    const cities = [...new Set(INDIVIDUAL_PROPERTIES.map(p => p.location.city))];
    const projects = [...new Set(INDIVIDUAL_PROPERTIES.filter(p => !selectedCity || p.location.city === selectedCity).map(p => p.projectName))];
    const blocks = [...new Set(INDIVIDUAL_PROPERTIES.filter(p =>
        (!selectedCity || p.location.city === selectedCity) &&
        (!selectedProject || p.projectName === selectedProject)
    ).map(p => p.block))];
    const availableProperties = INDIVIDUAL_PROPERTIES.filter(p =>
        (!selectedCity || p.location.city === selectedCity) &&
        (!selectedProject || p.projectName === selectedProject) &&
        (!selectedBlock || p.block === selectedBlock) &&
        !properties.find(existing => existing.id === p.id)
    );

    const handleAdd = () => {
        const property = INDIVIDUAL_PROPERTIES.find(p => p.id === selectedPropertyId);
        if (property) {
            onAddProperty(property);
            setIsAdding(false);
            setSelectedCity('');
            setSelectedProject('');
            setSelectedBlock('');
            setSelectedPropertyId('');
        }
    };

    const sections = [
        {
            title: 'Basic Info',
            icon: <Info size={18} />,
            rows: [
                { label: 'Property Name', key: 'unitName', type: 'text' },
                { label: 'Unit No.', key: 'unitNum', type: 'text' },
                { label: 'Category', key: 'category', type: 'text' },
                { label: 'Type', key: 'type', type: 'text' }
            ]
        },
        {
            title: 'Dimensions & Location',
            icon: <Ruler size={18} />,
            rows: [
                { label: 'Size', key: 'size', type: 'size' },
                { label: 'Sector', key: 'location.sector', type: 'text' },
                { label: 'City', key: 'location.city', type: 'text' },
                { label: 'Road Width', key: 'road', type: 'text' }
            ]
        },
        {
            title: 'Orientation & Vastu',
            icon: <Compass size={18} />,
            rows: [
                { label: 'Facing', key: 'facing', type: 'text' },
                { label: 'Direction', key: 'direction', type: 'text' }
            ]
        },
        {
            title: 'Construction & Terms',
            icon: <Building2 size={18} />,
            rows: [
                { label: 'Stage', key: 'stage', type: 'text' },
                { label: 'Ownership', key: 'ownership', type: 'text' },
                { label: 'Age of Property', key: 'construction.age', type: 'text' },
                { label: 'Furnishing', key: 'construction.furnishing', type: 'text' }
            ]
        },
        {
            title: 'Pricing',
            icon: <IndianRupee size={18} />,
            rows: [
                { label: 'Expected Price', key: 'price', type: 'text' }
            ]
        }
    ];

    const getValue = (property, key) => {
        const keys = key.split('.');
        let value = property;
        for (const k of keys) {
            value = value?.[k];
        }
        return value;
    };

    const formatValue = (property, row) => {
        const value = getValue(property, row.key);
        if (value === undefined || value === null) return '-';

        switch (row.type) {
            case 'size':
                return `${value.value} ${value.unit} (${value.sqYard} Sq Yard)`;
            default:
                return value;
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.95)', zIndex: 10000, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div style={{ width: '100%', maxWidth: '1440px', height: '90vh', backgroundColor: 'white', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>

                {/* Fixed Header Row */}
                <div style={{ padding: '1.5rem 2.5rem', background: 'linear-gradient(to right, #0F172A, #1E293B)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                    <div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ShieldCheck size={32} className="text-primary" /> Property Comparison
                        </h2>
                        <p style={{ margin: '4px 0 0 0', opacity: 0.6, fontSize: '0.9rem' }}>Side-by-side analysis for individual units & plots</p>
                    </div>
                    <button onClick={onClose} style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Table Content */}
                <div style={{ flex: 1, overflow: 'auto', padding: '0 1rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                        <thead style={{ position: 'sticky', top: 0, zIndex: 20 }}>
                            <tr>
                                <th style={{ padding: '2rem', textAlign: 'left', minWidth: '240px', backgroundColor: 'white', borderBottom: '2px solid #e2e8f0', borderRight: '1px solid #f1f5f9' }}>
                                    <button
                                        onClick={() => setIsAdding(true)}
                                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '1rem', backgroundColor: '#f8fafc', color: 'var(--color-primary)', border: '2px dashed #cbd5e1', borderRadius: '16px', fontWeight: 700, cursor: 'pointer' }}
                                    >
                                        <Plus size={20} /> Add Property
                                    </button>
                                </th>
                                {properties.map((property) => (
                                    <th key={property.id} style={{ padding: '1.5rem', textAlign: 'center', minWidth: '320px', backgroundColor: 'white', borderBottom: '2px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', position: 'relative' }}>
                                            <button
                                                onClick={() => onRemoveProperty(property.id)}
                                                style={{ position: 'absolute', top: '-0.5rem', right: '0', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                <X size={14} />
                                            </button>
                                            <img
                                                src={property.image}
                                                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                alt={property.unitName}
                                            />
                                            <div>
                                                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>{property.unitName}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                                    <MapPin size={12} /> {property.location.sector}, {property.location.city}
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                ))}
                                {isAdding && (
                                    <th style={{ padding: '1.5rem', textAlign: 'center', minWidth: '320px', backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '1rem', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>

                                            {/* City Selection */}
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    value={selectedCity}
                                                    onChange={(e) => {
                                                        setSelectedCity(e.target.value);
                                                        setSelectedProject('');
                                                        setSelectedBlock('');
                                                        setSelectedPropertyId('');
                                                    }}
                                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', appearance: 'none', outline: 'none', fontSize: '0.85rem', fontWeight: 600 }}
                                                >
                                                    <option value="">Select City</option>
                                                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                                <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }} />
                                            </div>

                                            {/* Project Selection */}
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    value={selectedProject}
                                                    onChange={(e) => {
                                                        setSelectedProject(e.target.value);
                                                        setSelectedBlock('');
                                                        setSelectedPropertyId('');
                                                    }}
                                                    disabled={!selectedCity}
                                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', appearance: 'none', outline: 'none', fontSize: '0.85rem', fontWeight: 600, opacity: selectedCity ? 1 : 0.5 }}
                                                >
                                                    <option value="">Select Project</option>
                                                    {projects.map(p => <option key={p} value={p}>{p}</option>)}
                                                </select>
                                                <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }} />
                                            </div>

                                            {/* Block Selection */}
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    value={selectedBlock}
                                                    onChange={(e) => {
                                                        setSelectedBlock(e.target.value);
                                                        setSelectedPropertyId('');
                                                    }}
                                                    disabled={!selectedProject}
                                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', appearance: 'none', outline: 'none', fontSize: '0.85rem', fontWeight: 600, opacity: selectedProject ? 1 : 0.5 }}
                                                >
                                                    <option value="">Select Block</option>
                                                    {blocks.map(b => <option key={b} value={b}>{b}</option>)}
                                                </select>
                                                <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }} />
                                            </div>

                                            {/* Unit/Property Selection */}
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    value={selectedPropertyId}
                                                    onChange={(e) => setSelectedPropertyId(e.target.value)}
                                                    disabled={!selectedBlock}
                                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', appearance: 'none', outline: 'none', fontSize: '0.85rem', fontWeight: 600, opacity: selectedBlock ? 1 : 0.5 }}
                                                >
                                                    <option value="">Select Unit / Property No.</option>
                                                    {availableProperties.map(p => (
                                                        <option key={p.id} value={p.id}>{p.unitNum} ({p.unitName})</option>
                                                    ))}
                                                </select>
                                                <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }} />
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button onClick={handleAdd} disabled={!selectedPropertyId} style={{ flex: 1, padding: '0.8rem', backgroundColor: selectedPropertyId ? 'var(--color-primary)' : '#cbd5e1', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>Add</button>
                                                <button onClick={() => setIsAdding(false)} style={{ padding: '0.8rem', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>✕</button>
                                            </div>
                                        </div>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {sections.map((section, sIdx) => (
                                <React.Fragment key={sIdx}>
                                    <tr>
                                        <td colSpan={properties.length + (isAdding ? 2 : 1)} style={{ padding: '1.5rem 2rem 0.5rem 2rem', borderBottom: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                {section.icon} {section.title}
                                            </div>
                                        </td>
                                    </tr>
                                    {section.rows.map((row, rIdx) => (
                                        <tr
                                            key={rIdx}
                                            onMouseEnter={() => setHoveredRow(`${sIdx}-${rIdx}`)}
                                            onMouseLeave={() => setHoveredRow(null)}
                                            style={{ backgroundColor: hoveredRow === `${sIdx}-${rIdx}` ? '#f8fafc' : 'transparent', transition: 'background-color 0.2s' }}
                                        >
                                            <td style={{ padding: '1rem 2.5rem', fontWeight: 600, color: '#64748b', fontSize: '0.9rem', borderRight: '1px solid #f1f5f9', position: 'sticky', left: 0, backgroundColor: hoveredRow === `${sIdx}-${rIdx}` ? '#f8fafc' : 'white', zIndex: 10 }}>
                                                {row.label}
                                            </td>
                                            {properties.map(property => (
                                                <td key={property.id} style={{ padding: '1rem', textAlign: 'center', color: '#1e293b', fontWeight: 700, fontSize: '0.95rem' }}>
                                                    {formatValue(property, row)}
                                                </td>
                                            ))}
                                            {isAdding && <td style={{ backgroundColor: '#f8fafc' }} />}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Bottom Bar */}
                <div style={{ padding: '1.5rem 2.5rem', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'right', flexShrink: 0 }}>
                    <button onClick={onClose} style={{ padding: '0.8rem 2.5rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                        Done Comparing
                    </button>
                </div>
            </div>
        </div>
    );
};

// Simple Info Icon replacement needed
const Info = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
);

const IndianRupee = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12" /><path d="M6 8h12" /><path d="m6 13 8.5 8" /><path d="M6 13h3" /><path d="M9 13c6.667 0 6.667-10 0-10" />
    </svg>
);

export default PropertyComparison;
