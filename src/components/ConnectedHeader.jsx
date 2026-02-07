'use client';
import React from 'react';
import Header from './Header'; // The original dumb component
import { useGlobal } from '../context/GlobalContext';
import { useRouter } from 'next/navigation';

export default function ConnectedHeader() {
    const { setShowPostProperty, setShowConsultationModal, selectedCity, setSelectedCity } = useGlobal();
    const router = useRouter();

    const handleSelectCity = (city) => {
        setSelectedCity(city);
        // Also navigate if not already there?
        // App.jsx: setSelectedCity(city); setCurrentView('CITY');
        router.push(`/city/${city}`);
    };

    const handleLogoClick = () => {
        setSelectedCity(null);
        router.push('/');
    }

    const handleAbout = () => router.push('/about');

    return (
        <Header
            onLogoClick={handleLogoClick}
            selectedCity={selectedCity}
            onSelectCity={handleSelectCity}
            onPostProperty={() => setShowPostProperty(true)}
            onBookConsultation={() => setShowConsultationModal(true)}
            onAboutClick={handleAbout}
        />
    );
}
