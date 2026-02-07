'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGlobal } from '../../context/GlobalContext';
import SearchResults from '../../components/SearchResults';
import { PROPERTY_DATA } from '../../data/propertyData';

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const q = searchParams.get('q') || '';
    const { wishlist, handleToggleWishlist, handleAddToPropertyComparison } = useGlobal();

    const lowerTerm = q.toLowerCase();
    const filteredProperties = q
        ? PROPERTY_DATA.filter(p =>
            p.title.toLowerCase().includes(lowerTerm) ||
            p.location.toLowerCase().includes(lowerTerm)
        )
        : PROPERTY_DATA;

    const handleSelectProperty = (id) => {
        router.push(`/property/${id}`);
    };

    const propertiesWithHandlers = filteredProperties.map(p => ({
        ...p,
        onCompare: handleAddToPropertyComparison,
        onWishlist: handleToggleWishlist,
        isWishlisted: wishlist.some(w => w.id === p.id)
    }));

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
