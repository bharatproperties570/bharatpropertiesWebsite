'use client';
import { useGlobal } from '../../../context/GlobalContext';
import PropertyDetailPage from '../../../components/property-detail/PropertyDetailPage';

export default function PropertyPageClient({ initialProperty, breadcrumbs, moreListings, city }) {
    const { setShowConsultationModal, handleAddToPropertyComparison } = useGlobal();

    return (
        <PropertyDetailPage
            propertyId={initialProperty.slug || initialProperty.id}
            initialProperty={initialProperty}
            breadcrumbs={breadcrumbs}
            moreListings={moreListings}
            city={city}
            onBookConsultation={() => setShowConsultationModal(true)}
            onAddToCompare={handleAddToPropertyComparison}
        />
    );
}
