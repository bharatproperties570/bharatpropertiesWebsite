'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROPERTY_DATA } from '../data/propertyData';
import { INDIVIDUAL_PROPERTIES } from '../data/individualProperties';

const GlobalContext = createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [showWishlist, setShowWishlist] = useState(false);

    const [comparisonProjects, setComparisonProjects] = useState([]);
    const [showComparison, setShowComparison] = useState(false);

    const [comparisonProperties, setComparisonProperties] = useState([]);
    const [showPropertyComparison, setShowPropertyComparison] = useState(false);

    const [showPostProperty, setShowPostProperty] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [showConsultationModal, setShowConsultationModal] = useState(false);
    const [showExpertModal, setShowExpertModal] = useState(false);
    const [showContactPopup, setShowContactPopup] = useState(false);
    const [showMapView, setShowMapView] = useState(false);

    // Wishlist Handlers
    const handleToggleWishlist = (property) => {
        setWishlist(prev => {
            if (prev.find(p => p.id === property.id)) {
                return prev.filter(p => p.id !== property.id);
            }
            return [...prev, property];
        });
    };

    // Project Comparison
    const handleAddComparisonProject = (project) => {
        if (comparisonProjects.find(p => p.id === project.id)) return;
        setComparisonProjects(prev => [...prev, project]);
        setShowComparison(true);
    };

    const handleRemoveFromComparison = (projectId) => {
        setComparisonProjects(prev => prev.filter(p => p.id !== projectId));
    };

    // Property Comparison
    const handleAddToPropertyComparison = (property) => {
        const richProperty = INDIVIDUAL_PROPERTIES.find(p => p.id === property.id || p.id === `prop-${property.id}`);
        const propertyToCompare = richProperty || property;

        setComparisonProperties(prev => {
            if (prev.find(p => p.id === propertyToCompare.id)) return prev;
            return [...prev, propertyToCompare];
        });
        setShowPropertyComparison(true);
    };

    const handleRemoveFromPropertyComparison = (propertyId) => {
        setComparisonProperties(prev => prev.filter(p => p.id !== propertyId));
    };

    return (
        <GlobalContext.Provider value={{
            selectedCity, setSelectedCity,
            wishlist, setWishlist, handleToggleWishlist, showWishlist, setShowWishlist,
            comparisonProjects, handleAddComparisonProject, handleRemoveFromComparison, showComparison, setShowComparison,
            comparisonProperties, handleAddToPropertyComparison, handleRemoveFromPropertyComparison, showPropertyComparison, setShowPropertyComparison,
            showPostProperty, setShowPostProperty,
            showFeedbackModal, setShowFeedbackModal,
            showConsultationModal, setShowConsultationModal,
            showExpertModal, setShowExpertModal,
            showContactPopup, setShowContactPopup,
            showMapView, setShowMapView
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
