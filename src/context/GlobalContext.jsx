'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProjects, fetchListings } from '../services/crmService';
// Live CRM data only

const GlobalContext = createContext();

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

    const [allProjects, setAllProjects] = useState([]);
    const [allListings, setAllListings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            try {
                const [projects, listings] = await Promise.all([
                    fetchProjects(),
                    fetchListings()
                ]);
                setAllProjects(projects);
                setAllListings(listings);
            } catch (error) {
                console.error("Error loading initial CRM data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const groupedData = React.useMemo(() => {
        const projectsByCity = {};
        const listingsByCity = {};

        allProjects.forEach(project => {
            const city = project.location || 'Other';
            if (!projectsByCity[city]) projectsByCity[city] = [];
            projectsByCity[city].push(project);
        });

        allListings.forEach(listing => {
            const city = (typeof listing.location === 'object' ? listing.location.city : listing.location) || 'Other';
            if (!listingsByCity[city]) listingsByCity[city] = [];
            listingsByCity[city].push(listing);
        });

        return { projectsByCity, listingsByCity };
    }, [allProjects, allListings]);

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
        setComparisonProperties(prev => {
            if (prev.find(p => p.id === property.id)) return prev;
            return [...prev, property];
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
            showMapView, setShowMapView,
            allProjects, allListings, groupedData, loading
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => useContext(GlobalContext);
