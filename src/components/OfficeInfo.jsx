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
                            {/* Video: Location Map Route -> Exterior -> Interior with People working */}
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            >
                                <source src="https://assets.mixkit.co/videos/preview/mixkit-busy-office-with-people-working-at-desks-4351-large.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Overlay Text */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                padding: '1.5rem',
                                color: 'white'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                    <MapPin size={18} color="var(--color-gold)" />
                                    <span style={{ fontWeight: 600, fontSize: '1rem' }}>Our Headquarters Location</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                                    Watch: Route map & interior tour of our busy workspace.
                                </p>
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
        </section>
    );
};

export default OfficeInfo;
