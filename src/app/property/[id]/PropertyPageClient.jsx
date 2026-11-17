'use client';
import { useGlobal } from '../../../context/GlobalContext';
import PropertyDetailPage from '../../../components/property-detail/PropertyDetailPage';

export default function PropertyPageClient({ initialProperty }) {
    const { setShowConsultationModal, handleAddToPropertyComparison } = useGlobal();

    return (
        <PropertyDetailPage
            propertyId={initialProperty.slug || initialProperty.id}
            initialProperty={initialProperty}
            onBookConsultation={() => setShowConsultationModal(true)}
            onAddToCompare={handleAddToPropertyComparison}
        />
    );
}
