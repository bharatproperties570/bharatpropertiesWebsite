'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useGlobal } from '../context/GlobalContext';
import { CITY_DATA } from '../data/cityData';
import { ArrowRight } from 'lucide-react';
import './CityTicker.css';

const CityGrid = ({ onSelectCity }) => {
    const router = useRouter();
    const { setSelectedCity } = useGlobal();
    const track = [...CITY_DATA, ...CITY_DATA];

    const handleCityClick = (cityName) => {
        if (onSelectCity) {
            onSelectCity(cityName);
        } else {
            setSelectedCity(cityName);
            router.push(`/city/${encodeURIComponent(cityName)}`);
        }
    };

    const CityCard = ({ city }) => (
        <div
            className="city-card-ticker"
            onClick={() => handleCityClick(city.name)}
        >
            <img src={city.image} alt={city.name} loading="lazy" />
            <div className="city-card-overlay">
                <h3>{city.name}</h3>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {city.description} <ArrowRight size={16} />
                </p>
            </div>
        </div>
    );

    const [isPaused, setIsPaused] = React.useState(false);
    const pauseTimer = React.useRef(null);

    const handleMouseEnter = () => {
        pauseTimer.current = setTimeout(() => {
            setIsPaused(true);
        }, 10000); // 10 second delay as requested
    };

    const handleMouseLeave = () => {
        if (pauseTimer.current) {
            clearTimeout(pauseTimer.current);
            pauseTimer.current = null;
        }
        setIsPaused(false);
    };

    return (
        <section id="cities" style={{ padding: 'var(--spacing-lg) 0', backgroundColor: 'white', overflow: 'hidden' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
                        Explore Our <span style={{ color: 'var(--color-accent)' }}>Prime Locations</span>
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        Browse through our curated collection of properties across India's most vibrant cities.
                    </p>
                </div>
            </div>

            <div
                className="ticker-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="ticker-row">
                    <div className={`ticker-track ${isPaused ? 'paused' : ''}`} style={{ '--speed': '80s' }}>
                        {track.map((city, idx) => (
                            <CityCard key={`${city.name}-${idx}`} city={city} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CityGrid;
