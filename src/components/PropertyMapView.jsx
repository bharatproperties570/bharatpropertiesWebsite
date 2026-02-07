'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Info, X, AlertTriangle } from 'lucide-react';

const PropertyMapView = ({ properties = [], onPropertySelect, onClose, embedded = false }) => {
    const mapRef = useRef(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [libLoaded, setLibLoaded] = useState(!!window.google?.maps);
    const [error, setError] = useState(null);
    const markersRef = useRef([]);

    // Load Google Maps API
    useEffect(() => {
        let isMounted = true;

        const loadGoogleMaps = () => {
            if (window.google?.maps) {
                if (isMounted) setLibLoaded(true);
                return;
            }

            // Check if script is already loading
            const existingScript = document.getElementById('google-maps-script');
            if (existingScript) {
                const interval = setInterval(() => {
                    if (window.google?.maps) {
                        if (isMounted) setLibLoaded(true);
                        clearInterval(interval);
                    }
                }, 100);
                return;
            }

            // Load Google Maps script
            window.gm_authFailure = () => {
                if (isMounted) setError('Google Maps Authentication Failed. Please check API key.');
            };

            const script = document.createElement('script');
            script.id = 'google-maps-script';
            // Added callback and more libraries
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&loading=async`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                if (isMounted) {
                    console.log('Google Maps Script Loaded');
                    // Small delay to ensure maps object is fully initialized
                    setTimeout(() => {
                        if (isMounted) setLibLoaded(true);
                    }, 200);
                }
            };
            script.onerror = () => {
                if (isMounted) setError('Failed to load Google Maps script. Check your internet connection.');
            };
            document.head.appendChild(script);
        };

        loadGoogleMaps();
        return () => { isMounted = false; };
    }, []);

    // Initialize map
    useEffect(() => {
        if (!libLoaded || !mapRef.current || mapInstance || !window.google?.maps) return;

        try {
            // Center on Chandigarh/Mohali area
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 30.7333, lng: 76.7794 },
                zoom: 11,
                mapTypeControl: true,
                streetViewControl: false,
                fullscreenControl: !embedded,
                zoomControl: true,
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }]
                    }
                ]
            });

            setMapInstance(map);
        } catch (err) {
            console.error('Map Init Error:', err);
            setError('Error initializing map: ' + err.message);
        }
    }, [libLoaded, mapInstance, embedded]);

    // Add property markers
    useEffect(() => {
        if (!mapInstance || !window.google?.maps || !properties) return;

        try {
            // Clear existing markers
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];

            const bounds = new window.google.maps.LatLngBounds();
            const markers = [];

            properties.forEach(prop => {
                if (prop && prop.coords && prop.coords.lat && prop.coords.lng) {
                    const marker = new window.google.maps.Marker({
                        position: { lat: prop.coords.lat, lng: prop.coords.lng },
                        map: mapInstance,
                        title: prop.title,
                        animation: window.google.maps.Animation.DROP,
                        icon: {
                            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
                                    <path fill="#1e40af" stroke="#fff" stroke-width="2" d="M16 0C7.2 0 0 7.2 0 16c0 12 16 26 16 26s16-14 16-26c0-8.8-7.2-16-16-16z"/>
                                    <circle cx="16" cy="16" r="6" fill="#fff"/>
                                </svg>
                            `),
                            scaledSize: new window.google.maps.Size(32, 42),
                            anchor: new window.google.maps.Point(16, 42)
                        }
                    });

                    marker.addListener('click', () => {
                        setSelectedProperty(prop);
                        mapInstance.panTo({ lat: prop.coords.lat, lng: prop.coords.lng });
                        mapInstance.setZoom(14);
                    });

                    markers.push(marker);
                    bounds.extend({ lat: prop.coords.lat, lng: prop.coords.lng });
                }
            });

            markersRef.current = markers;

            // Fit map to show all markers
            if (markers.length > 0) {
                mapInstance.fitBounds(bounds);
                // Prevent too much zoom for single marker
                const listener = window.google.maps.event.addListener(mapInstance, 'idle', () => {
                    if (mapInstance.getZoom() > 15) mapInstance.setZoom(15);
                    window.google.maps.event.removeListener(listener);
                });
            }
        } catch (err) {
            console.error('Marker Error:', err);
        }
    }, [mapInstance, properties]);

    // Cleanup
    useEffect(() => {
        return () => {
            markersRef.current.forEach(marker => marker.setMap(null));
        };
    }, []);

    const containerStyle = embedded ? {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
    } : {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 1, // Lowered from 9999 to allow overlays
        display: 'flex',
        flexDirection: 'column'
    };

    return (
        <div style={containerStyle}>
            {!embedded && (
                <div style={{
                    padding: '1rem 2rem',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    zIndex: 10
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <MapPin color="var(--color-primary)" />
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)', margin: 0 }}>
                            Interactive Property Map
                        </h2>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', backgroundColor: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                            {properties.length} Properties
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        style={{ background: '#f1f5f9', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}
                    >
                        <X size={24} color="#64748b" />
                    </button>
                </div>
            )}

            <div style={{ flex: 1, display: 'flex', position: 'relative', backgroundColor: '#f8fafc', height: embedded ? '100%' : 'auto' }}>
                {error && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        zIndex: 100,
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow-xl)'
                    }}>
                        <AlertTriangle size={48} color="#ef4444" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ marginBottom: '0.5rem' }}>Map Load Error</h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{error}</p>
                        <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reload Page</button>
                    </div>
                )}

                {!libLoaded && !error && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100, textAlign: 'center' }}>
                        <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                        <p style={{ marginTop: '1rem', color: '#64748b' }}>Loading Google Maps...</p>
                    </div>
                )}

                <div ref={mapRef} style={{ width: '100%', height: '100%', zIndex: 1, position: 'absolute', top: 0, left: 0 }} />

                {selectedProperty && (
                    <div style={{
                        position: 'absolute',
                        bottom: embedded ? '1rem' : '2rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '90%',
                        maxWidth: '400px',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        zIndex: 1000,
                        overflow: 'hidden',
                        border: '1px solid #e2e8f0',
                        animation: 'slideUp 0.3s ease'
                    }}>
                        <style>{`@keyframes slideUp { from { transform: translate(-50%, 100%); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }`}</style>
                        <img
                            src={selectedProperty.image}
                            alt={selectedProperty.title}
                            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                        />
                        <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.2rem', color: '#1e293b' }}>{selectedProperty.title}</h3>
                                <button onClick={() => setSelectedProperty(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}>
                                    <X size={14} />
                                </button>
                            </div>
                            <p style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1rem', margin: '2px 0' }}>{selectedProperty.price}</p>
                            <p style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>{selectedProperty.location}</p>
                            <button
                                onClick={() => onPropertySelect(selectedProperty.id)}
                                style={{
                                    marginTop: 'auto',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.4rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                )}

                {libLoaded && !selectedProperty && !error && (
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        boxShadow: 'var(--shadow-md)',
                        zIndex: 5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: '1px solid #e2e8f0'
                    }}>
                        <Info size={14} color="var(--color-primary)" />
                        Click on property pins to view details
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyMapView;
