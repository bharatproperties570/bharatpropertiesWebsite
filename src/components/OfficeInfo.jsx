"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation } from 'lucide-react';
import Script from 'next/script';

const OfficeInfo = () => {
    const kkrGMapLink = "https://www.google.com/maps/dir//Bharat+Properties,+Sector+3+Market,+Sector+30,+Sector+3,+Kurukshetra,+Haryana+136118,+India/@29.9490011,76.8836256,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x390e46d0c969312b:0x8ed8c65fa39c306d!2m2!1d76.8899997!2d29.9602037";
    const mohaliGMapLink = "https://maps.app.goo.gl/SrXsJrh5L23qLEtM6";

    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    const LOCATOR_CONFIG = {
        "locations": [
            {
                "title": "Bharat Properties - Kurukshetra (HQ)",
                "address1": "Shop No 166, Sector 3 Market",
                "address2": "Kurukshetra, Haryana 136118",
                "coords": { "lat": 29.9602037, "lng": 76.8899997 },
                "placeId": "ChIJIzFpydBGDjkRbTCZol_G2I8"
            },
            {
                "title": "Bharat Properties - Mohali",
                "address1": "Airport Road, Sector 82 Industrial Area",
                "address2": "Mohali, Punjab",
                "coords": { "lat": 30.6661, "lng": 76.7414 }
            }
        ],
        "mapOptions": {
            "center": { "lat": 30.3, "lng": 76.8 },
            "zoom": 8,
            "mapId": "DEMO_MAP_ID"
        },
        "mapsApiKey": GOOGLE_MAPS_API_KEY,
        "capabilities": { "input": true, "autocomplete": true, "directions": true, "distanceMatrix": true, "details": true, "actions": false }
    };

    const locatorHtml = `
      <gmpx-api-loader key="${GOOGLE_MAPS_API_KEY}" solution-id="V9667X"></gmpx-api-loader>
      <gmpx-store-locator style="width: 100%; height: 100%; --gmpx-color-surface: #ffffff; --gmpx-color-on-surface: #1a1a1b; --gmpx-color-primary: #1a1b3a; --gmpx-color-on-primary: #ffffff; --gmpx-font-family-base: 'Outfit', sans-serif; --gmpx-font-family-headings: 'Outfit', sans-serif;"></gmpx-store-locator>
      <script>
        (async () => {
          const locator = document.querySelector('gmpx-store-locator');
          const config = ${JSON.stringify(LOCATOR_CONFIG)};
          if (locator) {
            await customElements.whenDefined('gmpx-store-locator');
            if (typeof locator.configureFromQuickBuilder === 'function') {
              locator.configureFromQuickBuilder(config);
            } else if (typeof locator.configure === 'function') {
              locator.configure(config);
            }
          }
        })();
      </script>
    `;

    return (
        <section style={{ 
            padding: '5rem 0', 
            background: 'var(--color-bg-light)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Script 
                src="https://unpkg.com/@googlemaps/extended-component-library@0.6.11/dist/index.min.js"
                strategy="afterInteractive"
                type="module"
            />
            {/* ... rest of the section ... */}
            <div className="container">
                {/* ... header ... */}
                <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{ 
                        background: 'var(--grad-gold)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent', 
                        fontWeight: 800, 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.2em',
                        fontSize: '0.9rem',
                        display: 'inline-block',
                        marginBottom: '1rem'
                    }}>Our Headquarters {/* v2.1-BP */}</span>
                    
                    <h2 style={{ 
                        fontSize: '3.5rem', 
                        fontFamily: 'var(--font-heading)', 
                        color: 'var(--color-primary)', 
                        lineHeight: 1.2, 
                        letterSpacing: '-0.03em',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        Let's Start Your <span className="gradient-text">Journey Home</span>
                    </h2>
                </div>

                <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'start' }}>

                    {/* Left Side: Interactive Map */}
                    <div className="hover-lift" style={{ position: 'relative' }}>
                        <div style={{
                            height: '520px',
                            borderRadius: '2.5rem',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: 'var(--shadow-premium)',
                            background: '#f8f9fa',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            {GOOGLE_MAPS_API_KEY ? (
                                <div 
                                    style={{ width: '100%', height: '100%' }}
                                    dangerouslySetInnerHTML={{ __html: locatorHtml }}
                                />
                            ) : (
                                <div style={{ 
                                    padding: '2rem', 
                                    textAlign: 'center', 
                                    height: '100%', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <MapPin size={48} color="var(--color-accent)" />
                                    <h3 style={{ color: 'var(--color-primary)' }}>Find Us on Map</h3>
                                    <p style={{ color: 'var(--color-text-muted)', maxWidth: '300px' }}>
                                        Visit our offices in Mohali and Kurukshetra.
                                    </p>
                                    <a href={kkrGMapLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                                        View on Google Maps
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Contact Cards */}
                    <div>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {/* Kurukshetra Office Card */}
                            <div className="glass-premium hover-lift reveal stagger-delay-1" style={{ 
                                padding: '2rem', 
                                borderRadius: '2rem', 
                                border: '1px solid rgba(255,255,255,0.6)',
                                display: 'grid',
                                gridTemplateColumns: 'auto 1fr',
                                gap: '1.5rem',
                                alignItems: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ 
                                    background: 'var(--grad-premium)', 
                                    width: '60px', 
                                    height: '60px', 
                                    borderRadius: '1.25rem', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: 'white',
                                    boxShadow: 'var(--shadow-lg)'
                                }}>
                                    <MapPin size={28} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    <h4 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-primary)' }}>Kurukshetra</h4>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.5, opacity: 0.9 }}>
                                        Shop No 166, Sector 3 Market,<br />
                                        Kurukshetra, Haryana 136118
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.75rem' }}>
                                        <a href="tel:+919991333570" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <Phone size={18} fill="currentColor" /> +91 99913 33570
                                        </a>
                                        <a href={kkrGMapLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <Navigation size={18} fill="currentColor" /> Map
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Mohali Office Card */}
                            <div className="glass-premium hover-lift reveal stagger-delay-2" style={{ 
                                padding: '2rem', 
                                borderRadius: '2rem', 
                                border: '1px solid rgba(255,255,255,0.6)',
                                display: 'grid',
                                gridTemplateColumns: 'auto 1fr',
                                gap: '1.5rem',
                                alignItems: 'center'
                            }}>
                                <div style={{ 
                                    background: 'var(--grad-indigo)', 
                                    width: '60px', 
                                    height: '60px', 
                                    borderRadius: '1.25rem', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: 'white',
                                    boxShadow: 'var(--shadow-lg)'
                                }}>
                                    <MapPin size={28} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    <h4 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-secondary)' }}>Mohali</h4>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.5 }}>
                                        Airport Road, Sector 82 Industrial Area,<br />
                                        Mohali, Punjab
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.75rem' }}>
                                        <a href="tel:+919991000570" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <Phone size={18} fill="currentColor" /> +91 99910 00570
                                        </a>
                                        <a href={mohaliGMapLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <Navigation size={18} fill="currentColor" /> Map
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-premium reveal stagger-delay-3" style={{ 
                            marginTop: '2rem', 
                            display: 'inline-flex', 
                            gap: '1.25rem', 
                            alignItems: 'center', 
                            padding: '1rem 2rem',
                            borderRadius: '2.5rem',
                            border: '1px solid rgba(255,255,255,0.4)',
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            <Clock color="var(--color-accent)" size={24} />
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', fontWeight: 500 }}>
                                <strong style={{ color: 'var(--color-primary)' }}>Consultation Hours:</strong> Mon - Sat: 10AM - 7PM
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
};

export default OfficeInfo;
