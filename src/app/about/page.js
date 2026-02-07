'use client';
import AboutPage from '../../components/AboutPage';
import { useGlobal } from '../../context/GlobalContext';

export default function Page() {
    const { setShowConsultationModal, setShowExpertModal } = useGlobal();
    return (
        <AboutPage
            onBookConsultation={() => setShowConsultationModal(true)}
            onTalkToExpert={() => setShowExpertModal(true)}
        />
    );
}
