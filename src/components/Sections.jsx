'use client';
import React from 'react';
import { Shield, Star, Users, Phone, Mail, MapPin } from 'lucide-react';
import { countryCodes } from '../data/countryCodes';

export const AboutSection = () => {
    return (
        <section id="about" style={{ padding: 'var(--spacing-xl) 0' }}>
            <div className="container reveal">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80"
                            alt="Luxury Interior"
                            style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)' }}
                        />
                    </div>
                    <div>
                        <h2 style={{
                            fontSize: '2.5rem',
                            marginBottom: '1.5rem',
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--color-primary)'
                        }}>
                            Excellence in Real Estate
                        </h2>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                            With over 20 years of experience in the luxury market, Luxe Estate has established itself as the premier agency for discerning clients. We don't just sell homes; we curate lifestyles.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                            <div>
                                <h3 style={{ fontSize: '2.5rem', color: 'var(--color-accent)', fontWeight: 700 }}>$2B+</h3>
                                <p style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>In Sales</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2.5rem', color: 'var(--color-accent)', fontWeight: 700 }}>500+</h3>
                                <p style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>Happy Clients</p>
                            </div>
                        </div>
                        <button style={{
                            marginTop: '2rem',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            padding: '1rem 2rem',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 600
                        }}>
                            Learn More About Us
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const ContactSection = () => {
    return (
        <section id="contact" style={{ padding: 'var(--spacing-xl) 0', backgroundColor: 'var(--color-bg-light)' }}>
            <div className="container reveal" style={{ maxWidth: '800px', textAlign: 'center' }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-primary)'
                }}>
                    Begin Your Journey
                </h2>
                <p style={{ marginBottom: '3rem', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                    Ready to find your dream property? Our concierge team is standing by to assist you.
                </p>

                <div style={{
                    backgroundColor: 'white',
                    padding: '3rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <form style={{ display: 'grid', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <input type="text" placeholder="Name" style={inputStyle} />
                            <input type="email" placeholder="Email" style={inputStyle} />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <select style={{ ...inputStyle, width: '100px' }} defaultValue="+91">
                                {countryCodes.map((item) => (
                                    <option key={`${item.country}-${item.code}`} value={item.code}>
                                        {item.flag} {item.code}
                                    </option>
                                ))}
                            </select>
                            <input type="tel" placeholder="Phone Number" style={{ ...inputStyle, flex: 1 }} />
                        </div>
                        <textarea placeholder="Message" rows="4" style={inputStyle}></textarea>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', textAlign: 'left', marginTop: '0.5rem' }}>
                            <input type="checkbox" id="consent" style={{ marginTop: '0.25rem', width: 'auto', flexShrink: 0 }} required />
                            <label htmlFor="consent" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.4', cursor: 'pointer' }}>
                                I consent to receiving RCS, WhatsApp, Email or SMS from Bharat Properties & I have reviewed and agree to Terms & Conditions and Privacy Policy.
                            </label>
                        </div>
                        <button type="submit" style={{
                            backgroundColor: 'var(--color-accent)',
                            color: 'white',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 600,
                            fontSize: '1rem',
                            marginTop: '1rem'
                        }}>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

const inputStyle = {
    width: '100%',
    padding: '1rem',
    border: '1px solid #cbd5e1',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s'
};
