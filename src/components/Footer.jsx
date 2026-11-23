/* global process */
import React from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import logo from '../assets/logo.png';
import ReraBadge from './ReraBadge';

const Footer = () => {
    const fbUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/bharatproperties570';
    const igUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/bhaaratproperties';
    const liUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/company/42752175/';
    const twUrl = process.env.NEXT_PUBLIC_TWITTER_URL;

    return (
        <footer style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '4rem 0 2rem' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>

                {/* Brand */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <Image src={logo} alt="Bharat Properties" width={160} height={50} style={{ height: '50px', width: 'auto' }} />
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', margin: 0 }}>Bharat Properties</h3>
                    </div>
                    <p style={{ color: 'var(--color-text-light)', opacity: 0.8, marginBottom: '1.5rem' }}>
                        Elevating your lifestyle with premium real estate solutions. We find homes that match your dreams.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                        {igUrl && <a href={igUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram" style={{ color: 'white', opacity: 0.85 }}><Instagram size={20} /></a>}
                        {fbUrl && <a href={fbUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook" style={{ color: 'white', opacity: 0.85 }}><Facebook size={20} /></a>}
                        {liUrl && <a href={liUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn" style={{ color: 'white', opacity: 0.85 }}><Linkedin size={20} /></a>}
                        {twUrl && <a href={twUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter" style={{ color: 'white', opacity: 0.85 }}><Twitter size={20} /></a>}
                    </div>
                    <ReraBadge />
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ marginBottom: '1.5rem', color: 'white' }}>Quick Links</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.8 }}>
                        <a href="/">Home</a>
                        <a href="/calculator" style={{ textDecoration: 'none', color: 'inherit' }}>
                            EMI Calculator
                        </a>
                        <a href="#featured">Featured Properties</a>
                        <a href="/maps" style={{ textDecoration: 'none', color: 'inherit' }}>Map Downloads</a>
                        <a href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                            About Us
                        </a>
                        <a href="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Blog &amp; Market Insights
                        </a>
                        <a href="/locations" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Our Offices
                        </a>
                        <a href="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Privacy Policy
                        </a>
                        <a href="/terms" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Terms & Conditions
                        </a>
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h4 style={{ marginBottom: '1.5rem', color: 'white' }}>Contact Us</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.8 }}>
                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                            <MapPin size={18} style={{ marginTop: '0.2rem', color: 'var(--color-gold)' }} />
                            <div>
                                <strong style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '0.2rem' }}>Kurukshetra Office (HQ)</strong>
                                <span style={{ fontSize: '0.9rem' }}>Shop No 166, Sector 3 Market, Kurukshetra<br />Phone: <a href="tel:+919991333570" style={{ color: 'inherit', textDecoration: 'none' }}>+91 9991333570</a></span>
                                <a href="https://maps.app.goo.gl/Yfr1YSYGP1mrLbNR6" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-gold)', fontSize: '0.85rem', textDecoration: 'none', marginTop: '0.3rem' }}>
                                    <span>View on Google Maps</span>
                                    <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                            <MapPin size={18} style={{ marginTop: '0.2rem', color: 'var(--color-gold)' }} />
                            <div>
                                <strong style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '0.2rem' }}>Mohali Office</strong>
                                <span style={{ fontSize: '0.9rem' }}>Airport Road, Sector 82 Industrial Area, Mohali<br />Phone: <a href="tel:+919991000570" style={{ color: 'inherit', textDecoration: 'none' }}>+91 9991000570</a>, <a href="tel:+919996000570" style={{ color: 'inherit', textDecoration: 'none' }}>+91 9996000570</a></span>
                                <a href="https://maps.app.goo.gl/SrXsJrh5L23qLEtM6" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-gold)', fontSize: '0.85rem', textDecoration: 'none', marginTop: '0.3rem' }}>
                                    <span>View on Google Maps</span>
                                    <ExternalLink size={12} />
                                </a>
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
