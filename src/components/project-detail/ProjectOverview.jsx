import React from 'react';
import { Calendar, Layers, Building, Home, MapPin, CheckCircle2, BadgeCheck, ShieldCheck, Wallet } from 'lucide-react';

const ProjectOverview = ({ project }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' });
    };

    const highlights = [
        { icon: <Layers size={24} />, label: 'Architecture', value: `${project.totalBlocks} Blocks`, color: '#6366f1' },
        { icon: <Building size={24} />, label: 'Elevation', value: `${project.totalFloors} Floors`, color: '#ec4899' },
        { icon: <Home size={24} />, label: 'Inventory', value: `${project.totalUnits} Units`, color: '#f59e0b' },
        { icon: <MapPin size={24} />, label: 'Landscape', value: `${project.landArea.value} ${project.landArea.unit}`, color: '#10b981' }
    ];

    return (
        <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>

                    {/* Left Side: About & Highlights */}
                    <div>
                        <div style={{ marginBottom: '3rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                                <BadgeCheck size={20} /> Project Overview
                            </div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                                A Masterpiece of <span style={{ color: 'var(--color-primary)' }}>Modern Architecture</span>
                            </h2>
                            <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#475569', marginBottom: '2.5rem' }}>
                                {project.description}
                            </p>

                            {/* Key Stats Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                {highlights.map((item, index) => (
                                    <div key={index} style={{ padding: '1.5rem', backgroundColor: item.color + '08', borderRadius: '24px', border: `1px solid ${item.color}15`, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ color: item.color }}>{item.icon}</div>
                                        <div>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b' }}>{item.value}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>{item.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Timeline & Approvals */}
                    <div style={{ backgroundColor: '#F8FAFC', padding: '2.5rem', borderRadius: '40px', border: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>
                            <Wallet size={18} /> Financial & Timeline
                        </div>

                        {/* Timeline List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', color: 'var(--color-primary)' }}>
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Launch Date</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>{formatDate(project.launchedOn)}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', color: '#ec4899' }}>
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Possession Starts</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>{formatDate(project.possession)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Parking Tags */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase' }}>Available Parking</div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {project.parkingType.map((type, idx) => (
                                    <span key={idx} style={{ padding: '0.5rem 1rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Property Tags */}
                        <div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase' }}>Configurations</div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{ padding: '0.5rem 1rem', background: 'var(--color-primary)', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                                    {project.category}
                                </span>
                                {project.subCategory.map((sub, idx) => (
                                    <span key={idx} style={{ padding: '0.5rem 1rem', background: '#eef2ff', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, color: '#4f46e5' }}>
                                        {sub}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Bank Approvals Section */}
                {project.approvedBanks && project.approvedBanks.length > 0 && (
                    <div style={{ marginTop: '5rem', padding: '4rem', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', borderRadius: '48px', border: '1px solid #f1f5f9' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>Funding Partners</h3>
                            <p style={{ color: '#64748b', fontWeight: 500 }}>Approved and verified by leading financial institutions</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
                            {project.approvedBanks.map((bank, idx) => (
                                <div key={idx} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)', border: '1px solid #f1f5f9', transition: 'all 0.3s ease' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.05)';
                                        e.currentTarget.style.borderColor = 'var(--color-primary)22';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.02)';
                                        e.currentTarget.style.borderColor = '#f1f5f9';
                                    }}
                                >
                                    <div style={{ width: '60px', height: '60px', margin: '0 auto 1.25rem', backgroundColor: '#f8fafc', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                                        <Building size={28} />
                                    </div>
                                    <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem', lineHeight: '1.4' }}>{bank}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectOverview;
