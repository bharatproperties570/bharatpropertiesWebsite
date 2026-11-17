'use client';
import { useGlobal } from '../../../context/GlobalContext';
import ProjectDetailPage from '../../../components/project-detail/ProjectDetailPage';

export default function ProjectPageClient({ initialProject }) {
    const { setShowConsultationModal, handleAddComparisonProject } = useGlobal();

    return (
        <ProjectDetailPage
            projectId={initialProject.slug || initialProject.id}
            initialProject={initialProject}
            onBookConsultation={() => setShowConsultationModal(true)}
            onAddToCompare={handleAddComparisonProject}
        />
    );
}
