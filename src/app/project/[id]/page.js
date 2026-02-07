'use client';
import { useParams } from 'next/navigation';
import { useGlobal } from '../../../context/GlobalContext';
import ProjectDetailPage from '../../../components/project-detail/ProjectDetailPage';

export default function ProjectPage() {
    const { id } = useParams();
    const { setShowConsultationModal, handleAddComparisonProject } = useGlobal();

    // Decode ID if necessary, but typically simple strings for IDs
    const projectId = decodeURIComponent(id);

    return (
        <ProjectDetailPage
            projectId={projectId}
            onBookConsultation={() => setShowConsultationModal(true)}
            onAddToCompare={handleAddComparisonProject}
        />
    );
}
