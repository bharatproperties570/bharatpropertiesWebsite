import React, { useState } from 'react';
import { X, CheckCircle, IndianRupee, MapPin, User, Building2, Tag, Ruler } from 'lucide-react';
import { countryCodes } from '../data/countryCodes';

const PostPropertyForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        availableFor: 'Sale',
        city: 'Kurukshetra',
        project: 'Divine City',
        block: 'First Block',
        unitNo: '18 P',
        expectedPrice: '',
        type: 'calculated',
        totalArea: '250',
        areaUnit: 'Sq Yard',
        transactionType: 'Registry',
        associateWith: 'Property Owner',
        remarks: '',
        contact: {
            name: '',
            countryCode: '+91',
            mobile: '',
            email: '',
            city: ''
        }
    });

    const [submitted, setSubmitted] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);

    const unitSizes = {
        '18 P': { area: '250', unit: 'Sq Yard' },
        '45': { area: '180', unit: 'Sq Yard' },
        '112 B': { area: '320', unit: 'Sq Yard' }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    const handleUnitChange = (val) => {
        const sizeInfo = unitSizes[val] || { area: '', unit: 'Sq Yard' };
        setFormData({
            ...formData,
            unitNo: val,
            totalArea: sizeInfo.area,
            areaUnit: sizeInfo.unit
        });
    };

    const theme = {
        primary: '#2563eb',
        primaryHover: '#1d4ed8',
        surface: '#ffffff',
        background: '#f8fafc',
        border: '#e2e8f0',
        textMain: '#0f172a',
        textMuted: '#64748b',
        success: '#10b981'
    };

    const labelStyle = (isActive) => ({
        display: 'block',
        fontSize: '0.8rem',
        fontWeight: 700,
        color: isActive ? theme.primary : theme.textMuted,
        marginBottom: '0.5rem',
        transition: 'color 0.3s ease',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    });

    const inputBaseStyle = (isActive) => ({
        width: '100%',
        padding: '0.875rem 1rem',
        fontSize: '0.95rem',
        color: theme.textMain,
        backgroundColor: isActive ? theme.surface : theme.background,
        border: `1px solid ${isActive ? theme.primary : theme.border}`,
        borderRadius: '12px',
        boxShadow: isActive ? '0 0 0 4px rgba(37, 99, 235, 0.1)' : 'inset 0 2px 4px 0 rgba(0,0,0,0.02)',
        outline: 'none',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
        fontWeight: 500
    });

    const selectStyle = (isActive) => ({
        ...inputBaseStyle(isActive),
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem center',
        paddingRight: '2.5rem',
        cursor: 'pointer'
    });

    const sectionContainerStyle = {
        backgroundColor: theme.surface,
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        border: `1px solid ${theme.border}`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    };

    const sectionHeaderStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: `1px solid ${theme.border}`
    };

    const sectionTitleStyle = {
        fontSize: '1.05rem',
        fontWeight: 700,
        color: theme.textMain,
        margin: 0
    };

    const iconStyle = {
        backgroundColor: '#eff6ff',
        color: theme.primary,
        padding: '0.5rem',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    if (submitted) {
        return (
            <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.3s ease-out' }}>
                <div style={{ backgroundColor: theme.surface, padding: '3rem', borderRadius: '24px', textAlign: 'center', maxWidth: '400px', width: '90%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', animation: 'scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: '#d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <CheckCircle size={40} color={theme.success} />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: theme.textMain, marginBottom: '0.75rem' }}>Property Posted!</h2>
                    <p style={{ color: theme.textMuted, fontSize: '1rem', lineHeight: '1.5', margin: 0 }}>Success! Aapki listing Bharat Properties platform par review ke liye bhej di gayi hai. Hum aapko jald contact karenge.</p>
                </div>
                <style>{`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes scaleUp { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', padding: '1rem' }}>
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .scroll-container::-webkit-scrollbar { width: 8px; }
                .scroll-container::-webkit-scrollbar-track { background: transparent; }
                .scroll-container::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; border: 3px solid #fcfcfd; }
                .input-group { position: relative; margin-bottom: 1.25rem; }
            `}</style>

            <div style={{
                backgroundColor: theme.surface,
                width: '100%',
                maxWidth: '850px',
                height: '92vh',
                maxHeight: '900px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.4)',
                animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden'
            }}>
                <div style={{ padding: '1.5rem 2rem', background: `linear-gradient(to right, ${theme.surface}, #f8fafc)`, borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{ width: '56px', height: '56px', background: `linear-gradient(135deg, ${theme.primary}, #3b82f6)`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.4)' }}>
                            <Building2 size={28} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: theme.textMain, letterSpacing: '-0.02em' }}>Post Your Property</h2>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: theme.textMuted, fontWeight: 500 }}>Sell or Rent your property faster with Bharat Properties</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        onMouseEnter={() => setHoveredButton('close')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{ width: '44px', height: '44px', borderRadius: '50%', border: 'none', backgroundColor: hoveredButton === 'close' ? '#fee2e2' : theme.background, color: hoveredButton === 'close' ? '#ef4444' : theme.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease', outline: 'none' }}
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="scroll-container" style={{ padding: '2rem', overflowY: 'auto', flex: 1, backgroundColor: '#fcfcfd' }}>
                    <form id="property-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

                        {/* 1. Configuration */}
                        <div style={sectionContainerStyle}>
                            <div style={sectionHeaderStyle}>
                                <div style={iconStyle}><Tag size={20} /></div>
                                <h3 style={sectionTitleStyle}>Basic Configuration</h3>
                            </div>
                            <div className="input-group" style={{ marginBottom: 0 }}>
                                <label style={labelStyle(activeField === 'availableFor')}>Available For</label>
                                <select
                                    style={selectStyle(activeField === 'availableFor')}
                                    onFocus={() => setActiveField('availableFor')}
                                    onBlur={() => setActiveField(null)}
                                    value={formData.availableFor}
                                    onChange={e => setFormData({ ...formData, availableFor: e.target.value })}
                                >
                                    <option>Sale</option>
                                    <option>Rent</option>
                                </select>
                            </div>
                        </div>

                        {/* 2. Property Location */}
                        <div style={sectionContainerStyle}>
                            <div style={sectionHeaderStyle}>
                                <div style={iconStyle}><MapPin size={20} /></div>
                                <h3 style={sectionTitleStyle}>Property Location</h3>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                                <div className="input-group" style={{ marginBottom: 0 }}>
                                    <label style={labelStyle(activeField === 'city')}>City</label>
                                    <select style={selectStyle(activeField === 'city')} onFocus={() => setActiveField('city')} onBlur={() => setActiveField(null)} value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}>
                                        <option>Kurukshetra</option>
                                        <option>Ambala</option>
                                        <option>Chandigarh</option>
                                        <option>Mohali</option>
                                    </select>
                                </div>
                                <div className="input-group" style={{ marginBottom: 0 }}>
                                    <label style={labelStyle(activeField === 'project')}>Project Name</label>
                                    <select style={selectStyle(activeField === 'project')} onFocus={() => setActiveField('project')} onBlur={() => setActiveField(null)} value={formData.project} onChange={e => setFormData({ ...formData, project: e.target.value })}>
                                        <option>Divine City</option>
                                        <option>Brahma Residency</option>
                                        <option>Independent Plot</option>
                                    </select>
                                </div>
                                <div className="input-group" style={{ marginBottom: 0 }}>
                                    <label style={labelStyle(activeField === 'block')}>Block</label>
                                    <select style={selectStyle(activeField === 'block')} onFocus={() => setActiveField('block')} onBlur={() => setActiveField(null)} value={formData.block} onChange={e => setFormData({ ...formData, block: e.target.value })}>
                                        <option>First Block</option>
                                        <option>Second Block</option>
                                        <option>Third Block</option>
                                    </select>
                                </div>
                                <div className="input-group" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
                                    <label style={labelStyle(activeField === 'unitNo')}>Unit Number & Size</label>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <select
                                            style={{ ...selectStyle(activeField === 'unitNo'), flex: 1.5 }}
                                            onFocus={() => setActiveField('unitNo')}
                                            onBlur={() => setActiveField(null)}
                                            value={formData.unitNo}
                                            onChange={e => handleUnitChange(e.target.value)}
                                        >
                                            <option value="18 P">18 P</option>
                                            <option value="45">45</option>
                                            <option value="112 B">112 B</option>
                                        </select>
                                        <div style={{
                                            flex: 1,
                                            height: '46px',
                                            backgroundColor: theme.background,
                                            border: `1px dashed #94a3b8`,
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            color: theme.textMuted,
                                            fontWeight: 600,
                                            fontSize: '0.95rem'
                                        }}>
                                            <Ruler size={18} />
                                            <span>{formData.totalArea ? `${formData.totalArea} ${formData.areaUnit}` : 'Auto-filled'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Pricing & Dimensions */}
                        <div style={sectionContainerStyle}>
                            <div style={sectionHeaderStyle}>
                                <div style={iconStyle}><IndianRupee size={20} /></div>
                                <h3 style={sectionTitleStyle}>Pricing Details</h3>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                                <div className="input-group" style={{ marginBottom: 0 }}>
                                    <label style={labelStyle(activeField === 'transactionType')}>Transaction Type</label>
                                    <select style={selectStyle(activeField === 'transactionType')} onFocus={() => setActiveField('transactionType')} onBlur={() => setActiveField(null)} value={formData.transactionType} onChange={e => setFormData({ ...formData, transactionType: e.target.value })}>
                                        <option>Registry</option>
                                        <option>Transfer</option>
                                        <option>GPA</option>
                                        <option>LOI</option>
                                    </select>
                                </div>
                                <div className="input-group" style={{ marginBottom: 0 }}>
                                    <label style={labelStyle(activeField === 'associateWith')}>Associate With</label>
                                    <select style={selectStyle(activeField === 'associateWith')} onFocus={() => setActiveField('associateWith')} onBlur={() => setActiveField(null)} value={formData.associateWith} onChange={e => setFormData({ ...formData, associateWith: e.target.value })}>
                                        <option>Property Owner</option>
                                        <option>Broker</option>
                                        <option>Booked</option>
                                        <option>Relative</option>
                                        <option>Friend</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="input-group">
                                <label style={labelStyle(activeField === 'expectedPrice')}>Expected Price</label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: activeField === 'expectedPrice' ? theme.primary : theme.textMuted, transition: 'color 0.3s', display: 'flex', alignItems: 'center' }}>
                                        <IndianRupee size={20} />
                                    </div>
                                    <input
                                        style={{ ...inputBaseStyle(activeField === 'expectedPrice'), paddingLeft: '3rem', fontSize: '1.1rem', fontWeight: 700 }}
                                        type="number"
                                        placeholder="0.00"
                                        onFocus={() => setActiveField('expectedPrice')}
                                        onBlur={() => setActiveField(null)}
                                        value={formData.expectedPrice}
                                        onChange={e => setFormData({ ...formData, expectedPrice: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group" style={{ marginBottom: 0 }}>
                                <label style={labelStyle(activeField === 'remarks')}>Remarks & Description</label>
                                <textarea
                                    style={{ ...inputBaseStyle(activeField === 'remarks'), minHeight: '100px', resize: 'vertical' }}
                                    placeholder="Add features, highlights or special terms..."
                                    onFocus={() => setActiveField('remarks')}
                                    onBlur={() => setActiveField(null)}
                                    value={formData.remarks}
                                    onChange={e => setFormData({ ...formData, remarks: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* 4. Owner Details */}
                        <div style={sectionContainerStyle}>
                            <div style={sectionHeaderStyle}>
                                <div style={iconStyle}><User size={20} /></div>
                                <h3 style={sectionTitleStyle}>Owner Details</h3>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                <div className="input-group" style={{ marginBottom: 0 }}>
                                    <label style={labelStyle(activeField === 'contactName')}>Full Name</label>
                                    <div style={{ position: 'relative' }}>
                                        <input 
                                            style={{...inputBaseStyle(activeField === 'contactName'), paddingLeft: '3rem'}} 
                                            type="text" 
                                            placeholder="Rahul Sharma" 
                                            onFocus={() => setActiveField('contactName')} 
                                            onBlur={() => setActiveField(null)} 
                                            value={formData.contact.name} 
                                            onChange={e => setFormData({ ...formData, contact: { ...formData.contact, name: e.target.value } })} 
                                            required 
                                        />
                                        <User size={18} color={activeField === 'contactName' ? theme.primary : '#94a3b8'} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', transition: 'color 0.3s' }} />
                                    </div>
                                </div>
                                <div className="input-group" style={{ marginBottom: 0 }}>
                                    <label style={labelStyle(activeField === 'contactMobile')}>Mobile Number</label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <select
                                            style={{ ...selectStyle(activeField === 'contactMobile'), width: '110px', paddingRight: '1.5rem', backgroundPosition: 'right 0.25rem center', fontSize: '0.9rem' }}
                                            value={formData.contact.countryCode}
                                            onChange={e => setFormData({ ...formData, contact: { ...formData.contact, countryCode: e.target.value } })}
                                            onFocus={() => setActiveField('contactMobile')}
                                            onBlur={() => setActiveField(null)}
                                        >
                                            {countryCodes.map((item) => (
                                                <option key={`${item.country}-${item.code}`} value={item.code}>
                                                    {item.flag} {item.code}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            style={{ ...inputBaseStyle(activeField === 'contactMobile'), flex: 1 }}
                                            type="tel"
                                            placeholder="98765 43210"
                                            onFocus={() => setActiveField('contactMobile')}
                                            onBlur={() => setActiveField(null)}
                                            value={formData.contact.mobile}
                                            onChange={e => setFormData({ ...formData, contact: { ...formData.contact, mobile: e.target.value } })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                                <div className="input-group" style={{ marginBottom: 0 }}>
                                    <label style={labelStyle(activeField === 'contactEmail')}>Email Address</label>
                                    <input 
                                        style={inputBaseStyle(activeField === 'contactEmail')} 
                                        type="email" 
                                        placeholder="rahul@example.com" 
                                        onFocus={() => setActiveField('contactEmail')} 
                                        onBlur={() => setActiveField(null)} 
                                        value={formData.contact.email} 
                                        onChange={e => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })} 
                                    />
                                </div>
                                <div className="input-group" style={{ marginBottom: 0 }}>
                                    <label style={labelStyle(activeField === 'contactCity')}>City</label>
                                    <input 
                                        style={inputBaseStyle(activeField === 'contactCity')} 
                                        type="text" 
                                        placeholder="Kurukshetra" 
                                        onFocus={() => setActiveField('contactCity')} 
                                        onBlur={() => setActiveField(null)} 
                                        value={formData.contact.city} 
                                        onChange={e => setFormData({ ...formData, contact: { ...formData.contact, city: e.target.value } })} 
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div style={{ padding: '1.25rem 2rem', borderTop: `1px solid ${theme.border}`, backgroundColor: theme.surface, display: 'flex', gap: '1rem', flexShrink: 0 }}>
                    <button
                        type="button"
                        onClick={onClose}
                        onMouseEnter={() => setHoveredButton('discard')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            borderRadius: '12px',
                            border: `1px solid ${theme.border}`,
                            backgroundColor: hoveredButton === 'discard' ? theme.border : theme.surface,
                            color: theme.textMain,
                            fontWeight: 600,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            outline: 'none'
                        }}
                    >
                        Discard
                    </button>
                    <button
                        type="submit"
                        form="property-form"
                        onMouseEnter={() => setHoveredButton('submit')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            flex: 2,
                            padding: '1rem',
                            borderRadius: '12px',
                            border: 'none',
                            background: hoveredButton === 'submit' ? `linear-gradient(135deg, ${theme.primaryHover}, #1d4ed8)` : `linear-gradient(135deg, ${theme.primary}, #3b82f6)`,
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: hoveredButton === 'submit' ? '0 10px 15px -3px rgba(37, 99, 235, 0.4)' : '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
                            transform: hoveredButton === 'submit' ? 'translateY(-1px)' : 'translateY(0)',
                            transition: 'all 0.2s',
                            outline: 'none'
                        }}
                    >
                        Publish Property Listing
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostPropertyForm;
