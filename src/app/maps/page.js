import React from 'react';
import { Map, Download } from 'lucide-react';

export const metadata = {
  title: 'Map Downloads - Bharat Properties',
  description: 'Download official maps and brochures for premium properties.',
};

export default function MapsPage() {
    const maps = [
        {
            id: 1,
            title: 'Huda Map Book Kurukshetra',
            description: 'Comprehensive map book for HUDA Sectors in Kurukshetra, featuring plot sizes and sector layouts.',
            fileUrl: '/Huda_Map_Book_KKR.pdf',
            date: 'Updated: May 2024'
        }
        // Future maps can be added here
    ];

    return (
        <div style={{ minHeight: '80vh', padding: '6rem 2rem 4rem', backgroundColor: '#f9fafb' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary, #1e3a8a)', marginBottom: '1rem' }}>Map Downloads</h1>
                    <p style={{ fontSize: '1.1rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
                        Explore and download official master plans, sector layouts, and comprehensive map books for our premium locations.
                    </p>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                    gap: '2rem' 
                }}>
                    {maps.map((map) => (
                        <div key={map.id} style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '2rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            transition: 'transform 0.2s',
                            cursor: 'pointer',
                        }}>
                            <div style={{ 
                                backgroundColor: 'var(--color-gold, #fbbf24)', 
                                width: '50px', 
                                height: '50px', 
                                borderRadius: '10px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                color: 'white'
                            }}>
                                <Map size={24} />
                            </div>
                            
                            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary, #1e3a8a)', marginBottom: '0.75rem', fontWeight: 'bold' }}>
                                {map.title}
                            </h3>
                            
                            <p style={{ color: '#4b5563', flexGrow: 1, marginBottom: '1.5rem', lineHeight: '1.5' }}>
                                {map.description}
                            </p>
                            
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
                                <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{map.date}</span>
                                <a 
                                    href={map.fileUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: 'var(--color-gold, #fbbf24)',
                                        fontWeight: '600',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <Download size={18} />
                                    Download
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
