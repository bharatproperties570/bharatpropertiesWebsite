import React, { useState } from 'react';
import { X, Check, Minus, Plus, ChevronDown, MapPin, Building2, Wallet, Zap, ShieldCheck, IndianRupee } from 'lucide-react';
import { SAMPLE_PROJECTS } from '../data/sampleProjects';

const ProjectComparison = ({ projects, onClose, onRemoveProject, onAddProject }) => {
    const [isAdding, setIsAdding] = useState(projects.length === 0);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [hoveredRow, setHoveredRow] = useState(null);

    const cities = [...new Set(SAMPLE_PROJECTS.map(p => p.address.city))];
    const availableProjects = SAMPLE_PROJECTS.filter(p =>
        p.address.city === selectedCity &&
        !projects.find(existing => existing.id === p.id)
    );

    const handleAdd = () => {
        const project = SAMPLE_PROJECTS.find(p => p.id === selectedProjectId);
        if (project) {
            onAddProject(project);
            setIsAdding(false);
            setSelectedCity('');
            setSelectedProjectId('');
        }
    };

    const sections = [
        {
            title: 'Overview',
            icon: <Building2 size={18} />,
            rows: [
                { label: 'Project Name', key: 'name', type: 'text' },
                { label: 'Developer', key: 'developer.name', type: 'text' },
                { label: 'Location', key: 'address.city', type: 'text' },
                { label: 'Status', key: 'status', type: 'badge' },
                { label: 'Category', key: 'category', type: 'text' },
                { label: 'RERA Number', key: 'reraNumber', type: 'text' }
            ]
        },
        {
            title: 'Infrastructure',
            icon: <Zap size={18} />,
            rows: [
                { label: 'Total Blocks', key: 'totalBlocks', type: 'number' },
                { label: 'Total Floors', key: 'totalFloors', type: 'number' },
                { label: 'Total Units', key: 'totalUnits', type: 'number' },
                { label: 'Land Area', key: 'landArea', type: 'area' }
            ]
        },
        {
            title: 'Investment',
            icon: <Wallet size={18} />,
            rows: [
                { label: 'Price Range', key: 'priceRange', type: 'price' },
                { label: 'Launched On', key: 'launchedOn', type: 'date' },
                { label: 'Possession', key: 'possession', type: 'date' }
            ]
        }
    ];

    const getValue = (project, key) => {
        const keys = key.split('.');
        let value = project;
        for (const k of keys) {
            value = value?.[k];
        }
        return value;
    };

    const formatValue = (project, row) => {
        const value = getValue(project, row.key);
        if (value === undefined || value === null) return '-';

        switch (row.type) {
            case 'date':
                return new Date(value).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' });
            case 'area':
                return `${value.value} ${value.unit}`;
            case 'price':
                if (project.unitSizes && project.unitSizes.length > 0) {
                    const sortedPrices = [...project.unitSizes].sort((a, b) => {
                        const getVal = (p) => parseFloat(p.replace(/[^0-9.]/g, ''));
                        return getVal(a.price) - getVal(b.price);
                    });
                    return `${sortedPrices[0].price} - ${sortedPrices[sortedPrices.length - 1].price}`;
                }
                return '-';
            default:
                return value;
        }
    };

    const renderBadge = (status) => {
        const colors = {
            'Ready to Move': { bg: '#dcfce7', text: '#166534' },
            'Under Construction': { bg: '#fef9c3', text: '#854d0e' },
            'Upcoming': { bg: '#dbeafe', text: '#1e40af' }
        };
        const color = colors[status] || { bg: '#f1f5f9', text: '#475569' };
        return (
            <span style={{ padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: color.bg, color: color.text, textTransform: 'uppercase' }}>
                {status}
            </span>
        );
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.95)', zIndex: 10000, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div style={{ width: '100%', maxWidth: '1440px', height: '90vh', backgroundColor: 'white', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>

                {/* Fixed Header Row */}
                <div style={{ padding: '1.5rem 2.5rem', background: 'linear-gradient(to right, #0F172A, #1E293B)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                    <div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ShieldCheck size={32} className="text-primary" /> Project Comparison
                        </h2>
                        <p style={{ margin: '4px 0 0 0', opacity: 0.6, fontSize: '0.9rem' }}>Detailed side-by-side analysis for smarter decisions</p>
                    </div>
                    <button onClick={onClose} style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Table with Sticky Headers */}
                <div style={{ flex: 1, overflow: 'auto', padding: '0 1rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                        <thead style={{ position: 'sticky', top: 0, zIndex: 20 }}>
                            <tr>
                                <th style={{ padding: '2rem', textAlign: 'left', minWidth: '240px', backgroundColor: 'white', borderBottom: '2px solid #e2e8f0', borderRight: '1px solid #f1f5f9' }}>
                                    <button
                                        onClick={() => setIsAdding(true)}
                                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '1rem', backgroundColor: '#f8fafc', color: 'var(--color-primary)', border: '2px dashed #cbd5e1', borderRadius: '16px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                                        onMouseEnter={(e) => { e.target.style.backgroundColor = '#f1f5f9'; e.target.style.borderColor = 'var(--color-primary)'; }}
                                        onMouseLeave={(e) => { e.target.style.backgroundColor = '#f8fafc'; e.target.style.borderColor = '#cbd5e1'; }}
                                    >
                                        <Plus size={20} /> Add Project
                                    </button>
                                </th>
                                {projects.map((project) => (
                                    <th key={project.id} style={{ padding: '1.5rem', textAlign: 'center', minWidth: '320px', backgroundColor: 'white', borderBottom: '2px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', position: 'relative' }}>
                                            <button
                                                onClick={() => onRemoveProject(project.id)}
                                                style={{ position: 'absolute', top: '-0.5rem', right: '0', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                <X size={14} />
                                            </button>
                                            <img
                                                src={project.images[0]}
                                                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                alt={project.name}
                                            />
                                            <div>
                                                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>{project.name}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                                    <MapPin size={12} /> {project.address.city}
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                ))}
                                {isAdding && (
                                    <th style={{ padding: '1.5rem', textAlign: 'center', minWidth: '320px', backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '1rem', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                                            <div style={{ position: 'relative' }}>
                                                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', appearance: 'none', outline: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                                                    <option value="">Choose City</option>
                                                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                                <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                            </div>
                                            {selectedCity && (
                                                <div style={{ position: 'relative' }}>
                                                    <select value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', appearance: 'none', outline: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                                                        <option value="">Choose Project</option>
                                                        {availableProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                                    </select>
                                                    <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button onClick={handleAdd} disabled={!selectedProjectId} style={{ flex: 1, padding: '0.8rem', backgroundColor: selectedProjectId ? 'var(--color-primary)' : '#cbd5e1', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>Add</button>
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
                                        <td colSpan={projects.length + (isAdding ? 2 : 1)} style={{ padding: '1.5rem 2rem 0.5rem 2rem', borderBottom: '1px solid #f1f5f9' }}>
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
                                            {projects.map(project => (
                                                <td key={project.id} style={{ padding: '1rem', textAlign: 'center', color: '#1e293b', fontWeight: 700, fontSize: '0.95rem' }}>
                                                    {row.type === 'badge' ? renderBadge(getValue(project, row.key)) : formatValue(project, row)}
                                                </td>
                                            ))}
                                            {isAdding && <td style={{ backgroundColor: '#f8fafc' }} />}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}

                            {/* Amenities Section */}
                            <tr>
                                <td colSpan={projects.length + (isAdding ? 2 : 1)} style={{ padding: '2rem 2.5rem 0.5rem 2.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        <ShieldCheck size={18} /> Amenities & Features
                                    </div>
                                </td>
                            </tr>
                            {['Swimming Pool', 'Gymnasium', 'Club House', '24x7 Security', 'Power Supply', 'Jogging Track'].map((amenity, idx) => (
                                <tr
                                    key={idx}
                                    onMouseEnter={() => setHoveredRow(`amenity-${idx}`)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    style={{ backgroundColor: hoveredRow === `amenity-${idx}` ? '#f8fafc' : 'transparent' }}
                                >
                                    <td style={{ padding: '1rem 2.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.9rem', borderRight: '1px solid #f1f5f9', position: 'sticky', left: 0, backgroundColor: hoveredRow === `amenity-${idx}` ? '#f8fafc' : 'white', zIndex: 10 }}>{amenity}</td>
                                    {projects.map(project => {
                                        const has = Object.values(project.amenities || {}).flat().includes(amenity);
                                        return (
                                            <td key={project.id} style={{ padding: '1rem', textAlign: 'center' }}>
                                                {has ? <div style={{ color: '#10b981', display: 'flex', justifyContent: 'center' }}><Check size={20} strokeWidth={3} /></div> : <div style={{ color: '#cbd5e1', display: 'flex', justifyContent: 'center' }}><Minus size={20} /></div>}
                                            </td>
                                        );
                                    })}
                                    {isAdding && <td style={{ backgroundColor: '#f8fafc' }} />}
                                </tr>
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

export default ProjectComparison;
