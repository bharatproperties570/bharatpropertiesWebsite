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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        console.log('Talk to Expert Inquiry:', formData);
        setIsSubmitted(true);
    };

    const inputStyle = {
        width: '100%',
        padding: '1rem 1.25rem',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.2s',
        backgroundColor: '#F8FAFC'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.9rem',
        fontWeight: 600,
        color: '#475569',
        marginBottom: '0.5rem'
    };

    if (isSubmitted) {
        return (
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)',
                display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000, padding: '1rem'
            }}>
                <div style={{
                    backgroundColor: 'white', padding: '3rem', borderRadius: '32px',
                    width: '100%', maxWidth: '500px', textAlign: 'center', position: 'relative',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                }}>
                    <div style={{ backgroundColor: '#f0fdf4', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <CheckCircle size={40} color="#22c55e" />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>Sankalp Received!</h2>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                        Hamare expert jald hi aapse contact karenge. Aapki real estate journey ab hamari zimmedari hai.
                    </p>
                    <button onClick={onClose} style={{
                        padding: '1rem 3rem', backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: '16px',
                        fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
                    }}>
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000, padding: '1rem'
        }} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div style={{
                backgroundColor: 'white', borderRadius: '32px', width: '100%', maxWidth: '600px',
                position: 'relative', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: '#F1F5F9', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', color: '#64748b', zIndex: 10 }}>
                    <X size={20} />
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)' }}>
                    <div style={{ padding: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                            <div style={{ backgroundColor: '#EEF2FF', padding: '10px', borderRadius: '12px' }}>
                                <MessageSquare color="var(--color-primary)" size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Talk to our Expert</h2>
                        </div>
                        <p style={{ color: '#64748b', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                            Aapki requirements share karein, hum aapko best property options suggest karenge.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={labelStyle}>Pura Naam *</label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            style={{ ...inputStyle, paddingLeft: '3.5rem' }}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>Email Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            style={{ ...inputStyle, paddingLeft: '3.5rem' }}
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Mobile Number *</label>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <div style={{ position: 'relative', width: '120px' }}>
                                        <select
                                            value={formData.countryCode}
                                            onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                            style={{ ...inputStyle, paddingLeft: '1rem', appearance: 'none', cursor: 'pointer' }}
                                        >
                                            {countryCodes.map((item) => (
                                                <option key={`${item.country}-${item.code}`} value={item.code}>
                                                    {item.flag} {item.code}
                                                </option>
                                            ))}
                                        </select>
                                        <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94A3B8', fontSize: '0.8rem' }}>▼</div>
                                    </div>
                                    <div style={{ position: 'relative', flex: 1 }}>
                                        <Phone size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                        <input
                                            type="tel"
                                            required
                                            placeholder="9991000570"
                                            style={{ ...inputStyle, paddingLeft: '3.5rem' }}
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Aapka Message</label>
                                <textarea
                                    rows="4"
                                    placeholder="Write your requirements here..."
                                    style={{ ...inputStyle, resize: 'none' }}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <button type="submit" style={{
                                width: '100%', padding: '1.25rem', backgroundColor: 'var(--color-primary)', color: 'white',
                                border: 'none', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 800,
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 10px 15px -3px rgba(30, 64, 175, 0.2)'
                            }}>
                                <Send size={18} /> Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TalkToExpertForm;
