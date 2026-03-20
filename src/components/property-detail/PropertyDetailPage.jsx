import React, { useEffect, useState } from 'react';
import PropertyHeader from './PropertyHeader';
import PropertyOverview from './PropertyOverview';
import PropertyBuiltup from './PropertyBuiltup';
import PropertyLocation from './PropertyLocation';
import PropertyMedia from './PropertyMedia';
import NewsSection from '../NewsSection';
import SEO from '../SEO';
// No static imports anymore
import { fetchListingBySlug } from '../../services/crmService';
import SkeletonLoader from '../SkeletonLoader';

const PropertyDetailPage = ({ propertyId, onAddToCompare, onBookConsultation }) => {
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProperty = async () => {
            setLoading(true);
            try {
                // Try CRM only
                const data = await fetchListingBySlug(propertyId);
                if (data) {
                    setProperty(data);
                } else {
                    setProperty(null);
                }
            } catch (error) {
                console.error("Error fetching dynamic property:", error);
                setProperty(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [propertyId]);

    if (loading) {
        return <SkeletonLoader type="detail" />;
    }

    if (!property) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', gap: '1rem' }}>
                <div style={{ fontSize: '4rem', fontWeight: 900, color: '#CBD5E1' }}>404</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>Property View Not Found</div>
                <button onClick={() => window.history.back()} style={{ padding: '0.75rem 2rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>Go Back</button>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
            <SEO
                title={property.seo?.title || `${property.unitName} | ${property.location?.sector}, ${property.location?.city} | Bharat Properties`}
                description={property.seo?.description || property.description?.substring(0, 160) || `View details for ${property.unitName}. Luxury residential property at ${property.price}.`}
                keywords={property.seo?.tags?.join(', ') || `${property.unitName}, Luxury Property, ${property.propertyType} for sale`}
            />
            {/* Full Bleed Header */}
            <PropertyHeader
                property={property}
                onAddToCompare={onAddToCompare}
                onBookConsultation={onBookConsultation}
            />

            <main className="container" style={{ position: 'relative', marginTop: '4rem', paddingBottom: '8rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '4rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                        {/* Highlights & Technical Specs first */}
                        <PropertyOverview property={property} />
                        
                        {/* Media Showcase */}
                        {property.images && property.images.length > 0 && (
                            <section>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                                    Visual Tour
                                </div>
                                <PropertyMedia media={property.images} />
                            </section>
                        )}
                        
                        {property.builtupDetails && <PropertyBuiltup builtup={property.builtupDetails} furnishing={property.construction} />}
                    </div>

                    <aside style={{ position: 'sticky', top: '100px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {property.location && (
                            <div className="glass-card" style={{ padding: '2rem', border: '1px solid #f1f5f9' }}>
                                <PropertyLocation location={property.location} />
                            </div>
                        )}
                        
                        {/* Quick Action Card */}
                        <div style={{ 
                            padding: '2.5rem', 
                            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', 
                            borderRadius: '32px', 
                            color: 'white',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Interest in this property?</h3>
                            <p style={{ opacity: 0.7, marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.5 }}>Our property experts are ready to assist you with a VIP tour and documentation.</p>
                            <button 
                                onClick={onBookConsultation}
                                style={{ width: '100%', padding: '1.25rem', background: 'var(--grad-gold)', border: 'none', borderRadius: '16px', color: 'var(--color-primary)', fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s' }}
                                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                            >
                                Schedule VIP Visit
                            </button>
                        </div>
                    </aside>
                </div>
            </main>

            <NewsSection city={property.location?.city} />
        </div>
    );
};

export default PropertyDetailPage;
