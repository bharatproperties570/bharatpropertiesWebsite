import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
    const shimmerAnimation = `
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
    `;

    const baseStyle = {
        background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite linear',
        borderRadius: '8px'
    };

    const CardSkeleton = () => (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <style>{shimmerAnimation}</style>
            <div style={{ ...baseStyle, height: '200px', borderRadius: '16px 16px 0 0' }} />
            <div style={{ padding: '1.25rem' }}>
                <div style={{ ...baseStyle, height: '1.5rem', width: '80%', marginBottom: '0.75rem' }} />
                <div style={{ ...baseStyle, height: '1rem', width: '40%', marginBottom: '1.25rem' }} />
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <div style={{ ...baseStyle, height: '2rem', width: '30%', borderRadius: '12px' }} />
                    <div style={{ ...baseStyle, height: '2rem', width: '30%', borderRadius: '12px' }} />
                </div>
                <div style={{ ...baseStyle, height: '3rem', width: '100%', borderRadius: '12px' }} />
            </div>
        </div>
    );

    const DetailSkeleton = () => (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <style>{shimmerAnimation}</style>
            <div style={{ ...baseStyle, height: '3rem', width: '60%', marginBottom: '2rem' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ ...baseStyle, height: '450px', borderRadius: '24px' }} />
                    <div style={{ ...baseStyle, height: '150px' }} />
                    <div style={{ ...baseStyle, height: '250px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ ...baseStyle, height: '300px', borderRadius: '24px' }} />
                    <div style={{ ...baseStyle, height: '200px', borderRadius: '24px' }} />
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ 
            display: type === 'card' ? 'grid' : 'block', 
            gridTemplateColumns: type === 'card' ? 'repeat(auto-fill, minmax(300px, 1fr))' : 'none',
            gap: '2rem',
            width: '100%'
        }}>
            {[...Array(count)].map((_, i) => (
                type === 'card' ? <CardSkeleton key={i} /> : <DetailSkeleton key={i} />
            ))}
        </div>
    );
};

export default SkeletonLoader;
