import React from 'react';
import { ArrowRight } from 'lucide-react';

const CITIES = [
    { name: 'Chandigarh', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'The City Beautiful' },
    { name: 'Mohali', image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'IT Hub of Punjab' },
    { name: 'Panchkula', image: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Scenic Peace' },
    { name: 'Zirakpur', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Gateway to Chandigarh' },
    { name: 'Kharar', image: 'https://images.unsplash.com/photo-1516156008625-3a9d60da923c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Emerging Market' },
    { name: 'New Chandigarh', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Smart City' },
];

const CityGrid = ({ onSelectCity }) => {
    return (
        <section id="cities" style={{ padding: '5rem 0', backgroundColor: 'white' }}>
            <div className="container reveal">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                        Select Your Location
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                        Choose a city to view exclusive properties and active projects.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {CITIES.map(city => (
                        <div
                            key={city.name}
                            onClick={() => onSelectCity(city.name)}
                            style={{
                                position: 'relative',
                                height: '280px',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                boxShadow: 'var(--shadow-lg)',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                            className="city-card reveal"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.02) translateY(-10px)';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1.1)';
                                e.currentTarget.querySelector('.city-glass').style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                                e.currentTarget.querySelector('.city-glass').style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            }}
                        >
                            <img
                                src={city.image}
                                alt={city.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.2) 60%, transparent)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: '2rem'
                            }}>
                                <div className="city-glass" style={{
                                    padding: '1.25rem',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    transition: 'background-color 0.3s ease'
                                }}>
                                    <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{city.name}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                                        {city.description} <ArrowRight size={18} style={{ color: 'var(--color-gold)' }} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CityGrid;
