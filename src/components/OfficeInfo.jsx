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
                                    <p style={{ opacity: 0.9 }}>Shop No 166, Sector 3, Huda Market, Kurukshetra</p>
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

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            {/* Kurukshetra Office */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-primary)' }}>
                                    <MapPin size={24} />
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Kurukshetra Office</h4>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <MapPin size={18} style={{ color: 'var(--color-accent)', marginTop: '0.2rem' }} />
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Shop No 166, Sector 3, Huda Market,<br />Kurukshetra, Haryana 136118</p>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <Phone size={18} style={{ color: 'var(--color-accent)' }} />
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>+91 9991333570</p>
                                </div>
                            </div>

                            {/* Mohali Office */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-primary)' }}>
                                    <MapPin size={24} />
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Mohali Office</h4>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <MapPin size={18} style={{ color: 'var(--color-accent)', marginTop: '0.2rem' }} />
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Airport Road, Sector 82 Industrial Area,<br />Mohali, Punjab</p>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <Phone size={18} style={{ color: 'var(--color-accent)' }} />
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>9991000570, 9996000570</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', opacity: 0.8 }}>
                            <Clock color="var(--color-accent)" size={20} />
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                                <strong>Hours:</strong> Mon - Sat: 10:00 AM - 7:00 PM | Sun: By Appointment
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
};

export default OfficeInfo;
