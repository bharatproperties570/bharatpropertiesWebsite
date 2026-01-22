import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const OfficeInfo = () => {
    return (
        <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-bg-light)' }}>
            <div className="container">
                <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                    {/* Map/Image Side */}
                    <div>
                        <div style={{
                            height: '400px',
                            backgroundColor: '#e2e8f0',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            {/* Gradient Background (External videos blocked in production) */}
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    textAlign: 'center',
                                    color: 'white',
                                    padding: '2rem'
                                }}>
                                    <MapPin size={64} style={{ margin: '0 auto 1rem', opacity: 0.9 }} />
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Visit Our Office</h3>
                                    <p style={{ opacity: 0.9 }}>Sector 82, JLPL Industrial Area, Mohali</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Side */}
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                            Visit Our Office
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                            We invite you to experience our premium hospitality. Visit our main office to discuss your real estate dreams with our expert consultants over a cup of coffee.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ backgroundColor: 'white', padding: '0.75rem', borderRadius: '50%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', height: 'fit-content' }}>
                                    <MapPin color="var(--color-accent)" size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Address</h4>
                                    <p style={{ color: 'var(--color-text-muted)' }}>Sector 82, JLPL Industrial Area,<br />Mohali, Punjab 140308</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ backgroundColor: 'white', padding: '0.75rem', borderRadius: '50%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', height: 'fit-content' }}>
                                    <Phone color="var(--color-accent)" size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Phone</h4>
                                    <p style={{ color: 'var(--color-text-muted)' }}>+91 98765 43210</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ backgroundColor: 'white', padding: '0.75rem', borderRadius: '50%', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', height: 'fit-content' }}>
                                    <Clock color="var(--color-accent)" size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Hours</h4>
                                    <p style={{ color: 'var(--color-text-muted)' }}>Mon - Sat: 10:00 AM - 7:00 PM<br />Sun: By Appointment</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
};

export default OfficeInfo;
