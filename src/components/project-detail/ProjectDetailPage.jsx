import React, { useEffect, useState } from 'react';
import ProjectHeader from './ProjectHeader';
import ProjectOverview from './ProjectOverview';
import ProjectBlocks from './ProjectBlocks';
import ProjectUnits from './ProjectUnits';
import ProjectAmenities from './ProjectAmenities';
import SiteVisitForm from './SiteVisitForm';
import ImageGallery from './ImageGallery';
import ProjectLocation from './ProjectLocation';
import NewsSection from '../NewsSection';
import SEO from '../SEO';
import { getProjectById } from '../../data/sampleProjects';

const ProjectDetailPage = ({ projectId, onBookConsultation, onAddToCompare }) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProject = async () => {
            try {
                setLoading(true);
                const data = getProjectById(projectId);
                setProject(data);
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setLoading(false);
            }
        };

        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#fff' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#64748b' }}>Curating Experience...</div>
                </div>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (!project) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', gap: '1.5rem', backgroundColor: '#fff' }}>
                <div style={{ fontSize: '5rem', fontWeight: 900, color: '#e2e8f0', letterSpacing: '-0.05em' }}>404</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Project Not Found</div>
                <button onClick={() => window.history.back()} style={{ marginTop: '1rem', padding: '1rem 2.5rem', backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
                    Browse Projects
                </button>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', scrollBehavior: 'smooth' }}>
            <SEO
                title={`${project.name} | ${project.address?.city} | Bharat Properties`}
                description={project.description || `Discover ${project.name}, a premium real estate project in ${project.address?.city}. Exclusive details, pricing, and amenities.`}
                keywords={`${project.name}, ${project.address?.city} Real Estate, ${project.type || 'Project'} in ${project.address?.city}`}
            />
            {/* Project Header (Sticky) */}
            <ProjectHeader
                project={project}
                onAddToCompare={() => onAddToCompare(project)}
            />

            <main>
                {/* Visual Showcase (Gallery) */}
                <ImageGallery images={project.images} projectName={project.name} />

                {/* Core Details Container */}
                <div style={{ position: 'relative' }}>
                    {/* Overview & Highlights */}
                    <ProjectOverview project={project} />

                    {/* Architectural Detail */}
                    {project.blocks && project.blocks.length > 0 && (
                        <ProjectBlocks blocks={project.blocks} />
                    )}

                    {/* Inventory & Pricing */}
                    {project.unitSizes && project.unitSizes.length > 0 && (
                        <ProjectUnits unitSizes={project.unitSizes} floorPlans={project.floorPlans} />
                    )}

                    {/* Experiences & Amenities */}
                    {project.amenities && (
                        <ProjectAmenities amenities={project.amenities} />
                    )}

                    {/* Geography */}
                    {project.address && (
                        <div style={{ padding: '2rem 0', backgroundColor: '#fff' }}>
                            <ProjectLocation address={project.address} projectName={project.name} />
                        </div>
                    )}

                    {/* Regional News context */}
                    <NewsSection city={project.address.city} />
                </div>

                {/* Conversion Section (Form) */}
                <div id="visit-form" style={{ padding: '2rem 0 5rem 0', backgroundColor: '#F8FAFC' }}>
                    <SiteVisitForm projectName={project.name} />
                </div>
            </main>

            {/* Bottom Floating CTA Section */}
            <section style={{
                padding: '6rem 0',
                background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        Ready to See <span style={{ color: 'var(--color-primary)' }}>{project.name}?</span>
                    </h2>
                    <p style={{ fontSize: '1.25rem', marginBottom: '3rem', opacity: 0.7, maxWidth: '700px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
                        Book a VIP site visit today and get exclusive early-bird offers only through Bharat Properties.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => document.getElementById('visit-form')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{ padding: '1.25rem 3rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '20px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px) scale(1.02)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
                        >
                            Request Site Visit
                        </button>
                        <button
                            onClick={onBookConsultation}
                            style={{ padding: '1.25rem 3rem', backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '20px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s' }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                e.target.style.borderColor = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                            }}
                        >
                            Talk to Executive
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetailPage;
