import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import logo from '../assets/logo.png';

const CITY_PROJECTS = {
    'Chandigarh': ['Chandigarh Heights', 'The Chandigarh Crown', 'City Center'],
    'Mohali': ['Mohali Hills', 'Airport Road Towers', 'Sector 82 Plazas'],
    'Panchkula': ['Panchkula Eco City', 'Valley View', 'Riverdale'],
    'Kurukshetra': ['Divine City', 'Brahma Residency'],
    'Karnal': ['Karnal Lake View', 'Smart City Hub'],
    'Ambala': ['Ambala Cantt Homes', 'Model Town Villas'],
    'Gurgaon': ['Cyber City Lofts', 'Golf Course Extn', 'Sky High Apartments'],
    'Faridabad': ['Town Park Lands', 'Smart Fari Estate'],
    'Panipat': ['Textile City Homes', 'Panipat Green'],
    'Yamunanagar': ['Yamuna Enclave', 'Twin City Towers']
};

const CITY_PROPERTIES = {
    'Chandigarh': ['Luxury Plot in Phase 1', '3 BHK Villa', 'Modern Flat'],
    'Mohali': ['3 BHK Flat Sector 82', 'Commercial Booth', 'Studio Unit'],
    'Panchkula': ['Independent Floor', 'Sector 20 Plot', 'Luxury Penthouse'],
    'Kurukshetra': ['1 SP Corner House', 'Studio Apartment', 'Residential Plot'],
    'Karnal': ['2 BHK Apartment', 'Model Town Plot'],
    'Ambala': ['City Plot', 'Double Storey House'],
    'Gurgaon': ['3 BHK Sky Home', 'Luxury Villa'],
    'Faridabad': ['Industrial Plot', 'Sector 15 Flat'],
    'Panipat': ['Model Town Plot', 'Shop in Market'],
    'Yamunanagar': ['Residential Plot', 'New Colony House']
};

