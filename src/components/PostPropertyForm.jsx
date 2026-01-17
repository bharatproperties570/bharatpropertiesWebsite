import React, { useState } from 'react';
import { X, CheckCircle, IndianRupee, MapPin, User, Phone, Info, Building2, Tag, Ruler, FileCheck, Layers } from 'lucide-react';
import { countryCodes } from '../data/countryCodes';

const PostPropertyForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        availableFor: 'Sale',
        project: 'Divine City',
        sector: 'Sector 3 Kurukshetra',
        block: 'First Block',
        unitNo: '18 P',
        expectedPrice: '',
        type: 'calculated',
        price: '',
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

    if (submitted) {
        return (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)', animation: 'fadeIn 0.4s ease-out' }}>
                <div style={{ backgroundColor: 'white', padding: '3.5rem', borderRadius: '40px', textAlign: 'center', maxWidth: '450px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                    <div style={{ color: '#22c55e', marginBottom: '2rem' }}>
                        <div style={{ width: '80px', height: '80px', backgroundColor: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                            <CheckCircle size={48} />
                        </div>
                    </div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0F172A', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Property Posted!</h2>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>Success! Aapki listing Bharat Properties platform par review ke liye bhej di gayi hai. Hum aapko jald contact karenge.</p>
                </div>
            </div>
        );
    }

    const sectionHeaderStyle = {
        padding: '1.2rem 1.5rem',
        backgroundColor: '#F8FAFC',
        borderRadius: '20px',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        border: '1px solid #f1f5f9'
    };

    const sectionTitleStyle = {
        fontSize: '0.9rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: '#0F172A',
        margin: 0
    };

    const inputGroupStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '1.8rem'
    };

    const labelStyle = (isActive) => ({
        fontSize: '0.85rem',
        fontWeight: 800,
        color: isActive ? 'var(--color-primary)' : '#475569',
        transition: 'color 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    });

    const inputStyle = (isActive) => ({
        padding: '1rem 1.25rem',
        borderRadius: '16px',
        border: isActive ? '2px solid var(--color-primary)' : '2px solid #f1f5f9',
        fontSize: '1rem',
        backgroundColor: '#fff',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'all 0.2s ease',
        color: '#1e293b',
        fontWeight: 600,
        boxShadow: isActive ? '0 10px 15px -3px rgba(37, 99, 235, 0.1)' : 'none',
        outline: 'none'
    });

    const selectStyle = (isActive) => ({
        ...inputStyle(isActive),
        appearance: 'none',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1.25rem center',
        backgroundSize: '1.2rem',
        cursor: 'pointer'
    });

    const manualBadge = {
        fontSize: '0.65rem',
        padding: '2px 8px',
        backgroundColor: '#FEF3C7',
        color: '#92400E',
        borderRadius: '50px',
        marginLeft: 'auto'
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)', padding: '20px' }}>
            <style>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(30px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>

            <div style={{
                backgroundColor: 'white',
                width: '100%',
                maxWidth: '900px',
                maxHeight: '92vh',
                borderRadius: '40px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.3)',
                animation: 'slideIn 0.5s ease-out'
            }}>

                {/* Modern Header */}
                <div style={{ padding: '2rem 2.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '60px', height: '60px', backgroundColor: '#eff6ff', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                            <Building2 size={32} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, color: '#0F172A', fontFamily: 'var(--font-heading)' }}>Post Your Property</h2>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: '#64748b', fontWeight: 500 }}>Sell or Rent your property faster with Bharat Properties</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #f1f5f9', backgroundColor: '#fff', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#0F172A'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#64748b'; }}
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Form Body */}
                <div style={{ padding: '2.5rem', overflowY: 'auto', flex: 1, backgroundColor: '#fff' }}>
                    <form onSubmit={handleSubmit}>

                        {/* 1. Configuration */}
                        <div style={sectionHeaderStyle}>
                            <Tag size={20} color="var(--color-primary)" />
                            <h3 style={sectionTitleStyle}>Basic Configuration</h3>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <div style={inputGroupStyle}>
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
                        <div style={{ ...sectionHeaderStyle, marginTop: '1rem' }}>
                            <MapPin size={20} color="var(--color-primary)" />
                            <h3 style={sectionTitleStyle}>Property Location</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '1rem' }}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle(activeField === 'project')}>Project</label>
                                <select style={selectStyle(activeField === 'project')} onFocus={() => setActiveField('project')} onBlur={() => setActiveField(null)} value={formData.project} onChange={e => setFormData({ ...formData, project: e.target.value })}>
                                    <option>Divine City</option>
                                    <option>Brahma Residency</option>
                                    <option>Independent Plot</option>
                                </select>
                            </div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle(activeField === 'sector')}>Sector</label>
                                <select style={selectStyle(activeField === 'sector')} onFocus={() => setActiveField('sector')} onBlur={() => setActiveField(null)} value={formData.sector} onChange={e => setFormData({ ...formData, sector: e.target.value })}>
                                    <option>Sector 3 Kurukshetra</option>
                                    <option>Sector 4 Kurukshetra</option>
                                    <option>Sector 7 Kurukshetra</option>
                                </select>
                            </div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle(activeField === 'block')}>Block</label>
                                <select style={selectStyle(activeField === 'block')} onFocus={() => setActiveField('block')} onBlur={() => setActiveField(null)} value={formData.block} onChange={e => setFormData({ ...formData, block: e.target.value })}>
                                    <option>First Block</option>
                                    <option>Second Block</option>
                                    <option>Third Block</option>
                                </select>
                            </div>
                            <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                                <label style={labelStyle(activeField === 'unitNo')}>Unit No. & Size (Auto-fill)</label>
                                <div style={{ display: 'flex', gap: '12px' }}>
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
                                        ...inputStyle(false),
                                        flex: 1,
                                        backgroundColor: '#F8FAFC',
                                        color: '#64748B',
                                        cursor: 'not-allowed',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        borderStyle: 'dashed'
                                    }}>
                                        <Ruler size={16} />
                                        <span>{formData.totalArea ? `${formData.totalArea} ${formData.areaUnit}` : 'Select Unit'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Pricing & Areas */}
                        <div style={{ ...sectionHeaderStyle, marginTop: '1rem' }}>
                            <IndianRupee size={20} color="var(--color-primary)" />
                            <h3 style={sectionTitleStyle}>Pricing & Dimensions</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle(activeField === 'transactionType')}>Transaction Type</label>
                                <select style={selectStyle(activeField === 'transactionType')} onFocus={() => setActiveField('transactionType')} onBlur={() => setActiveField(null)} value={formData.transactionType} onChange={e => setFormData({ ...formData, transactionType: e.target.value })}>
                                    <option>Registry</option>
                                    <option>Transfer</option>
                                    <option>GPA</option>
                                    <option>LOI</option>
                                </select>
                            </div>
                            <div style={inputGroupStyle}>
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

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                            <div style={inputGroupStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <label style={labelStyle(activeField === 'expectedPrice')}>Expected Price</label>
                                    <span style={manualBadge}>Manual Entry</span>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: '#94a3b8' }}>₹</span>
                                    <input
                                        style={{ ...inputStyle(activeField === 'expectedPrice'), paddingLeft: '2.5rem' }}
                                        type="number"
                                        placeholder="00,00,000"
                                        onFocus={() => setActiveField('expectedPrice')}
                                        onBlur={() => setActiveField(null)}
                                        value={formData.expectedPrice}
                                        onChange={e => setFormData({ ...formData, expectedPrice: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={inputGroupStyle}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <label style={labelStyle(activeField === 'remarks')}>Remarks & Description</label>
                                <span style={manualBadge}>Manual Entry</span>
                            </div>
                            <textarea
                                style={{ ...inputStyle(activeField === 'remarks'), minHeight: '100px', resize: 'none' }}
                                placeholder="Add features, highlights or special terms..."
                                onFocus={() => setActiveField('remarks')}
                                onBlur={() => setActiveField(null)}
                                value={formData.remarks}
                                onChange={e => setFormData({ ...formData, remarks: e.target.value })}
                            />
                        </div>

                        {/* 4. Contact Details */}
                        <div style={{ ...sectionHeaderStyle, marginTop: '1rem' }}>
                            <User size={20} color="var(--color-primary)" />
                            <h3 style={sectionTitleStyle}>Owner/Consultant Details</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle(activeField === 'contactName')}>Full Name</label>
                                <input style={inputStyle(activeField === 'contactName')} type="text" placeholder="e.g. Rahul Sharma" onFocus={() => setActiveField('contactName')} onBlur={() => setActiveField(null)} value={formData.contact.name} onChange={e => setFormData({ ...formData, contact: { ...formData.contact, name: e.target.value } })} required />
                            </div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle(activeField === 'contactMobile')}>Mobile Number</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <select
                                        style={{ ...selectStyle(activeField === 'contactMobile'), width: '100px', paddingRight: '1rem', backgroundPosition: 'right 0.5rem center' }}
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
                                        style={{ ...inputStyle(activeField === 'contactMobile'), flex: 1 }}
                                        type="tel"
                                        placeholder="XXXXX XXXXX"
                                        onFocus={() => setActiveField('contactMobile')}
                                        onBlur={() => setActiveField(null)}
                                        value={formData.contact.mobile}
                                        onChange={e => setFormData({ ...formData, contact: { ...formData.contact, mobile: e.target.value } })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle(activeField === 'contactEmail')}>Email Address</label>
                                <input style={inputStyle(activeField === 'contactEmail')} type="email" placeholder="rahul@example.com" onFocus={() => setActiveField('contactEmail')} onBlur={() => setActiveField(null)} value={formData.contact.email} onChange={e => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })} />
                            </div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle(activeField === 'contactCity')}>City</label>
                                <input style={inputStyle(activeField === 'contactCity')} type="text" placeholder="e.g. Kurukshetra" onFocus={() => setActiveField('contactCity')} onBlur={() => setActiveField(null)} value={formData.contact.city} onChange={e => setFormData({ ...formData, contact: { ...formData.contact, city: e.target.value } })} />
                            </div>
                        </div>

                        {/* Modern Footer Actions */}
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem', padding: '2.5rem 0', borderTop: '2px dashed #f1f5f9' }}>
                            <button
                                type="button"
                                onClick={onClose}
                                style={{ flex: 1, padding: '1.25rem', borderRadius: '20px', border: 'none', backgroundColor: '#f1f5f9', fontWeight: 800, cursor: 'pointer', color: '#64748b', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                            >
                                Discard Listing
                            </button>
                            <button
                                type="submit"
                                style={{ flex: 2, padding: '1.25rem', borderRadius: '20px', border: 'none', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 800, cursor: 'pointer', boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.2)', transition: 'all 0.3s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 25px 30px -5px rgba(37, 99, 235, 0.3)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(37, 99, 235, 0.2)'; }}
                            >
                                Publish Property Listing
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostPropertyForm;
