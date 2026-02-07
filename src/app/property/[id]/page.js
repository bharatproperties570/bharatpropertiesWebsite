'use client';
import { useParams } from 'next/navigation';
import { useGlobal } from '../../../context/GlobalContext';
import PropertyDetailPage from '../../../components/property-detail/PropertyDetailPage';

export default function PropertyPage() {
    const { id } = useParams();
    const { setShowConsultationModal, handleAddToPropertyComparison } = useGlobal();

    const propertyId = decodeURIComponent(id);

    return (
        <PropertyDetailPage
            propertyId={propertyId}
            onBookConsultation={() => setShowConsultationModal(true)}
            onAddToCompare={handleAddToPropertyComparison}
        />
    );
}
