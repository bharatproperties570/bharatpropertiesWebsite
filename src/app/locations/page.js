/* global process */

'use client';

import React, { useEffect, useMemo } from 'react';
import Script from 'next/script';

export default function LocationsPage() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

    const configuration = useMemo(() => ({
        "locations": [
            { "title": "Bharat Properties", "address1": "PR 7, Airport Road", "address2": "Mohali, Punjab, India", "coords": { "lat": 30.6327022, "lng": 76.7663162 } },
            { "title": "Bharat Properties", "address1": "Sector 3 Market", "address2": "Kurukshetra, Haryana, India", "coords": { "lat": 29.9602037, "lng": 76.8899997 }, "placeId": "ChIJKzFpydBGDjkRbTCco1_G2I4" }
        ],
        "mapOptions": { "center": { "lat": 30.3, "lng": 76.8 }, "fullscreenControl": true, "mapTypeControl": false, "streetViewControl": false, "zoom": 8, "zoomControl": true, "maxZoom": 17, "mapId": "" },
        "mapsApiKey": apiKey,
        "capabilities": { "input": true, "autocomplete": true, "directions": true, "distanceMatrix": true, "details": true, "actions": false }
    }), [apiKey]);

    useEffect(() => {
        const configureLocator = async () => {
            if (typeof customElements !== 'undefined') {
                try {
                    await customElements.whenDefined('gmpx-store-locator');
                    const locator = document.querySelector('gmpx-store-locator');
                    if (locator && apiKey) {
                        locator.configureFromQuickBuilder(configuration);
                    }
                } catch (error) {
                    console.error('Error configuring store locator:', error);
                }
            }
        };

        if (apiKey) {
            if (document.readyState === 'complete') {
                configureLocator();
            } else {
                window.addEventListener('load', configureLocator);
                return () => window.removeEventListener('load', configureLocator);
            }
        }
    }, [apiKey, configuration]);

    return (
        <div style={{ height: 'calc(100vh - 80px)', width: '100%', position: 'relative', marginTop: '80px', backgroundColor: '#f8fafc' }}>
            <Script
                src="https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js"
                type="module"
                strategy="afterInteractive"
            />
            
            <style jsx global>{`
                gmpx-store-locator {
                    width: 100%;
                    height: 100%;
                    --gmpx-color-surface: #fff;
                    --gmpx-color-on-surface: #212121;
                    --gmpx-color-on-surface-variant: #757575;
                    --gmpx-color-primary: #1967d2;
                    --gmpx-color-outline: #e0e0e0;
                    --gmpx-fixed-panel-width-row-layout: 28.5em;
                    --gmpx-fixed-panel-height-column-layout: 65%;
                    --gmpx-font-family-base: "Outfit", sans-serif;
                    --gmpx-font-family-headings: "Outfit", sans-serif;
                    --gmpx-font-size-base: 0.875rem;
                    --gmpx-hours-color-open: #188038;
                    --gmpx-hours-color-closed: #d50000;
                    --gmpx-rating-color: #ffb300;
                    --gmpx-rating-color-empty: #e0e0e0;
                }
            `}</style>

            {apiKey ? (
                <div 
                    style={{ width: '100%', height: '100%' }}
                    dangerouslySetInnerHTML={{
                        __html: `
                            <gmpx-api-loader 
                                key="${apiKey}" 
                                solution-channel="GMP_QB_locatorplus_v11_cABCDE"
                            ></gmpx-api-loader>
                            <gmpx-store-locator map-id="DEMO_MAP_ID"></gmpx-store-locator>
                        `
                    }}
                />
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <p>Google Maps API Key missing. Please check your environment variables.</p>
                </div>
            )}
        </div>
    );
}
