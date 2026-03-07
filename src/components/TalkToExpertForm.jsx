import React, { useState } from 'react';
import { X, Send, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { countryCodes } from '../data/countryCodes';

const TalkToExpertForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+91',
        phone: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Talk to Expert Inquiry:', formData);
        setIsSubmitted(true);
    };

    // Premium styling constants (matching PostPropertyForm)
    const theme = {
        primary: '#2563eb', // Rich Blue
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

    if (isSubmitted) {
        return (
            <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.3s ease-out' }}>
                <div style={{ backgroundColor: theme.surface, padding: '3rem', borderRadius: '24px', textAlign: 'center', maxWidth: '400px', width: '90%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', animation: 'scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: '#d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <CheckCircle size={40} color={theme.success} />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: theme.textMain, marginBottom: '0.75rem' }}>Sankalp Received!</h2>
                    <p style={{ color: theme.textMuted, fontSize: '1rem', lineHeight: '1.5', margin: 0 }}>Hamare expert jald hi aapse contact karenge. Aapki real estate journey ab hamari zimmedari hai.</p>
                    <button onClick={onClose} style={{ marginTop: '2rem', padding: '0.875rem 2.5rem', backgroundColor: theme.textMain, color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Close</button>
                </div>
                <style>{`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes scaleUp { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
                `}</style>
            </div>
        );
    }

    return (
        <div 
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', padding: '1rem' }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div style={{
                backgroundColor: theme.surface,
                width: '100%',
                maxWidth: '550px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.4)',
                animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Header Section */}
                <div style={{ padding: '2rem', background: `linear-gradient(to right, ${theme.surface}, #f8fafc)`, borderBottom: `1px solid ${theme.border}`, position: 'relative' }}>
                    <button
                        type="button"
                        onClick={onClose}
                        onMouseEnter={() => setHoveredButton('close')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', width: '36px', height: '36px', borderRadius: '50%', border: 'none', backgroundColor: hoveredButton === 'close' ? '#fee2e2' : theme.background, color: hoveredButton === 'close' ? '#ef4444' : theme.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease', outline: 'none', zIndex: 10 }}
                    >
                        <X size={18} />
                    </button>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                        <div style={{ width: '48px', height: '48px', background: `linear-gradient(135deg, ${theme.primary}, #3b82f6)`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 8px 16px -4px rgba(37, 99, 235, 0.4)' }}>
                            <MessageSquare size={24} />
                        </div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: theme.textMain, letterSpacing: '-0.02em' }}>Talk to our Expert</h2>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: theme.textMuted, fontWeight: 500, lineHeight: '1.5' }}>
                        Aapki requirements share karein, hum aapko best property options suggest karenge.
                    </p>
                </div>

                {/* Form Section */}
                <div style={{ padding: '2rem', backgroundColor: theme.surface }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <div className="input-group" style={{ marginBottom: 0 }}>
                                <label style={labelStyle(activeField === 'name')}>Pura Naam *</label>
                                <div style={{ position: 'relative' }}>
                                    <input 
                                        style={{...inputBaseStyle(activeField === 'name'), paddingLeft: '3rem'}} 
                                        type="text" 
                                        placeholder="Rahul Sharma" 
                                        required
                                        onFocus={() => setActiveField('name')} 
                                        onBlur={() => setActiveField(null)} 
                                        value={formData.name} 
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                                    />
                                    <User size={18} color={activeField === 'name' ? theme.primary : '#94a3b8'} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', transition: 'color 0.3s' }} />
                                </div>
                            </div>
                            <div className="input-group" style={{ marginBottom: 0 }}>
                                <label style={labelStyle(activeField === 'email')}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <input 
                                        style={{...inputBaseStyle(activeField === 'email'), paddingLeft: '3rem'}} 
                                        type="email" 
                                        placeholder="rahul@example.com" 
                                        onFocus={() => setActiveField('email')} 
                                        onBlur={() => setActiveField(null)} 
                                        value={formData.email} 
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                                    />
                                    <Mail size={18} color={activeField === 'email' ? theme.primary : '#94a3b8'} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', transition: 'color 0.3s' }} />
                                </div>
                            </div>
                        </div>

                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <label style={labelStyle(activeField === 'phone')}>Mobile Number *</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <select
                                    style={{ ...selectStyle(activeField === 'phone'), width: '110px', paddingRight: '1.5rem', backgroundPosition: 'right 0.25rem center', fontSize: '0.9rem' }}
                                    value={formData.countryCode}
                                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                    onFocus={() => setActiveField('phone')}
                                    onBlur={() => setActiveField(null)}
                                >
                                    {countryCodes.map((item) => (
                                        <option key={`${item.country}-${item.code}`} value={item.code}>
                                            {item.flag} {item.code}
                                        </option>
                                    ))}
                                </select>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <input
                                        style={{ ...inputBaseStyle(activeField === 'phone'), paddingLeft: '3rem' }}
                                        type="tel"
                                        required
                                        placeholder="98765 43210"
                                        onFocus={() => setActiveField('phone')}
                                        onBlur={() => setActiveField(null)}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                    <Phone size={18} color={activeField === 'phone' ? theme.primary : '#94a3b8'} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', transition: 'color 0.3s' }} />
                                </div>
                            </div>
                        </div>

                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <label style={labelStyle(activeField === 'message')}>Aapka Message</label>
                            <textarea
                                style={{ ...inputBaseStyle(activeField === 'message'), minHeight: '120px', resize: 'none' }}
                                placeholder="Write your requirements here..."
                                onFocus={() => setActiveField('message')}
                                onBlur={() => setActiveField(null)}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            onMouseEnter={() => setHoveredButton('submit')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                width: '100%',
                                marginTop: '0.5rem',
                                padding: '1.125rem',
                                borderRadius: '14px',
                                border: 'none',
                                background: hoveredButton === 'submit' ? `linear-gradient(135deg, ${theme.primaryHover}, #1d4ed8)` : `linear-gradient(135deg, ${theme.primary}, #3b82f6)`,
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1.05rem',
                                cursor: 'pointer',
                                boxShadow: hoveredButton === 'submit' ? '0 12px 20px -5px rgba(37, 99, 235, 0.4)' : '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
                                transform: hoveredButton === 'submit' ? 'translateY(-2px)' : 'translateY(0)',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                outline: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem'
                            }}
                        >
                            <Send size={20} />
                            Send Inquiry
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TalkToExpertForm;