const Header = ({ onLogoClick, selectedCity, onSelectCity, onPostProperty, onBookConsultation, onAboutClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 2000,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
        boxShadow: isScrolled ? 'var(--glass-shadow)' : 'none',
        padding: isScrolled ? '0.75rem 0' : '1.25rem 0',
        color: isScrolled ? 'var(--color-primary)' : 'var(--color-bg-white)',
    };

    const navLinkStyles = {
        color: 'inherit',
        fontWeight: 500,
        fontSize: '0.95rem',
        transition: 'color 0.2s',
    };

    return (
        <header style={headerStyles}>
            <style>{`
                .dropdown:hover .dropdown-content { display: flex !important; }
                .submenu-trigger:hover .submenu-content { display: flex !important; }
                .dropdown-item:hover { background-color: var(--color-bg-light); color: var(--color-primary) !important; }
            `}</style>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo */}
                <div
                    onClick={onLogoClick}
                    role="button"
                    aria-label="Bharat Properties Home"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <img src={logo} alt="" style={{ height: '70px', width: 'auto' }} aria-hidden="true" />
                    <span>Bharat Properties</span>
                </div>

                {/* Desktop Nav */}
                <nav style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="desktop-nav">

                    {selectedCity ? (
                        /* PROJECTS DROPDOWN (Shown when a city is selected) - Context Aware */
                        <div className="dropdown" style={{ position: 'relative' }}>
                            <button style={{ ...navLinkStyles, background: 'none', border: 'none', cursor: 'pointer' }}>
                                Projects in {selectedCity}
                            </button>
                            <div className="dropdown-content" style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                backgroundColor: 'white',
                                minWidth: '240px',
                                boxShadow: 'var(--shadow-lg)',
                                borderRadius: 'var(--radius-md)',
                                padding: '0.5rem',
                                display: 'none',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                color: 'var(--color-text-main)'
                            }}>
                                {CITY_PROJECTS[selectedCity]?.map(project => (
                                    <a key={project} href="#" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'inherit', transition: 'background 0.2s', fontSize: '0.9rem' }} className="dropdown-item">
                                        {project}
                                    </a>
                                )) || <div style={{ padding: '0.5rem' }}>No projects listed</div>}
                            </div>
                        </div>
                    ) : (
                        /* MAIN PROJECTS DROPDOWN (Shown on Home) - Nested */
                        <div className="dropdown" style={{ position: 'relative' }}>
                            <button style={{ ...navLinkStyles, background: 'none', border: 'none', cursor: 'pointer' }}>
                                Projects
                            </button>
                            <div className="dropdown-content" style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                backgroundColor: 'white',
                                minWidth: '260px',
                                boxShadow: 'var(--shadow-lg)',
                                borderRadius: 'var(--radius-md)',
                                padding: '0.5rem',
                                display: 'none',
                                flexDirection: 'column',
                                color: 'var(--color-text-main)'
                            }}>
                                {Object.keys(CITY_PROJECTS).map(city => (
                                    <div key={city} className="submenu-trigger" style={{ position: 'relative' }}>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (onSelectCity) onSelectCity(city);
                                            }}
                                            style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'inherit', transition: 'background 0.2s', fontSize: '0.9rem', cursor: 'pointer' }}
                                            className="dropdown-item"
                                        >
                                            Projects in {city}
                                            <span style={{ fontSize: '0.8em', opacity: 0.5 }}>▶</span>
                                        </a>

                                        {/* Nested Submenu */}
                                        <div className="submenu-content" style={{
                                            position: 'absolute',
                                            left: '95%',
                                            top: 0,
                                            backgroundColor: 'white',
                                            minWidth: '220px',
                                            boxShadow: 'var(--shadow-lg)',
                                            borderRadius: 'var(--radius-md)',
                                            padding: '0.5rem',
                                            display: 'none',
                                            flexDirection: 'column',
                                            zIndex: 1001
                                        }}>
                                            {CITY_PROJECTS[city].map(project => (
                                                <a key={project} href="#" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'inherit', transition: 'background 0.2s', fontSize: '0.9rem' }} className="dropdown-item">
                                                    {project}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PROPERTIES DROPDOWN */}
                    {selectedCity ? (
                        <div className="dropdown" style={{ position: 'relative' }}>
                            <button style={{ ...navLinkStyles, background: 'none', border: 'none', cursor: 'pointer' }}>
                                Properties in {selectedCity}
                            </button>
                            <div className="dropdown-content" style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                backgroundColor: 'white',
                                minWidth: '240px',
                                boxShadow: 'var(--shadow-lg)',
                                borderRadius: 'var(--radius-md)',
                                padding: '0.5rem',
                                display: 'none',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                color: 'var(--color-text-main)'
                            }}>
                                {CITY_PROPERTIES[selectedCity]?.map(prop => (
                                    <a key={prop} href="#" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'inherit', transition: 'background 0.2s', fontSize: '0.9rem' }} className="dropdown-item">
                                        {prop}
                                    </a>
                                )) || <div style={{ padding: '0.5rem' }}>No properties listed</div>}
                            </div>
                        </div>
                    ) : (
                        <div className="dropdown" style={{ position: 'relative' }}>
                            <button style={{ ...navLinkStyles, background: 'none', border: 'none', cursor: 'pointer' }}>
                                Properties
                            </button>
                            <div className="dropdown-content" style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                backgroundColor: 'white',
                                minWidth: '260px',
                                boxShadow: 'var(--shadow-lg)',
                                borderRadius: 'var(--radius-md)',
                                padding: '0.5rem',
                                display: 'none',
                                flexDirection: 'column',
                                color: 'var(--color-text-main)'
                            }}>
                                {Object.keys(CITY_PROPERTIES).map(city => (
                                    <div key={city} className="submenu-trigger" style={{ position: 'relative' }}>
                                        <a
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); if (onSelectCity) onSelectCity(city); }}
                                            style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'inherit', transition: 'background 0.2s', fontSize: '0.9rem', cursor: 'pointer' }}
                                            className="dropdown-item"
                                        >
                                            In {city}
                                            <span style={{ fontSize: '0.8em', opacity: 0.5 }}>▶</span>
                                        </a>

                                        <div className="submenu-content" style={{
                                            position: 'absolute',
                                            left: '95%',
                                            top: 0,
                                            backgroundColor: 'white',
                                            minWidth: '220px',
                                            boxShadow: 'var(--shadow-lg)',
                                            borderRadius: 'var(--radius-md)',
                                            padding: '0.5rem',
                                            display: 'none',
                                            flexDirection: 'column',
                                            zIndex: 1001
                                        }}>
                                            {CITY_PROPERTIES[city].map(prop => (
                                                <a key={prop} href="#" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'inherit', transition: 'background 0.2s', fontSize: '0.9rem' }} className="dropdown-item">
                                                    {prop}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <a
                        href="#about"
                        style={navLinkStyles}
                        onClick={(e) => {
                            e.preventDefault();
                            onAboutClick();
                        }}
                    >
                        About
                    </a>
                    <a href="#contact" style={navLinkStyles}>Contact</a>
                    <button
                        onClick={onBookConsultation}
                        className="btn-calendar"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: '#EEF2FF',
                            color: 'var(--color-primary)',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '50px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            border: '2px solid #E0E7FF',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#EEF2FF';
                            e.currentTarget.style.borderColor = '#E0E7FF';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <Calendar size={18} />
                        Book Consultation
                    </button>

                    <button
                        onClick={onPostProperty}
                        style={{
                            backgroundColor: 'white',
                            color: 'var(--color-primary)',
                            padding: '0.5rem 1.25rem',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 700,
                            border: '2px solid var(--color-primary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'var(--color-primary)';
                            e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.color = 'var(--color-primary)';
                        }}
                    >
                        🏘️ Post Property
                    </button>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{ display: 'block', color: 'inherit', background: 'none' }}
                    className="mobile-toggle"
                    aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    backgroundColor: 'white',
                    padding: '1rem',
                    boxShadow: 'var(--shadow-lg)',
                    color: 'var(--color-text-main)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <a href="#featured" onClick={() => setIsMobileMenuOpen(false)}>Properties</a>
                    <a
                        href="#about"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsMobileMenuOpen(false);
                            onAboutClick();
                        }}
                    >
                        About
                    </a>
                    <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                </div>
            )}

            <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .dropdown:hover .dropdown-content { display: flex !important; }
          .dropdown-item:hover { background-color: var(--color-bg-light); color: var(--color-primary); }
        }
      `}</style>
        </header>
    );
};

export default Header;
