import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Info, X, AlertTriangle } from 'lucide-react';

const PropertyMapView = ({ properties = [], onPropertySelect, onClose }) => {
    const mapRef = useRef(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [libLoaded, setLibLoaded] = useState(!!window.L);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadLeaflet = () => {
            if (window.L) {
                if (isMounted) setLibLoaded(true);
                return;
            }

            // CSS
            if (!document.getElementById('leaflet-css')) {
                const link = document.createElement('link');
                link.id = 'leaflet-css';
                link.rel = 'stylesheet';
                link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                document.head.appendChild(link);
            }

            // JS
            if (!document.getElementById('leaflet-js')) {
                const script = document.createElement('script');
                script.id = 'leaflet-js';
                script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                script.async = true;
                script.onload = () => {
                    if (isMounted) {
                        console.log('Leaflet Script Loaded');
                        setLibLoaded(true);
                    }
                };
                script.onerror = () => {
                    if (isMounted) setError('Failed to load map library');
                };
                document.body.appendChild(script);
            } else {
                const interval = setInterval(() => {
                    if (window.L) {
                        if (isMounted) setLibLoaded(true);
                        clearInterval(interval);
                    }
                }, 100);
            }
        };

        loadLeaflet();
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        if (!libLoaded || !mapRef.current || mapInstance || !window.L) return;

        try {
            if (window.L.Icon.Default) {
                delete window.L.Icon.Default.prototype._getIconUrl;
                window.L.Icon.Default.mergeOptions({
                    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                });
            }

            const map = window.L.map(mapRef.current, {
                center: [30.7333, 76.7794],
                zoom: 11,
                zoomControl: false
            });

            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap'
            }).addTo(map);

            window.L.control.zoom({ position: 'bottomright' }).addTo(map);

            setMapInstance(map);
        } catch (err) {
            console.error('Map Init Error:', err);
            setError('Error initializing map: ' + err.message);
        }
    }, [libLoaded, mapInstance]);

    useEffect(() => {
        if (!mapInstance || !window.L || !properties) return;

        try {
            mapInstance.eachLayer((layer) => {
                if (layer instanceof window.L.Marker) {
                    mapInstance.removeLayer(layer);
                }
            });

            const markers = [];
            properties.forEach(prop => {
                if (prop && prop.coords && prop.coords.lat && prop.coords.lng) {
                    const marker = window.L.marker([prop.coords.lat, prop.coords.lng])
                        .addTo(mapInstance)
                        .on('click', () => {
                            setSelectedProperty(prop);
                            mapInstance.setView([prop.coords.lat, prop.coords.lng], 14, { animate: true });
                        });
                    markers.push(marker);
                }
            });

            if (markers.length > 0) {
                const group = new window.L.featureGroup(markers);
                mapInstance.fitBounds(group.getBounds().pad(0.2));
            }
        } catch (err) {
            console.error('Marker Error:', err);
        }
    }, [mapInstance, properties]);

    useEffect(() => {
        return () => {
            if (mapInstance) {
                mapInstance.off();
                mapInstance.remove();
            }
        };
    }, [mapInstance]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column'
        }}>
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

            <div style={{ flex: 1, display: 'flex', position: 'relative', backgroundColor: '#f8fafc' }}>
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
                        <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px' }}>Reload Page</button>
                    </div>
                )}

                {!libLoaded && !error && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
                        <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                        <p style={{ marginTop: '1rem', color: '#64748b' }}>Loading Map...</p>
                    </div>
                )}

                <div ref={mapRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

                {selectedProperty && (
                    <div style={{
                        position: 'absolute',
                        bottom: '2rem',
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
                        Explore pins on the map
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyMapView;
