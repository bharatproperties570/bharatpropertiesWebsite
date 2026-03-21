'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { fetchFeaturedProjects } from '../services/crmService';
import { MapPin, Building2, ChevronRight } from 'lucide-react';
import './FeaturedProjects.css';

const FeaturedProjects = ({ city = '', initialData = [] }) => {
    const [activeTab, setActiveTab] = useState('All');
    const [projects, setProjects] = useState(initialData);
    const [loading, setLoading] = useState(initialData.length === 0);
    const scrollRef = useRef(null);

    const tabs = [
        { id: 'All', label: '🌆 All Projects' },
        { id: 'Under Construction', label: '🏗️ Under Construction' },
        { id: 'Ready to move', label: '🔑 Ready to Move' },
        { id: 'Launched', label: '🚀 Launched' },
        { id: 'Pre-launched', label: '✨ Pre-launched' }
    ];

    useEffect(() => {
        const loadProjects = async () => {
            if (activeTab === 'All' && initialData.length > 0 && projects === initialData) {
                setLoading(false);
                return;
            }
            setLoading(true);
            const data = await fetchFeaturedProjects(activeTab, city);
            setProjects(data);
            setLoading(false);
        };
        loadProjects();
    }, [activeTab, city, initialData, projects]);

    return (
        <section className="featured-projects-section">
            <div className="section-container">
                <div className="section-header">
                    <h2 className="section-title">Our Premium Projects</h2>
                    <p className="section-subtitle">Discover world-class developments in your preferred location</p>
                    
                    <div className="filter-tabs projects-tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="projects-scroll-container" ref={scrollRef}>
                    {projects.length > 0 ? (
                        <div className="projects-track" style={{ opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                            {projects.map((project, index) => (
                                <div key={project.id || index} className="project-card-wrapper">
                                    <div className="premium-project-card">
                                        <div className="project-image-container">
                                            {project.image ? (
                                                <Image 
                                                    src={project.image} 
                                                    alt={project.name} 
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="project-image"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div className="no-image-placeholder" style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '12px',
                                                    color: '#94a3b8'
                                                }}>
                                                    <Building2 size={48} strokeWidth={1.5} />
                                                    <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>MEDIA PENDING</span>
                                                </div>
                                            )}
                                            <div className="project-status-badge">{project.status}</div>
                                            <div className="project-price-overlay">{project.price}</div>
                                        </div>
                                        <div className="project-info">
                                            <h3 className="project-name">{project.name}</h3>
                                            <p className="developer-name"><Building2 size={14} /> {project.developer}</p>
                                            <div className="project-location">
                                                <MapPin size={16} />
                                                <span>{project.location}</span>
                                            </div>
                                            <button className="view-details-btn" onClick={() => window.location.href = `/project/${project.id}`}>
                                                View Details <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : loading ? (
                        <div className="loading-state">Finding your dream project...</div>
                    ) : (
                        <div className="no-projects">No projects found in this category for {city || 'all cities'}.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
