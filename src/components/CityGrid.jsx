import React from 'react';
import { CITY_DATA } from '../data/cityData';
import { ArrowRight } from 'lucide-react';
import './CityTicker.css';

const CityGrid = ({ onSelectCity }) => {
    const track = [...CITY_DATA, ...CITY_DATA];

    const CityCard = ({ city }) => (
        <div
            className="city-card-ticker"
            onClick={() => onSelectCity(city.name)}
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
        <section id="cities" style={{ padding: '5rem 0', backgroundColor: 'white', overflow: 'hidden' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: '#0F172A', letterSpacing: '-0.02em' }}>
                        Explore Our <span style={{ color: 'var(--color-primary)' }}>Prime Locations</span>
                    </h2>
                    <p style={{ color: '#64748B', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
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
