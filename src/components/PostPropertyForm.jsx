import React, { useState, useEffect } from 'react';
import { X, CheckCircle, IndianRupee, MapPin, User, Building2, Tag, Ruler, Loader2, AlertCircle, Briefcase, Users } from 'lucide-react';
import { countryCodes } from '../data/countryCodes';
import { submitListing, fetchProjects, fetchPublicSettings, fetchAvailableUnits } from '../services/crmService';

const PostPropertyForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        projectName: '',
        block: '',
        unitNo: '',
        intent: 'Sell',
        expectedPrice: '',
        totalArea: '',
        areaUnit: 'Sq Yard',
        role: 'Owner',
        relationship: '',
        remarks: '',
        contact: {
            name: '',
            countryCode: '+91',
            mobile: '',
            email: '',
            city: 'Kurukshetra'
        }
    });

    const [projects, setProjects] = useState([]);
    const [filteredBlocks, setFilteredBlocks] = useState([]);
    const [availableUnits, setAvailableUnits] = useState([]);
    const [relations, setRelations] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [fetchingUnits, setFetchingUnits] = useState(false);
    const [error, setError] = useState(null);
    const [activeField, setActiveField] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);

    // Theme & Styles
    const theme = {
        primary: '#0f172a',
        primaryAccent: '#3b82f6',
        surface: '#ffffff',
        background: '#f8fafc',
        border: '#e2e8f0',
        textMain: '#0f172a',
        textMuted: '#64748b',
        success: '#10b981'
    };

    const labelStyle = (isActive) => ({
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: isActive ? theme.primaryAccent : theme.textMuted,
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
        border: `1px solid ${isActive ? theme.primaryAccent : theme.border}`,
        borderRadius: '12px',
        boxShadow: isActive ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none',
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
        borderRadius: '24px',
        padding: '1.75rem',
        marginBottom: '1.5rem',
        border: `1px solid ${theme.border}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    };

    const sectionHeaderStyle = {
        display: 'flex',
        alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem'
    };

    const sectionTitleStyle = {
        fontSize: '1rem', fontWeight: 700, color: theme.textMain, margin: 0, textTransform: 'uppercase', letterSpacing: '0.025em'
    };

    const iconBoxStyle = {
        width: '36px', height: '36px', backgroundColor: '#eff6ff', color: theme.primaryAccent, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
    };

    // Data Fetching
    const handleProjectSelect = React.useCallback((projectName, projectList = projects) => {
        const project = projectList.find(p => p.name === projectName);
        const blocks = project?.blocks || [];

        setFilteredBlocks(blocks);

        setFormData(prev => ({
            ...prev,
            projectName,
            block: blocks.length > 0 ? blocks[0].name : 'General',
            unitNo: '',
        }));
    }, [projects]);

    const handleUnitSelect = React.useCallback((unit) => {
        if (!unit) return;

        setFormData(prev => ({
            ...prev,
            unitNo: unit.unitNo,
            totalArea: unit.size?.value || prev.totalArea,
            areaUnit: unit.size?.unit || prev.areaUnit,
            expectedPrice: unit.price?.value || prev.expectedPrice
        }));
    }, []);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setFetchingData(true);
                const [projectData, settings] = await Promise.all([
                    fetchProjects(),
                    fetchPublicSettings()
                ]);
                
                setProjects(projectData);
                setRelations(settings.relations || []);

                if (projectData.length > 0) {
                    handleProjectSelect(projectData[0].name, projectData);
                }
            } catch (err) {
                console.error('Failed to load initial data:', err);
                setError('Could not load required data. Please try again.');
            } finally {
                setFetchingData(false);
            }
        };
        loadInitialData();
    }, [handleProjectSelect]);

    // Fetch Units when Project or Block changes
    useEffect(() => {
        const loadUnits = async () => {
            if (!formData.projectName) return;
            
            try {
                setFetchingUnits(true);
                const units = await fetchAvailableUnits(formData.projectName, formData.block);
                setAvailableUnits(units);
                
                if (units.length > 0) {
                    // Auto-select first unit or keep custom if needed
                    handleUnitSelect(units[0]);
                } else {
                    setFormData(prev => ({ ...prev, unitNo: '' }));
                }
            } catch (err) {
                console.error('Error fetching units:', err);
            } finally {
                setFetchingUnits(false);
            }
        };
        loadUnits();
    }, [formData.projectName, formData.block, handleUnitSelect]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const payload = {
                ...formData,
                fullName: formData.contact.name,
                phone: formData.contact.mobile,
                email: formData.contact.email,
                project: formData.projectName,
                availableFor: formData.intent,
                associateWith: formData.role
            };
            await submitListing(payload);
            setSubmitted(true);
            setTimeout(() => onClose(), 3000);
        } catch (err) {
            console.error('Submission failed:', err);
            setError('Submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(20px)' }}>
                <div style={{ backgroundColor: theme.surface, padding: '3.5rem', borderRadius: '40px', textAlign: 'center', maxWidth: '480px', width: '90%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: '#d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                        <CheckCircle size={40} color={theme.success} />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: theme.textMain, marginBottom: '1rem' }}>Submission Successful!</h2>
                    <p style={{ color: theme.textMuted, fontSize: '1.05rem', lineHeight: '1.6' }}>Your property has been captured professionally. Our team will verify and contact you shortly.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)', padding: '1.5rem' }}>
            <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '900px', height: '92vh', maxHeight: '1000px', borderRadius: '32px', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ padding: '1.5rem 2.5rem', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                            <Briefcase size={26} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: theme.textMain }}>Professional Deal Capture</h2>
                            <p style={{ margin: 0, fontSize: '0.875rem', color: theme.textMuted }}>Connected to real-time CRM inventory</p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ width: '40px', height: '40px', borderRadius: '12px', border: 'none', backgroundColor: hoveredButton === 'close' ? '#fee2e2' : '#f1f5f9', color: hoveredButton === 'close' ? '#ef4444' : theme.textMuted, cursor: 'pointer' }} onMouseEnter={() => setHoveredButton('close')} onMouseLeave={() => setHoveredButton(null)}>
                        <X size={20} />
                    </button>
                </div>

                <div className="scroll-container" style={{ padding: '2rem 2.5rem', overflowY: 'auto', flex: 1, backgroundColor: '#fcfcfd' }}>
                    {fetchingData ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem' }}>
                            <Loader2 size={40} className="animate-spin" color={theme.primaryAccent} />
                            <p style={{ color: theme.textMuted }}>Syncing with CRM Database...</p>
                        </div>
                    ) : (
                        <form id="pro-capture-form" onSubmit={handleSubmit}>
                            {/* Section 1: Property */}
                            <div style={sectionContainerStyle}>
                                <div style={sectionHeaderStyle}>
                                    <div style={iconBoxStyle}><Building2 size={18} /></div>
                                    <h3 style={sectionTitleStyle}>Property Information</h3>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                    <div className="input-group">
                                        <label style={labelStyle(activeField === 'projectName')}>Project Name</label>
                                        <select style={selectStyle(activeField === 'projectName')} value={formData.projectName} onChange={e => handleProjectSelect(e.target.value)} onFocus={() => setActiveField('projectName')} onBlur={() => setActiveField(null)} required>
                                            {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                                            <option value="Other">Other / Not Listed</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label style={labelStyle(activeField === 'block')}>Block/Sector</label>
                                        {filteredBlocks.length > 0 ? (
                                            <select style={selectStyle(activeField === 'block')} value={formData.block} onChange={e => setFormData({...formData, block: e.target.value})} onFocus={() => setActiveField('block')} onBlur={() => setActiveField(null)} required>
                                                {filteredBlocks.map((b, i) => <option key={i} value={b.name}>{b.name}</option>)}
                                                <option value="General">General</option>
                                            </select>
                                        ) : (
                                            <input style={inputBaseStyle(activeField === 'block')} placeholder="Enter Block" value={formData.block} onChange={e => setFormData({...formData, block: e.target.value})} onFocus={() => setActiveField('block')} onBlur={() => setActiveField(null)} required />
                                        )}
                                    </div>
                                    <div className="input-group">
                                        <label style={labelStyle(activeField === 'unitNo')}>Unit Number</label>
                                        <div style={{ position: 'relative' }}>
                                            {fetchingUnits ? (
                                                <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
                                                    <Loader2 size={16} className="animate-spin" color={theme.textMuted} />
                                                </div>
                                            ) : null}
                                            {availableUnits.length > 0 ? (
                                                <select 
                                                    style={selectStyle(activeField === 'unitNo')} 
                                                    value={formData.unitNo} 
                                                    onChange={e => {
                                                        const unit = availableUnits.find(u => u.unitNo === e.target.value);
                                                        handleUnitSelect(unit);
                                                    }} 
                                                    onFocus={() => setActiveField('unitNo')} 
                                                    onBlur={() => setActiveField(null)} 
                                                    required
                                                >
                                                    {availableUnits.map((u) => (
                                                        <option key={u.id} value={u.unitNo}>
                                                            {u.unitNo}
                                                        </option>
                                                    ))}
                                                    <option value="Other">Other / Not Listed</option>
                                                </select>
                                            ) : (
                                                <input 
                                                    style={inputBaseStyle(activeField === 'unitNo')} 
                                                    placeholder="Enter Unit No" 
                                                    value={formData.unitNo} 
                                                    onChange={e => setFormData({ ...formData, unitNo: e.target.value })} 
                                                    onFocus={() => setActiveField('unitNo')} 
                                                    onBlur={() => setActiveField(null)} 
                                                    required 
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                                    <div className="input-group">
                                        <label style={labelStyle(activeField === 'intent')}>Transaction Type</label>
                                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                                            {['Sell', 'Rent', 'Lease'].map((type) => (
                                                <button key={type} type="button" onClick={() => setFormData({ ...formData, intent: type })} style={{ flex: 1, padding: '0.75rem 0', borderRadius: '12px', border: `1px solid ${formData.intent === type ? theme.primaryAccent : theme.border}`, backgroundColor: formData.intent === type ? '#ebf5ff' : '#fff', color: formData.intent === type ? theme.primaryAccent : theme.textMuted, fontWeight: 700, fontSize: '0.875rem' }}>
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label style={labelStyle(null)}>Auto-calculated Size</label>
                                        <div style={{ padding: '0.8rem 1rem', background: '#f1f5f9', border: '1px dashed #cbd5e1', borderRadius: '12px', color: theme.textMain, fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Ruler size={16} color={theme.textMuted} />
                                            {formData.totalArea || '0'} {formData.areaUnit}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Contact */}
                            <div style={sectionContainerStyle}>
                                <div style={sectionHeaderStyle}>
                                    <div style={iconBoxStyle}><User size={18} /></div>
                                    <h3 style={sectionTitleStyle}>Contact Information</h3>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                    <div className="input-group">
                                        <label style={labelStyle(activeField === 'name')}>Full Name</label>
                                        <input style={inputBaseStyle(activeField === 'name')} type="text" placeholder="Enter name" onFocus={() => setActiveField('name')} onBlur={() => setActiveField(null)} value={formData.contact.name} onChange={e => setFormData({ ...formData, contact: { ...formData.contact, name: e.target.value } })} required />
                                    </div>
                                    <div className="input-group">
                                        <label style={labelStyle(activeField === 'mobile')}>Mobile Number</label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <select style={{ ...selectStyle(activeField === 'mobile'), width: '100px', paddingRight: '1.5rem', backgroundPosition: 'right 0.25rem center' }} value={formData.contact.countryCode} onChange={e => setFormData({ ...formData, contact: { ...formData.contact, countryCode: e.target.value } })}>
                                                {countryCodes.map((item) => <option key={item.code} value={item.code}>{item.flag} {item.code}</option>)}
                                            </select>
                                            <input style={{ ...inputBaseStyle(activeField === 'mobile'), flex: 1 }} type="tel" placeholder="Number" onFocus={() => setActiveField('mobile')} onBlur={() => setActiveField(null)} value={formData.contact.mobile} onChange={e => setFormData({ ...formData, contact: { ...formData.contact, mobile: e.target.value } })} required />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                                    <div className="input-group">
                                        <label style={labelStyle(activeField === 'email')}>Email (Optional)</label>
                                        <input style={inputBaseStyle(activeField === 'email')} type="email" placeholder="email@example.com" onFocus={() => setActiveField('email')} onBlur={() => setActiveField(null)} value={formData.contact.email} onChange={e => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })} />
                                    </div>
                                    <div className="input-group">
                                        <label style={labelStyle(activeField === 'role')}>My Role</label>
                                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                                            {['Owner', 'Associate'].map((role) => (
                                                <button key={role} type="button" onClick={() => setFormData({ ...formData, role: role })} style={{ flex: 1, padding: '0.75rem 0', borderRadius: '12px', border: `1px solid ${formData.role === role ? theme.primaryAccent : theme.border}`, backgroundColor: formData.role === role ? '#fef2f2' : '#fff', color: formData.role === role ? '#dc2626' : theme.textMuted, fontWeight: 700, fontSize: '0.875rem' }}>
                                                    {role}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {formData.role === 'Associate' && (
                                        <div className="input-group">
                                            <label style={labelStyle(activeField === 'rel')}>Relationship</label>
                                            {relations.length > 0 ? (
                                                <select 
                                                    style={selectStyle(activeField === 'rel')} 
                                                    value={formData.relationship} 
                                                    onChange={e => setFormData({ ...formData, relationship: e.target.value })} 
                                                    onFocus={() => setActiveField('rel')} 
                                                    onBlur={() => setActiveField(null)} 
                                                    required
                                                >
                                                    <option value="">Select Relation</option>
                                                    {relations.map((rel) => (
                                                        <option key={rel.id} value={rel.name}>{rel.name}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input 
                                                    style={inputBaseStyle(activeField === 'rel')} 
                                                    type="text" 
                                                    placeholder="e.g. Son, Daughter" 
                                                    onFocus={() => setActiveField('rel')} 
                                                    onBlur={() => setActiveField(null)} 
                                                    value={formData.relationship} 
                                                    onChange={e => setFormData({ ...formData, relationship: e.target.value })} 
                                                    required 
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Section 3: Pricing */}
                            <div style={sectionContainerStyle}>
                                <div style={sectionHeaderStyle}>
                                    <div style={iconBoxStyle}><IndianRupee size={18} /></div>
                                    <h3 style={sectionTitleStyle}>Pricing & Details</h3>
                                </div>
                                <div className="input-group">
                                    <label style={labelStyle(activeField === 'price')}>Expected Price (₹)</label>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: theme.textMuted }}><IndianRupee size={18} /></div>
                                        <input style={{ ...inputBaseStyle(activeField === 'price'), paddingLeft: '3rem', fontSize: '1.25rem', fontWeight: 800 }} type="number" placeholder="0" onFocus={() => setActiveField('price')} onBlur={() => setActiveField(null)} value={formData.expectedPrice} onChange={e => setFormData({ ...formData, expectedPrice: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="input-group" style={{ marginTop: '1.5rem' }}>
                                    <label style={labelStyle(activeField === 'remarks')}>Additional Remarks</label>
                                    <textarea style={{ ...inputBaseStyle(activeField === 'remarks'), minHeight: '100px', resize: 'vertical' }} placeholder="Any special highlights..." onFocus={() => setActiveField('remarks')} onBlur={() => setActiveField(null)} value={formData.remarks} onChange={e => setFormData({ ...formData, remarks: e.target.value })} />
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer Actions */}
                <div style={{ padding: '1.5rem 2.5rem', borderTop: `1px solid ${theme.border}`, display: 'flex', gap: '1rem' }}>
                    <button onClick={onClose} style={{ flex: 1, padding: '1rem', borderRadius: '16px', border: `1px solid ${theme.border}`, backgroundColor: 'transparent', color: theme.textMuted, fontWeight: 700, cursor: 'pointer' }}>Discard</button>
                    <button type="submit" form="pro-capture-form" disabled={loading || fetchingData} style={{ flex: 2, padding: '1rem', borderRadius: '16px', border: 'none', background: (loading || fetchingData) ? theme.border : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', fontWeight: 800, fontSize: '1rem', cursor: (loading || fetchingData) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Submit Professional Appraisal'}
                    </button>
                </div>
                {error && <div style={{ padding: '0.75rem 2.5rem', backgroundColor: '#fef2f2', color: '#dc2626', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}
            </div>
        </div>
    );
};

export default PostPropertyForm;
