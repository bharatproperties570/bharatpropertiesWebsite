'use client';
import React from 'react';
import AboutPage from '../../components/AboutPage';
import { useGlobal } from '../../context/GlobalContext';

export default function AboutClient() {
    const { setShowConsultationModal, setShowExpertModal } = useGlobal();
    return (
        <AboutPage
            onBookConsultation={() => setShowConsultationModal(true)}
            onTalkToExpert={() => setShowExpertModal(true)}
        />
    );
}
