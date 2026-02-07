'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useGlobal } from '../context/GlobalContext';
import PostPropertyForm from './PostPropertyForm';
import FeedbackForm from './FeedbackForm';
import ConsultationForm from './ConsultationForm';
import TalkToExpertForm from './TalkToExpertForm';
import WishlistPanel from './WishlistPanel';
import ContactPopup from './ContactPopup';
import ProjectComparison from './ProjectComparison';
import PropertyComparison from './PropertyComparison';
import PropertyMapView from './PropertyMapView';
import Chatbot from './Chatbot';
import { Heart, MessageCircle } from 'lucide-react'; // MapPin not used in floating buttons directly? Checked App.jsx
import { PROPERTY_DATA } from '../data/propertyData';

export default function ClientUI() {
    const router = useRouter();
    const {
        selectedCity,
        wishlist, setWishlist, showWishlist, setShowWishlist,
        comparisonProjects, handleAddComparisonProject, handleRemoveFromComparison, showComparison, setShowComparison,
        comparisonProperties, handleAddToPropertyComparison, handleRemoveFromPropertyComparison, showPropertyComparison, setShowPropertyComparison,
        showPostProperty, setShowPostProperty,
        showFeedbackModal, setShowFeedbackModal,
        showConsultationModal, setShowConsultationModal,
        showExpertModal, setShowExpertModal,
        showContactPopup, setShowContactPopup,
        showMapView, setShowMapView
    } = useGlobal();

    const handleSelectProperty = (id) => {
        setShowMapView(false);
        router.push(`/property/${id}`);
    };

    const mapProperties = selectedCity
        ? PROPERTY_DATA.filter(p => p.location === selectedCity)
        : PROPERTY_DATA;

    return (
        <>
            {/* Floating Property Comparison Toggle */}
            {comparisonProperties.length > 0 && !showPropertyComparison && (
                <button
                    onClick={() => setShowPropertyComparison(true)}
                    style={{
                        position: 'fixed',
                        bottom: '160px',
                        right: '2rem',
                        zIndex: 1500,
                        padding: '1rem 2rem',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    🔍 Properties ({comparisonProperties.length})
                </button>
            )}

            {showComparison && (
                <ProjectComparison
                    projects={comparisonProjects}
                    onClose={() => setShowComparison(false)}
                    onRemoveProject={handleRemoveFromComparison}
                    onAddProject={handleAddComparisonProject}
                />
            )}

            {showPropertyComparison && (
                <PropertyComparison
                    properties={comparisonProperties}
                    onClose={() => setShowPropertyComparison(false)}
                    onRemoveProperty={handleRemoveFromPropertyComparison}
                    onAddProperty={handleAddToPropertyComparison}
                />
            )}

            {/* Floating Project Comparison Toggle */}
            {comparisonProjects.length > 0 && !showComparison && (
                <button
                    onClick={() => setShowComparison(true)}
                    style={{
                        position: 'fixed',
                        bottom: '90px',
                        right: '2rem',
                        padding: '1rem 2rem',
                        backgroundColor: 'var(--color-accent)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                        zIndex: 1500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                    🏙️ Projects ({comparisonProjects.length})
                </button>
            )}

            {showPostProperty && (
                <PostPropertyForm onClose={() => setShowPostProperty(false)} />
            )}

            {showFeedbackModal && (
                <FeedbackForm onClose={() => setShowFeedbackModal(false)} />
            )}

            {showConsultationModal && (
                <ConsultationForm onClose={() => setShowConsultationModal(false)} />
            )}

            {showExpertModal && (
                <TalkToExpertForm onClose={() => setShowExpertModal(false)} />
            )}

            {/* Floating Wishlist Toggle */}
            <button
                onClick={() => setShowWishlist(true)}
                style={{
                    position: 'fixed',
                    bottom: '230px',
                    right: '2rem',
                    zIndex: 1500,
                    width: '56px',
                    height: '56px',
                    backgroundColor: 'white',
                    color: 'var(--color-accent)',
                    border: 'none',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-xl)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0)'}
            >
                <Heart size={28} fill={wishlist.length > 0 ? 'var(--color-accent)' : 'none'} />
                {wishlist.length > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid white'
                    }}>
                        {wishlist.length}
                    </span>
                )}
            </button>

            <WishlistPanel
                isOpen={showWishlist}
                onClose={() => setShowWishlist(false)}
                items={wishlist}
                onRemove={(id) => setWishlist(prev => prev.filter(p => p.id !== id))}
            />

            <ContactPopup
                isOpen={showContactPopup}
                onClose={() => setShowContactPopup(false)}
            />

            {showMapView && (
                <PropertyMapView
                    properties={mapProperties}
                    onPropertySelect={handleSelectProperty}
                    onClose={() => setShowMapView(false)}
                />
            )}

            {/* Floating Contact Trigger */}
            <button
                onClick={() => setShowContactPopup(true)}
                style={{
                    position: 'fixed',
                    bottom: '160px',
                    right: '2rem',
                    zIndex: 1500,
                    width: '56px',
                    height: '56px',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-xl)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <MessageCircle size={28} />
            </button>

            {/* AI Chatbot */}
            <Chatbot />
        </>
    );
}
