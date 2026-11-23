'use client';
import { useGlobal } from '../../../context/GlobalContext';
import ProjectDetailPage from '../../../components/project-detail/ProjectDetailPage';

export default function ProjectPageClient({ initialProject, breadcrumbs, moreProjects, city }) {
    const { setShowConsultationModal, handleAddComparisonProject } = useGlobal();

    return (
        <ProjectDetailPage
            projectId={initialProject.slug || initialProject.id}
            initialProject={initialProject}
            breadcrumbs={breadcrumbs}
            moreProjects={moreProjects}
            city={city}
            onBookConsultation={() => setShowConsultationModal(true)}
            onAddToCompare={handleAddComparisonProject}
        />
    );
}
