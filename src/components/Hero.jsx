import React from 'react';
import { Search } from 'lucide-react';
import PropertyTypeSelector from './PropertyTypeSelector';

const Hero = ({ onSearch, city }) => {
    const [searchValue, setSearchValue] = React.useState('');
    const [searchType, setSearchType] = React.useState('Buy'); // Buy, Rent, Commercial

    return (
        <div style={{
            position: 'relative',
            height: '80vh', // Slightly shorter for inner pages
            minHeight: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            marginTop: '-80px',
            overflow: 'hidden'
        }}>
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    minWidth: '100%',
                    minHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    transform: 'translate(-50%, -50%)',
                    objectFit: 'cover',
                    zIndex: 0
                }}
            >
                <source src="https://cdn.pixabay.com/video/2025/03/04/262412_large.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '850px' }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)', // Smaller than BrandHero
                    marginBottom: '2rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                    Find Properties in {city || 'Your Dream Location'}
                </h1>

                {/* Search Bar Container */}
                <div style={{
                    maxWidth: '850px',
                    margin: '0 auto',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {/* Search Tabs (Buy/Rent/Commercial) - 99acres style */}
                    <div style={{
                        display: 'flex',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        borderRadius: '20px 20px 0 0',
                        overflow: 'hidden',
                        marginBottom: '-1px', // overlap for seamless look
                        zIndex: 2,
                        width: 'fit-content'
                    }}>
                        {['Buy', 'Rent', 'Lease'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setSearchType(type)}
                                style={{
                                    padding: '0.5rem 1.5rem',
                                    border: 'none',
                                    backgroundColor: searchType === type ? 'white' : 'transparent',
                                    color: searchType === type ? 'var(--color-primary)' : 'white',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    borderRadius: searchType === type ? '10px 10px 0 0' : '0'
                                }}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <form
                        onSubmit={(e) => { e.preventDefault(); onSearch(searchValue); }}
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            flexWrap: 'wrap',
                            gap: '0.75rem',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        {/* Property Type Dropdown Segment */}
                        <div style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderRadius: 'var(--radius-md)',
                            padding: '0 0.5rem'
                        }}>
                            <PropertyTypeSelector onSelectionChange={(data) => console.log(data)} />
                        </div>

                        {/* Search Input Segment */}
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <input
                                type="text"
                                placeholder="Search for locality, landmark, project..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    color: 'white',
                                    backgroundColor: 'transparent'
                                }}
                            />
                        </div>

                        {/* Search Button */}
                        <button type="submit" style={{
                            backgroundColor: 'var(--color-accent)', // Use accent color (e.g., Orange/Green) for high contrast action
                            color: 'white',
                            padding: '0.75rem 2.5rem',
                            borderRadius: '50px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            height: '50px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'transform 0.2s',
                            whiteSpace: 'nowrap'
                        }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Search
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Hero;
