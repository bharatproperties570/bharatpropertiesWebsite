import React from 'react';
import { Search } from 'lucide-react';
import PropertyTypeSelector from './PropertyTypeSelector';

const SearchBarOverlay = ({ onSearch }) => {
    const [searchValue, setSearchValue] = React.useState('');
    const [searchType, setSearchType] = React.useState('Buy');

    return (
        <div style={{
            position: 'relative',
            marginTop: '-80px', // Pull up to overlap both sections
            marginBottom: '3rem',
            zIndex: 10
        }}>
            <div className="container">
                <div style={{
                    maxWidth: '850px',
                    margin: '0 auto',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {/* Search Tabs (Buy/Rent/Lease) */}
                    <div style={{
                        display: 'flex',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        borderRadius: '20px 20px 0 0',
                        overflow: 'hidden',
                        marginBottom: '-1px',
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

                    {/* Search Form */}
                    <form
                        onSubmit={(e) => { e.preventDefault(); onSearch(searchValue); }}
                        style={{
                            backgroundColor: 'white',
                            padding: '0.5rem',
                            borderRadius: '8px',
                            borderTopLeftRadius: searchType === 'Buy' ? '0' : '8px',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        {/* Property Type Dropdown */}
                        <div style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <PropertyTypeSelector onSelectionChange={(data) => console.log(data)} />
                        </div>

                        {/* Search Input */}
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
                                    color: 'var(--color-text-main)'
                                }}
                            />
                        </div>

                        {/* Search Button */}
                        <button type="submit" style={{
                            backgroundColor: 'var(--color-accent)',
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

export default SearchBarOverlay;
