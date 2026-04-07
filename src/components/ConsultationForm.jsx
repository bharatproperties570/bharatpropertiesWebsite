/* global process */
import React, { useState, useEffect } from 'react';
import {
    Calendar,
    User,
    MapPin,
    Home,
    MessageSquare,
    Clock,
    X,
    Check,
    Phone,
    Mail,
    Building,
    Layers,
    Hash,
    Map,
    Video,
    Loader2,
    AlertCircle
} from 'lucide-react';
import { countryCodes } from '../data/countryCodes';
import { submitLead, fetchProjects, fetchAvailableUnits, fetchPublicSettings } from '../services/crmService';

const ConsultationForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        activityType: 'Call',
        reason: 'Requirement',
        locationType: 'Kurukshetra Office',
        locationAddress: 'Shop No 166, Sector 3, Huda Market, Kurukshetra',
        projectName: '',
        block: '',
        unitNumber: '',
        name: '',
        countryCode: '+91',
        mobile: '',
        email: '',
        city: '',
        remarks: '',
        dueDate: new Date().toISOString().split('T')[0],
        dueTime: '12:00'
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showMapPlaceholder, setShowMapPlaceholder] = useState(false);

    // Dynamic Data State
    const [projects, setProjects] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [filteredBlocks, setFilteredBlocks] = useState([]);
    const [availableUnits, setAvailableUnits] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [fetchingUnits, setFetchingUnits] = useState(false);
    const [activityMasterFields, setActivityMasterFields] = useState({});

    // Initial Data Loading
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [projectData, settings] = await Promise.all([
                    fetchProjects(),
                    fetchPublicSettings()
                ]);
                setProjects(projectData);
                if (settings?.activityMasterFields) {
                    setActivityMasterFields(settings.activityMasterFields);
                }
            } catch (err) {
                console.error('Failed to load initial form data:', err);
            }
        };
        loadInitialData();
    }, []);

    // Fetch Units when Project/Block changes
    useEffect(() => {
        const loadUnits = async () => {
            if (!formData.projectName) {
                setAvailableUnits([]);
                return;
            }
            setFetchingUnits(true);
            try {
                const units = await fetchAvailableUnits(formData.projectName, formData.block);
                setAvailableUnits(units);
            } catch (err) {
                console.error('Failed to load units:', err);
                setAvailableUnits([]);
            } finally {
                setFetchingUnits(false);
            }
        };
        loadUnits();
    }, [formData.projectName, formData.block]);

    // eslint-disable-next-line no-unused-vars
    const handleProjectSelect = (projectName) => {
        const selectedProject = projects.find(p => p.name === projectName);
        const blocks = (selectedProject?.blocks || []).map(b => typeof b === 'object' ? b.name : b);
        setFilteredBlocks(blocks);
        
        setFormData(prev => ({
            ...prev,
            projectName,
            block: blocks.length > 0 ? blocks[0] : 'General',
            unitNumber: ''
        }));
    };

    // eslint-disable-next-line no-unused-vars
    const handleUnitSelect = (unitNo) => {
        const unit = availableUnits.find(u => u.unitNo === unitNo);
        if (unit) {
            const sizeStr = unit.size ? `${unit.size.value || ''} ${unit.size.unit || ''}`.trim() : '';
            const priceStr = unit.price ? `₹${unit.price.value || ''}` : '';
            const detailsStr = `Unit Details: ${sizeStr}${priceStr ? ` @ ${priceStr}` : ''}`;
            
            setFormData(prev => ({
                ...prev,
                unitNumber: unitNo,
                remarks: `${prev.remarks}\n${detailsStr}`.trim()
            }));
        } else {
            setFormData(prev => ({ ...prev, unitNumber: unitNo }));
        }
    };

    // Dynamic Title Logic (Derived state)
    const inventoryText = formData.projectName
        ? `for ${formData.projectName}${formData.block ? ` ${formData.block}` : ''}${formData.unitNumber ? `-${formData.unitNumber}` : ''}`
        : 'For General Consultation';

    const dynamicTitle = `${formData.activityType.toUpperCase()} for ${formData.reason} ${inventoryText} at ${formData.locationType} @ ${formData.dueDate}T${formData.dueTime}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await submitLead(formData);
            setSubmitted(true);
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (err) {
            console.error('Submission failed:', err);
            setError('Submission failed. Please try again or contact us directly.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newFormData = { ...formData, [name]: value };

        // Auto-update address for offices
        if (name === 'locationType') {
            if (value === 'Kurukshetra Office') {
                newFormData.locationAddress = 'Shop No 166, Sector 3, Huda Market, Kurukshetra';
            } else if (value === 'Mohali Office') {
                newFormData.locationAddress = 'Airport Road, Sector 82 Industrial Area, Mohali';
            } else if (value === 'Virtual') {
                newFormData.locationAddress = 'Meeting link will be shared via email/WhatsApp';
            }
        }

        // Reset reason when activity type changes
        if (name === 'activityType') {
            newFormData.reason = '';
        }

        setFormData(newFormData);
    };

    const inputStyles = {
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'all 0.2s',
        backgroundColor: '#f8fafc'
    };

    const labelStyles = {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: 600,
        color: '#475569',
        fontSize: '0.85rem'
    };

    if (submitted) {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2050,
                animation: 'fadeIn 0.5s ease-out'
            }}>
                <div 
                    className="animate-fade-in-up"
                    style={{
                        backgroundColor: 'white',
                        padding: '4rem 3rem',
                        borderRadius: '32px',
                        textAlign: 'center',
                        maxWidth: '450px',
                        width: '90%',
                        boxShadow: 'var(--shadow-premium)'
                    }}
                >
                    <div style={{
                        width: '100px',
                        height: '100px',
                        backgroundColor: '#dcfce7',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        animation: 'glowPulse 2s infinite'
                    }}>
                        <Check size={48} color="#22c55e" />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem', letterSpacing: '-0.5px' }}>Consultation Scheduled!</h2>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>Your premium consultation session has been booked successfully. Our executive will reach out shortly to discuss your requirements.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '2rem',
            animation: 'fadeIn 0.3s ease-out'
        }} onClick={onClose}>
            <div 
                className="animate-fade-in-up"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '32px',
                    width: '100%',
                    maxWidth: '850px',
                    maxHeight: '92vh',
                    overflowY: 'auto',
                    position: 'relative',
                    boxShadow: 'var(--shadow-premium)',
                    border: '1px solid rgba(255, 255, 255, 0.5)'
                }} onClick={(e) => e.stopPropagation()}>

                {/* Header Section */}
                <div style={{
                    padding: '2.5rem 3rem',
                    borderBottom: '1px solid rgba(15, 23, 42, 0.05)',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 20
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '2rem',
                            border: 'none',
                            background: '#f1f5f9',
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#64748b',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fee2e2'; e.currentTarget.style.color = '#ef4444'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}
                    >
                        <X size={22} />
                    </button>
                    <div style={{ paddingRight: '4rem' }}>
                        <span style={{
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            color: 'var(--color-primary)',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}>Schedule Your Session</span>
                        <h1 className="gradient-text" style={{
                            fontSize: '1.4rem',
                            fontWeight: 800,
                            color: '#1e293b',
                            marginTop: '0.5rem',
                            lineHeight: 1.4,
                            letterSpacing: '-0.5px'
                        }}>
                            {dynamicTitle}
                        </h1>
                    </div>
                </div>


                <form onSubmit={handleSubmit} style={{ padding: '0 3rem 2rem' }}>
                    {error && (
                        <div style={{ 
                            padding: '1rem', 
                            backgroundColor: '#fef2f2', 
                            border: '1px solid #fee2e2', 
                            borderRadius: '12px', 
                            color: '#dc2626', 
                            fontSize: '0.9rem', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.75rem', 
                            marginBottom: '1rem' 
                        }}>
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Basic Activity Info */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div>
                            <label style={labelStyles}>Select Activity Type</label>
                            <select
                                name="activityType"
                                value={formData.activityType}
                                onChange={handleChange}
                                style={inputStyles}
                            >
                                <option value="Call">Call</option>
                                <option value="Meeting">Meeting</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyles}>
                                {formData.activityType === 'Meeting' ? 'Agenda / Meeting Purpose' : 'Call Purpose'}
                            </label>
                            <select
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                style={inputStyles}
                                required
                            >
                                <option value="">Select Purpose</option>
                                {formData.activityType === 'Meeting' && activityMasterFields.meetingPurposes
                                    ?.filter(p => !['General Inquiry', 'General Enquiry'].includes(p))
                                    .map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))
                                }
                                {formData.activityType === 'Call' && activityMasterFields.callPurposes
                                    ?.filter(p => !['Follow-up', 'Negotiation', 'Post-Visit Feedback', 'Payment Reminder', 'Post-Meeting Feedback', 'General Inquiry', 'General Enquiry'].includes(p))
                                    .map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    {/* Location Section */}
                    {formData.activityType === 'Meeting' && (
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={labelStyles}>Location Type</label>
                                    <select
                                        name="locationType"
                                        value={formData.locationType}
                                        onChange={handleChange}
                                        style={inputStyles}
                                    >
                                        <option>Kurukshetra Office</option>
                                        <option>Mohali Office</option>
                                        <option>Virtual</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <button
                                        type="button"
                                        onClick={() => setShowMapPlaceholder(!showMapPlaceholder)}
                                        style={{
                                            ...inputStyles,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            backgroundColor: '#eff6ff',
                                            color: '#2563eb',
                                            border: '1px solid #bfdbfe',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {formData.locationType === 'Virtual' ? <Video size={18} /> : <Map size={18} />}
                                        {formData.locationType === 'Virtual'
                                            ? (showMapPlaceholder ? 'Hide Meet Info' : 'Google Meet Option')
                                            : (showMapPlaceholder ? 'Close Map' : 'Direction on Google Map')}
                                    </button>
                                </div>
                            </div>

                            {showMapPlaceholder && (
                                <div style={{
                                    width: '100%',
                                    height: '200px',
                                    backgroundColor: '#e2e8f0',
                                    borderRadius: '16px',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    {formData.locationType === 'Virtual' ? (
                                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                                            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                                <Video size={32} color="#2563eb" style={{ margin: '0 auto 1rem' }} />
                                                <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Google Meet Integration</p>
                                                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>A meeting link will be generated and shared with the client.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <img
                                                src={`https://maps.googleapis.com/maps/api/staticmap?center=30.00,76.85&zoom=13&size=800x200&sensor=false&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBd2gdMJVt5C_tgYqWoRbBiatzmevYdB9U'}`}
                                                alt="Map Preview"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                textAlign: 'center',
                                                backgroundColor: 'white',
                                                padding: '1rem',
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                            }}>
                                                <MapPin size={24} color="red" style={{ margin: '0 auto 0.5rem' }} />
                                                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Google Maps Pin Selection</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            <label style={labelStyles}>{formData.locationType === 'Virtual' ? 'Meeting Link / Details' : 'Location Address'}</label>
                            <input
                                name="locationAddress"
                                value={formData.locationAddress}
                                onChange={handleChange}
                                style={inputStyles}
                                placeholder={formData.locationType === 'Virtual' ? 'https://meet.google.com/...' : 'Enter detailed address'}
                            />
                        </div>
                    )}


                    {/* Contact Info Section - HIGHLIGHTED */}
                    <div style={{
                        border: '2px solid var(--color-primary)',
                        padding: '1.5rem',
                        borderRadius: '20px',
                        marginBottom: '2rem',
                        backgroundColor: 'rgba(79, 70, 229, 0.02)'
                    }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={16} /> CLIENT CONTACT INFORMATION
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <label style={{ ...labelStyles, color: 'var(--color-primary)' }}>Full Name *</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    style={{ ...inputStyles, border: '1px solid #c7d2fe', backgroundColor: 'white' }}
                                    placeholder="Client full name"
                                />
                            </div>
                            <div>
                                <label style={{ ...labelStyles, color: 'var(--color-primary)' }}>Mobile Number *</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <select
                                        name="countryCode"
                                        value={formData.countryCode}
                                        onChange={handleChange}
                                        style={{
                                            width: '90px',
                                            padding: '0.75rem 0.5rem',
                                            border: '1px solid #c7d2fe',
                                            borderRadius: '12px',
                                            fontSize: '0.85rem',
                                            outline: 'none',
                                            backgroundColor: 'white',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {countryCodes.map((item) => (
                                            <option key={`${item.country}-${item.code}`} value={item.code}>
                                                {item.flag} {item.code}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        name="mobile"
                                        type="tel"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                        style={{ ...inputStyles, border: '1px solid #c7d2fe', backgroundColor: 'white', flex: 1 }}
                                        placeholder="Client phone number"
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={labelStyles}>Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ ...inputStyles, backgroundColor: 'white' }}
                                    placeholder="client@email.com"
                                />
                            </div>
                            <div>
                                <label style={labelStyles}>City</label>
                                <input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    style={{ ...inputStyles, backgroundColor: 'white' }}
                                    placeholder="City name"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Remarks & Date */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={labelStyles}>Remarks</label>
                        <textarea
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            rows="3"
                            style={{ ...inputStyles, resize: 'none' }}
                            placeholder="Add any specific requirements or notes..."
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div>
                            <label style={labelStyles}>Select Date</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                style={inputStyles}
                            />
                        </div>
                        <div>
                            <label style={labelStyles}>Select Time</label>
                            <input
                                type="time"
                                name="dueTime"
                                value={formData.dueTime}
                                onChange={handleChange}
                                style={inputStyles}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!formData.name || !formData.mobile || loading}
                        className="btn-premium"
                        style={{
                            width: '100%',
                            padding: '1.4rem',
                            background: 'var(--grad-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '18px',
                            fontSize: '1.15rem',
                            fontWeight: 800,
                            cursor: (loading || !formData.name || !formData.mobile) ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            opacity: (loading || !formData.name || !formData.mobile) ? 0.5 : 1,
                            boxShadow: 'var(--shadow-premium)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                        onMouseEnter={(e) => {
                            if (formData.name && formData.mobile && !loading) {
                                e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(15, 23, 42, 0.4)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
                        }}
                    >
                        {loading ? <Loader2 className="animate-spin" size={24} /> : <><Calendar size={24} /> Confirm Luxury Booking</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConsultationForm;
