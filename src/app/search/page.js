'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGlobal } from '../../context/GlobalContext';
import SearchResults from '../../components/SearchResults';
import { fetchListings, fetchProjects } from '../../services/crmService';
import SkeletonLoader from '../../components/SkeletonLoader';

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const q = searchParams.get('q') || '';
    const { wishlist, handleToggleWishlist, handleAddToPropertyComparison } = useGlobal();
    const [properties, setProperties] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filteredProperties, setFilteredProperties] = React.useState([]);

    React.useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [listingsData, projectsData] = await Promise.all([
                    fetchListings(),
                    fetchProjects()
                ]);
                
                // Tag projects so SearchResults can handle them if needed, or just combine
                const combined = [
                    ...listingsData,
                    ...projectsData.map(proj => ({
                        ...proj,
                        isProject: true,
                        title: proj.name, // Mapping for search consistency
                        image: proj.images?.[0] || proj.image,
                        // For projects, we display the starting price in the search result
                        price: proj.unitSizes?.[0]?.price || 'Contact for Price',
                        type: 'Project', // Keep it simple for search filter
                    }))
                ];
                
                setProperties(combined);
            } catch (error) {
                console.error('Error loading search results:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    React.useEffect(() => {
        const lowerTerm = q.toLowerCase();
        const filtered = q
            ? properties.filter(p =>
                (p.title || '').toString().toLowerCase().includes(lowerTerm) ||
                (typeof p.location === 'object' ? p.location.city.toLowerCase().includes(lowerTerm) : (p.location || '').toString().toLowerCase().includes(lowerTerm)) ||
                (p.type || '').toString().toLowerCase().includes(lowerTerm) ||
                (p.locationSearch || '').toString().toLowerCase().includes(lowerTerm)
            )
            : properties;
        setFilteredProperties(filtered);
    }, [q, properties]);

    const handleSelectProperty = (id) => {
        router.push(`/property/${id}`);
    };

    const propertiesWithHandlers = filteredProperties.map(p => ({
        ...p,
        onCompare: handleAddToPropertyComparison,
        onWishlist: handleToggleWishlist,
        isWishlisted: wishlist.some(w => w.id === p.id)
    }));

    if (loading) {
        return (
            <div className="container" style={{ marginTop: '120px' }}>
                <SkeletonLoader type="card" count={4} />
            </div>
        );
    }

    return (
        <SearchResults
            properties={propertiesWithHandlers}
            searchTerm={q}
            onPropertySelect={handleSelectProperty}
        />
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchContent />
        </Suspense>
    )
}
