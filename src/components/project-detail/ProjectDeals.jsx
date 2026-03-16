import React from 'react';
import PropertyCard from '../PropertyCard';
import { useRouter } from 'next/navigation';

const ProjectDeals = ({ deals, projectName }) => {
    const router = useRouter();

    if (!deals || deals.length === 0) {
        return null;
    }

    return (
        <section id="project-deals" style={{ padding: '6rem 0', backgroundColor: '#F8FAFC' }}>
            <div className="container">
                <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0F172A', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                        Available Units in <span style={{ color: 'var(--color-primary)' }}>{projectName}</span>
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
                        Browse exclusively listed secondary market units and developer inventory currently available in this project.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {deals.map((deal) => (
                        <PropertyCard
                            key={deal.id}
                            property={deal}
                            onClick={() => router.push(`/property/${deal.slug}`)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectDeals;
