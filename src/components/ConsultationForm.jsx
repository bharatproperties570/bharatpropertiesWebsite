import React, { useState } from 'react';
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
    Video
} from 'lucide-react';
import { countryCodes } from '../data/countryCodes';

const ConsultationForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        activityType: 'Meeting',
        reason: 'Requirement',
        locationType: 'Office',
        locationAddress: 'C-21, Second Floor, Sector 3, Kurukshetra',
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
    const [showMapPlaceholder, setShowMapPlaceholder] = useState(false);

    // Dynamic Title Logic (Derived state)
    const inventoryText = formData.projectName
        ? `for ${formData.projectName}${formData.block ? ` ${formData.block}` : ''}${formData.unitNumber ? `-${formData.unitNumber}` : ''}`
        : 'For General Consultation';

    const dynamicTitle = `${formData.activityType.toUpperCase()} for ${formData.reason} ${inventoryText} at ${formData.locationType} @ ${formData.dueDate}T${formData.dueTime}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        console.log('Consultation Booked:', formData);
        setTimeout(() => {
            onClose();
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '3rem',
                    borderRadius: '24px',
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '90%'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#dcfce7',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <Check size={40} color="#22c55e" />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>Consultation Scheduled!</h2>
                    <p style={{ color: '#64748b' }}>Your meeting has been booked successfully. Our executive will reach out shortly.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '2rem'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '850px',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }} onClick={(e) => e.stopPropagation()}>

                {/* Header Section */}
                <div style={{
                    padding: '2rem 3rem',
                    borderBottom: '1px solid #f1f5f9',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    zIndex: 10
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            border: 'none',
                            background: '#f1f5f9',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#64748b'
                        }}
                    >
                        <X size={20} />
                    </button>
                    <div style={{ paddingRight: '3rem' }}>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: 'var(--color-primary)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>Schedule Your Session</span>
                        <h1 style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: '#1e293b',
                            marginTop: '0.5rem',
                            lineHeight: 1.4,
                            background: '#f1f5f9',
                            padding: '1rem',
                            borderRadius: '12px',
                            borderLeft: '4px solid var(--color-primary)'
                        }}>
                            {dynamicTitle}
                        </h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '2rem 3rem' }}>

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
                                <option>Meeting</option>
                                <option>Site Visit</option>
                                <option>Phone Consultation</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyles}>Reason for Consultation</label>
                            <select
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                style={inputStyles}
                            >
                                <option>Requirement</option>
                                <option>Discuss for deal</option>
                                <option>Documentation</option>
                                <option>etc</option>
                            </select>
                        </div>
                    </div>

                    {/* Location Section */}
                    {formData.activityType !== 'Phone Consultation' && (
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
                                        <option>Office</option>
                                        <option>On-Site</option>
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
                                            : (showMapPlaceholder ? 'Close Map' : 'Select on Google Maps')}
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
                                                src="https://maps.googleapis.com/maps/api/staticmap?center=30.00,76.85&zoom=13&size=800x200&sensor=false&key="
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

                    {/* Inventory Section - 3 Columns (Optional) */}
                    <div style={{
                        backgroundColor: '#f1f5f9',
                        padding: '1.5rem',
                        borderRadius: '20px',
                        marginBottom: '2rem'
                    }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Building size={16} /> INVENTORY DETAILS (OPTIONAL)
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={labelStyles}>Project Name</label>
                                <input
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={handleChange}
                                    style={{ ...inputStyles, backgroundColor: 'white' }}
                                    placeholder="e.g. Bharat Heights"
                                />
                            </div>
                            <div>
                                <label style={labelStyles}>Block</label>
                                <input
                                    name="block"
                                    value={formData.block}
                                    onChange={handleChange}
                                    style={{ ...inputStyles, backgroundColor: 'white' }}
                                    placeholder="e.g. Third Block"
                                />
                            </div>
                            <div>
                                <label style={labelStyles}>Unit / Property No.</label>
                                <input
                                    name="unitNumber"
                                    value={formData.unitNumber}
                                    onChange={handleChange}
                                    style={{ ...inputStyles, backgroundColor: 'white' }}
                                    placeholder="e.g. 1972 P"
                                />
                            </div>
                        </div>
                    </div>

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
                        disabled={!formData.name || !formData.mobile}
                        style={{
                            width: '100%',
                            padding: '1.25rem',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '16px',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            transition: 'all 0.3s',
                            opacity: (!formData.name || !formData.mobile) ? 0.5 : 1,
                            boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.4)'
                        }}
                        onMouseEnter={(e) => {
                            if (formData.name && formData.mobile) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                        }}
                    >
                        <Calendar size={22} />
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConsultationForm;
