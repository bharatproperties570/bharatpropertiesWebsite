import React, { useState, useEffect } from 'react';
import { X, Send, User, Mail, Phone, MessageSquare, CheckCircle, Shield, Loader2, AlertCircle } from 'lucide-react';
import { countryCodes } from '../data/countryCodes';
import { submitLead } from '../services/crmService';

const ContactPopup = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        countryCode: '+91'
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let timer;
        if (isOpen) {
            timer = setTimeout(() => setIsVisible(true), 10);
        } else {
            timer = setTimeout(() => setIsVisible(false), 0);
        }
        return () => clearTimeout(timer);
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await submitLead({
                ...formData,
                mobile: formData.phone,
                activityType: 'Note',
                reason: 'Contact Request'
            });
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                onClose();
            }, 3000);
        } catch (err) {
            console.error('Submission failed:', err);
            setError('Submission failed. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 5000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: isVisible ? 'rgba(15, 23, 42, 0.45)' : 'rgba(15, 23, 42, 0)',
            backdropFilter: isVisible ? 'blur(12px)' : 'blur(0px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: isOpen ? 'all' : 'none'
        }} onClick={(e) => e.target === e.currentTarget && onClose()}>

            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                width: '100%',
                maxWidth: '500px',
                borderRadius: '32px',
                overflow: 'hidden',
                position: 'relative',
                transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: 'var(--shadow-premium)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
            }}>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        backgroundColor: '#f1f5f9',
                        border: 'none',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#64748b',
                        zIndex: 10
                    }}
                >
                    <X size={18} />
                </button>

                {isSubmitted ? (
                    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
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
                            <CheckCircle size={40} color="#22c55e" />
                        </div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Sankalp Received!</h2>
                        <p style={{ color: '#64748b', lineHeight: 1.6 }}>Hamare executive jald hi aapse sampark karenge. Dhanyawad!</p>
                    </div>
                ) : (
                    <>
                        {/* Header Gradient */}
                        <div style={{
                            height: '140px',
                            background: 'var(--grad-indigo)',
                            padding: '2.5rem',
                            display: 'flex',
                            alignItems: 'flex-end',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-20%',
                                right: '-10%',
                                width: '150px',
                                height: '150px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '50%',
                                filter: 'blur(30px)'
                            }}></div>
                            <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>Contact Us</h2>
                        </div>

                        <form onSubmit={handleSubmit} style={{ padding: '2rem 2.5rem 2.5rem' }}>
                            {error && (
                                <div style={{ 
                                    padding: '0.75rem', 
                                    backgroundColor: '#fef2f2', 
                                    border: '1px solid #fee2e2', 
                                    borderRadius: '12px', 
                                    color: '#dc2626', 
                                    fontSize: '0.85rem', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem', 
                                    marginBottom: '1rem' 
                                }}>
                                    <AlertCircle size={16} />
                                    <span>{error}</span>
                                </div>
                            )}
                            <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '0.95rem' }}>
                                Property se related kisi bhi jaankari ke liye humein message karein.
                            </p>

                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '1rem', top: '1.1rem', color: '#94a3b8' }} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Aapka Naam"
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1rem 1rem 3rem',
                                            borderRadius: '16px',
                                            border: '1px solid #e2e8f0',
                                            backgroundColor: '#f8fafc',
                                            outline: 'none',
                                            fontSize: '1rem'
                                        }}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <select
                                        style={{
                                            width: '90px',
                                            padding: '0.75rem',
                                            borderRadius: '16px',
                                            border: '1px solid #e2e8f0',
                                            backgroundColor: '#f8fafc',
                                            fontSize: '0.9rem'
                                        }}
                                        value={formData.countryCode}
                                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                    >
                                        {countryCodes.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                                    </select>
                                    <div style={{ position: 'relative', flex: 1 }}>
                                        <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '1.1rem', color: '#94a3b8' }} />
                                        <input
                                            type="tel"
                                            required
                                            placeholder="Mobile Number"
                                            style={{
                                                width: '100%',
                                                padding: '1rem 1rem 1rem 3rem',
                                                borderRadius: '16px',
                                                border: '1px solid #e2e8f0',
                                                backgroundColor: '#f8fafc',
                                                outline: 'none'
                                            }}
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <MessageSquare size={18} style={{ position: 'absolute', left: '1rem', top: '1.1rem', color: '#94a3b8' }} />
                                    <textarea
                                        rows="3"
                                        placeholder="Kuch puchna chahte hain?"
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1rem 1rem 3rem',
                                            borderRadius: '16px',
                                            border: '1px solid #e2e8f0',
                                            backgroundColor: '#f8fafc',
                                            outline: 'none',
                                            resize: 'none'
                                        }}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', textAlign: 'left', marginTop: '0.5rem' }}>
                                    <input type="checkbox" id="popup-consent" style={{ marginTop: '0.25rem', width: 'auto', flexShrink: 0 }} required />
                                    <label htmlFor="popup-consent" style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.4', cursor: 'pointer' }}>
                                        I consent to receiving RCS, WhatsApp, Email or SMS from Bharat Properties & I have reviewed and agree to Terms & Conditions and Privacy Policy.
                                    </label>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    style={{
                                        width: '100%',
                                        padding: '1.4rem',
                                        background: loading ? '#94a3b8' : 'var(--grad-primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '20px',
                                        fontSize: '1.15rem',
                                        fontWeight: 800,
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '12px',
                                        boxShadow: 'var(--shadow-premium)',
                                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!loading) {
                                            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(15, 23, 42, 0.3)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
                                    }}
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={20} /> Send Message</>}
                                </button>

                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default ContactPopup;
