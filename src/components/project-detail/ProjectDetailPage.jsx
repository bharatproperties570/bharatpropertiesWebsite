import React, { useEffect, useState } from 'react';
import ProjectHeader from './ProjectHeader';
import ProjectOverview from './ProjectOverview';
import ProjectBlocks from './ProjectBlocks';
import ProjectUnits from './ProjectUnits';
import ProjectAmenities from './ProjectAmenities';
import SiteVisitForm from './SiteVisitForm';
import ImageGallery from './ImageGallery';
import ProjectLocation from './ProjectLocation';
import ProjectDeals from './ProjectDeals';

import SEO from '../SEO';
import { fetchProjectBySlug } from '../../services/crmService';
import SkeletonLoader from '../SkeletonLoader';

const ProjectDetailPage = ({ projectId, onBookConsultation, onAddToCompare }) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProject = async () => {
            try {
                setLoading(true);
                const data = await fetchProjectBySlug(projectId);
                if (data) {
                    setProject(data);
                }
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
        return <SkeletonLoader type="detail" />;
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
                title={project.seo?.title || `${project.name} | ${project.address?.city} | Bharat Properties`}
                description={project.seo?.description || project.overview?.substring(0, 160) || `Discover ${project.name}, a premium real estate project.`}
                keywords={project.seo?.tags?.join(', ') || `${project.name}, Real Estate Project, ${project.address?.city}`}
            />
            {/* Project Header (Sticky & Hero) */}
            <ProjectHeader
                project={project}
                onBookConsultation={onBookConsultation}
                onAddToCompare={() => onAddToCompare(project)}
            />

            <main>
                {/* Core Details Container */}
                <div style={{ position: 'relative', marginTop: '-1px' }}>
                    {/* Overview & Highlights */}
                    {project.overview && <ProjectOverview project={project} />}

                    {/* Visual Showcase (Gallery) - Moved below overview for better flow */}
                    {project.images && project.images.length > 0 && (
                        <div style={{ padding: '2rem 0', backgroundColor: '#000' }}>
                            <ImageGallery images={project.images} projectName={project.name} />
                        </div>
                    )}

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

                    {/* Associated Listings/Deals */}
                    {project.deals && project.deals.length > 0 && (
                        <ProjectDeals deals={project.deals} projectName={project.name} />
                    )}

                    {/* Geography */}
                    {project.address && (
                        <div style={{ padding: '8rem 0', backgroundColor: '#fff', borderTop: '1px solid #f1f5f9' }}>
                            <ProjectLocation address={project.address} projectName={project.name} />
                        </div>
                    )}
                </div>

                {/* Conversion Section (Form) */}
                <div id="visit-form" style={{ padding: '8rem 0', backgroundColor: '#F8FAFC' }}>
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
