import React, { useEffect, useState } from 'react';
import PropertyHeader from './PropertyHeader';
import PropertyOverview from './PropertyOverview';
import PropertyBuiltup from './PropertyBuiltup';
import PropertyLocation from './PropertyLocation';
import PropertyMedia from './PropertyMedia';
import NewsSection from '../NewsSection';
import SEO from '../SEO';
import { getPropertyById } from '../../data/individualProperties';

const PropertyDetailPage = ({ propertyId, onAddToCompare, onBookConsultation }) => {
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProperty = async () => {
            setLoading(true);
            const data = getPropertyById(propertyId);
            if (data) {
                // Ensure title exists for SEO
                if (!data.title) {
                    data.title = `${data.unitName || 'Property'} at ${data.projectName || 'Project'}`;
                }
                setProperty(data);
            }
            setLoading(false);
        };
        fetchProperty();
    }, [propertyId]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
                    <div style={{ fontSize: '1.2rem', color: '#64748b' }}>Fetching Property Data...</div>
                </div>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
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
                title={`${property.title} | ${property.location?.city} | Bharat Properties`}
                description={property.description || `View details for ${property.title} in ${property.location?.city}. Luxury residential property at ${property.price}.`}
                keywords={`${property.title}, Luxury Property ${property.location?.city}, ${property.type} for sale`}
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
                <NewsSection city={property.location.city} />
            </div>
        </div>
    );
};

export default PropertyDetailPage;
