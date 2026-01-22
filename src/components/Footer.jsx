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
                        <img src={logo} alt="Bharat Properties" style={{ height: '50px', width: 'auto' }} />
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', margin: 0 }}>Bharat Properties</h3>
                    </div>
                    <p style={{ color: 'var(--color-text-light)', opacity: 0.8, marginBottom: '1.5rem' }}>
                        Elevating your lifestyle with premium real estate solutions. We find homes that match your dreams.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Instagram size={20} />
                        <Facebook size={20} />
                        <Twitter size={20} />
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
                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                            <MapPin size={18} />
                            <span>Shop No 166, Sector 3, Huda Market, Kurukshetra, Haryana 136118</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                            <Phone size={18} />
                            <span>+91 9991000570, +91 9991333570</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                            <Mail size={18} />
                            <span>info@bharatproperties.co</span>
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
