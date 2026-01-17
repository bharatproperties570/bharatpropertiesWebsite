import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const PROPERTY_STRUCTURE = {
    'Residential': [
        'Plot', 'House', 'Flat', 'Builder Floor'
    ],
    'Commercial': [
        'Shop', 'Showroom', 'Office Space', 'Retail Store', 'Soho', 'Executive Room', 'Plot', 'Multiplex', 'Virtual Space'
    ],
    'Agricultural': [
        'Land', 'Farm House'
    ],
    'Industrial': [
        'Plot', 'Warehouse', 'Cold Storage', 'Rice Seller', 'Building', 'Factory'
    ],
    'Institutional': [
        'School', 'Hotel', 'Universities', 'Hospital', 'College'
    ]
};

const PropertyTypeSelector = ({ onSelectionChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Residential');
    const [selectedSubTypes, setSelectedSubTypes] = useState([]);
    const dropdownRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleSubType = (subType) => {
        setSelectedSubTypes(prev => {
            const newSelection = prev.includes(subType)
                ? prev.filter(t => t !== subType)
                : [...prev, subType];

            // Notify parent
            if (onSelectionChange) {
                onSelectionChange({ category: activeCategory, subTypes: newSelection });
            }
            return newSelection;
        });
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setSelectedSubTypes([]); // clear subtypes
        if (onSelectionChange) {
            onSelectionChange({ category: category, subTypes: [] });
        }
    };

    const getDisplayLabel = () => {
        if (selectedSubTypes.length > 0) {
            if (selectedSubTypes.length === 1) return `${activeCategory} > ${selectedSubTypes[0]}`;
            return `${activeCategory} (${selectedSubTypes.length} Selected)`;
        }
        return `All ${activeCategory}`;
    };

    return (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minWidth: '220px',
                    padding: '0 1rem',
                    height: '100%',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRight: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    gap: '0.5rem'
                }}
            >
                <span style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '180px',
                    textAlign: 'left'
                }}>
                    {getDisplayLabel()}
                </span>
                <ChevronDown size={16} color="#64748b" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '120%',
                    left: 0,
                    width: '600px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    zIndex: 100,
                    display: 'flex',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0'
                }}>
                    {/* Sidebar: Categories */}
                    <div style={{
                        width: '35%',
                        backgroundColor: '#f8fafc',
                        borderRight: '1px solid #e2e8f0',
                        padding: '1rem 0'
                    }}>
                        {Object.keys(PROPERTY_STRUCTURE).map(category => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => handleCategoryChange(category)}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: activeCategory === category ? 'white' : 'transparent',
                                    color: activeCategory === category ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                    fontWeight: activeCategory === category ? 700 : 500,
                                    border: 'none',
                                    borderLeft: activeCategory === category ? '4px solid var(--color-primary)' : '4px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Content: Checkboxes */}
                    <div style={{ width: '65%', padding: '1.5rem' }}>
                        <h4 style={{
                            marginBottom: '1rem',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            color: 'var(--color-text-muted)'
                        }}>
                            Select {activeCategory} Type
                        </h4>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            {(PROPERTY_STRUCTURE[activeCategory] || []).map(subType => {
                                const isSelected = selectedSubTypes.includes(subType);
                                return (
                                    <label
                                        key={subType}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.6rem',
                                            cursor: 'pointer',
                                            fontSize: '0.95rem',
                                            color: isSelected ? 'var(--color-primary)' : 'var(--color-text-main)',
                                            fontWeight: isSelected ? 600 : 400
                                        }}
                                    >
                                        <div style={{
                                            width: '18px',
                                            height: '18px',
                                            border: isSelected ? 'none' : '2px solid #cbd5e1',
                                            backgroundColor: isSelected ? 'var(--color-primary)' : 'white',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.2s'
                                        }}>
                                            {isSelected && <Check size={12} color="white" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => toggleSubType(subType)}
                                            style={{ display: 'none' }}
                                        />
                                        {subType}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyTypeSelector;
