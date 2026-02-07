import React, { useState, useEffect } from 'react';
import { X, Send, User, Mail, Phone, MessageSquare, CheckCircle, Shield } from 'lucide-react';
import { countryCodes } from '../data/countryCodes';

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

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact Form Data:', formData);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            onClose();
        }, 3000);
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
            backgroundColor: isVisible ? 'rgba(15, 23, 42, 0.4)' : 'rgba(15, 23, 42, 0)',
            backdropFilter: isVisible ? 'blur(8px)' : 'blur(0px)',
            transition: 'all 0.5s ease',
            pointerEvents: isOpen ? 'all' : 'none'
        }} onClick={(e) => e.target === e.currentTarget && onClose()}>

            <div style={{
                backgroundColor: 'white',
                width: '100%',
                maxWidth: '500px',
                borderRadius: '30px',
                overflow: 'hidden',
                position: 'relative',
                transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(40px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 25px 70px -15px rgba(0,0,0,0.3)'
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
                            height: '120px',
                            background: 'var(--grad-primary)',
                            padding: '2rem',
                            display: 'flex',
                            alignItems: 'flex-end'
                        }}>
                            <h2 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Contact Us</h2>
                        </div>

                        <form onSubmit={handleSubmit} style={{ padding: '2.5rem' }}>
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

                                <button type="submit" style={{
                                    width: '100%',
                                    padding: '1.25rem',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '18px',
                                    fontSize: '1.1rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    boxShadow: '0 15px 30px -10px rgba(15, 23, 42, 0.4)',
                                    transition: 'all 0.3s'
                                }}>
                                    <Send size={18} /> Send Message
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
