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
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: '20px' }}>
            <SEO
                title={property.seo?.title || `${property.title} | ${typeof property.location === 'object' ? (property.location.city || property.location.display) : property.location} | Bharat Properties`}
                description={property.seo?.description || property.description?.substring(0, 160) || `View details for ${property.title}. Luxury residential property at ${property.price}.`}
                keywords={property.seo?.tags?.join(', ') || `${property.title}, Luxury Property, ${property.type} for sale`}
            />
            <div className="container" style={{ paddingTop: '2rem' }}>
                <PropertyHeader
                    property={property}
                    onAddToCompare={onAddToCompare}
                    onBookConsultation={onBookConsultation}
                />
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem', marginTop: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {property.media && <PropertyMedia media={property.media} />}
                        <PropertyOverview property={property} />
                        {property.builtupDetails && <PropertyBuiltup builtup={property.builtupDetails} furnishing={property.construction} />}
                    </div>
                    <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                        {property.location && <PropertyLocation location={property.location} />}
                    </div>
                </div>
                <NewsSection city={typeof property.location === 'object' ? property.location.city : property.location} />
            </div>
        </div>
    );
};

export default PropertyDetailPage;
