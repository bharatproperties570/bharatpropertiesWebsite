import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = ({ onPrivacyClick, onTermsClick, onCalculatorClick, onAboutClick }) => {
    return (
        <footer style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '4rem 0 2rem' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>

                {/* Brand */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <img src={logo.src} alt="Bharat Properties" style={{ height: '50px', width: 'auto' }} />
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', margin: 0 }}>Bharat Properties</h3>
                    </div>
                    <p style={{ color: 'var(--color-text-light)', opacity: 0.8, marginBottom: '1.5rem' }}>
                        Elevating your lifestyle with premium real estate solutions. We find homes that match your dreams.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="https://instagram.com" aria-label="Visit our Instagram"><Instagram size={20} /></a>
                        <a href="https://facebook.com" aria-label="Visit our Facebook"><Facebook size={20} /></a>
                        <a href="https://twitter.com" aria-label="Visit our Twitter"><Twitter size={20} /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ marginBottom: '1.5rem', color: 'white' }}>Quick Links</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.8 }}>
                        <a href="#">Home</a>
                        <button onClick={onCalculatorClick} style={{ background: 'none', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: 'inherit', fontFamily: 'inherit' }}>
                            EMI Calculator
                        </button>
                        <a href="#featured">Featured Properties</a>
                        <button onClick={onAboutClick} style={{ background: 'none', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: 'inherit', fontFamily: 'inherit' }}>
                            About Us
                        </button>
                        <a href="#agents">Our Agents</a>
                        <a href="#blog">Market News</a>
                        <button onClick={onPrivacyClick} style={{ background: 'none', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: 'inherit', fontFamily: 'inherit' }}>
                            Privacy Policy
                        </button>
                        <button onClick={onTermsClick} style={{ background: 'none', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: 'inherit', fontFamily: 'inherit' }}>
                            Terms & Conditions
                        </button>
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h4 style={{ marginBottom: '1.5rem', color: 'white' }}>Contact Us</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.8 }}>
                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                            <MapPin size={18} style={{ marginTop: '0.2rem' }} />
                            <div>
                                <strong style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '0.2rem' }}>Kurukshetra Office</strong>
                                <span style={{ fontSize: '0.9rem' }}>Shop No 166, Sector 3, Huda Market, Kurukshetra<br />Phone: +91 9991333570</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                            <MapPin size={18} style={{ marginTop: '0.2rem' }} />
                            <div>
                                <strong style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '0.2rem' }}>Mohali Office</strong>
                                <span style={{ fontSize: '0.9rem' }}>Airport Road, Sector 82 Industrial Area, Mohali<br />Phone: 9991000570, 9996000570</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                            <Mail size={18} />
                            <span>info&#64;bharatproperties.co</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '3rem', paddingTop: '2rem', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
                &copy; {new Date().getFullYear()} Bharat Properties. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
