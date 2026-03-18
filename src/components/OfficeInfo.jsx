import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation } from 'lucide-react';

const OfficeInfo = () => {
    const kkrGMapLink = "https://www.google.com/maps/dir//Bharat+Properties,+Sector+3+Market,+Sector+30,+Sector+3,+Kurukshetra,+Haryana+136118,+India/@29.9490011,76.8836256,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x390e46d0c969312b:0x8ed8c65fa39c306d!2m2!1d76.8899997!2d29.9602037";

    return (
        <section style={{ 
            padding: '5rem 0', 
            background: 'var(--color-bg-light)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Orbs */}
            <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '400px', height: '400px', background: 'var(--grad-indigo)', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '400px', height: '400px', background: 'var(--grad-gold)', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }}></div>

            <div className="container">
                {/* Centered Header */}
                <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{ 
                        background: 'var(--grad-gold)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent', 
                        fontWeight: 800, 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.2em',
                        fontSize: '0.9rem',
                        display: 'inline-block',
                        marginBottom: '1rem'
                    }}>Our Headquarters</span>
                    
                    <h2 style={{ 
                        fontSize: '3.5rem', 
                        fontFamily: 'var(--font-heading)', 
                        color: 'var(--color-primary)', 
                        lineHeight: 1.2, 
                        letterSpacing: '-0.03em',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        Let's Start Your <span className="gradient-text">Journey Home</span>
                    </h2>
                </div>

                <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'start' }}>

                    {/* Left Side: Visual/Branding */}
                    <div className="hover-lift" style={{ position: 'relative' }}>
                        <div style={{
                            height: '480px',
                            borderRadius: '2.5rem',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: 'var(--shadow-premium)',
                            background: 'var(--grad-premium)',
                        }}>
                            <div className="noise-overlay"></div>
                            
                            {/* Animated Background Content */}
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                color: 'white',
                                padding: '3rem',
                                position: 'relative',
                                zIndex: 2
                            }}>
                                <div className="animate-floating" style={{ 
                                    background: 'rgba(255,255,255,0.95)', 
                                    backdropFilter: 'blur(20px)', 
                                    padding: '1.5rem', 
                                    borderRadius: '2.5rem', 
                                    marginBottom: '1.5rem',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    width: '120px',
                                    height: '120px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Image 
                                        src="/assets/logo-main.png" 
                                        alt="Bharat Properties" 
                                        width={100} 
                                        height={100}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                                    />
                                </div>
                                <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>Visit Us</h3>
                                <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '280px', margin: '0 auto 2rem', lineHeight: 1.4 }}>Where luxury real estate meets premium consultation.</p>
                                
                                <a 
                                    href={kkrGMapLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="glass-premium"
                                    style={{ 
                                        padding: '1.25rem 2.5rem', 
                                        borderRadius: '1.25rem', 
                                        color: 'var(--color-primary)', 
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        fontWeight: 800,
                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        border: '1px solid rgba(255,255,255,0.8)',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <Navigation size={22} fill="var(--color-primary)" />
                                    Get Directions
                                </a>
                            </div>

                            {/* Decorative background shape */}
                            <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: '300px', height: '300px', background: 'var(--grad-gold)', borderRadius: '50%', opacity: 0.2, filter: 'blur(60px)' }}></div>
                        </div>
                    </div>

                    {/* Right Side: Contact Cards */}
                    <div>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {/* Kurukshetra Office Card */}
                            <div className="glass-premium hover-lift reveal stagger-delay-1" style={{ 
                                padding: '2rem', 
                                borderRadius: '2rem', 
                                border: '1px solid rgba(255,255,255,0.6)',
                                display: 'grid',
                                gridTemplateColumns: 'auto 1fr',
                                gap: '1.5rem',
                                alignItems: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ 
                                    background: 'var(--grad-premium)', 
                                    width: '60px', 
                                    height: '60px', 
                                    borderRadius: '1.25rem', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: 'white',
                                    boxShadow: 'var(--shadow-lg)'
                                }}>
                                    <MapPin size={28} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    <h4 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-primary)' }}>Kurukshetra</h4>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.5, opacity: 0.9 }}>
                                        Shop No 166, Sector 3 Market,<br />
                                        Kurukshetra, Haryana 136118
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.75rem' }}>
                                        <a href="tel:+919991333570" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <Phone size={18} fill="currentColor" /> +91 99913 33570
                                        </a>
                                        <a href={kkrGMapLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <Navigation size={18} fill="currentColor" /> Map
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Mohali Office Card */}
                            <div className="glass-premium hover-lift reveal stagger-delay-2" style={{ 
                                padding: '2rem', 
                                borderRadius: '2rem', 
                                border: '1px solid rgba(255,255,255,0.6)',
                                display: 'grid',
                                gridTemplateColumns: 'auto 1fr',
                                gap: '1.5rem',
                                alignItems: 'center',
                                opacity: 0.9
                            }}>
                                <div style={{ 
                                    background: 'var(--grad-indigo)', 
                                    width: '60px', 
                                    height: '60px', 
                                    borderRadius: '1.25rem', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: 'white',
                                    boxShadow: 'var(--shadow-lg)'
                                }}>
                                    <MapPin size={28} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    <h4 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-secondary)' }}>Mohali</h4>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.5 }}>
                                        Airport Road, Sector 82 Industrial Area,<br />
                                        Mohali, Punjab
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.75rem' }}>
                                        <a href="tel:+919991000570" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem', opacity: 0.7 }}>
                                            <Phone size={18} fill="currentColor" /> +91 99910 00570
                                        </a>
                                        <span style={{ 
                                            background: 'var(--grad-gold)', 
                                            WebkitBackgroundClip: 'text', 
                                            WebkitTextFillColor: 'transparent', 
                                            fontSize: '0.9rem', 
                                            fontWeight: 900,
                                            letterSpacing: '0.05em'
                                        }}>OPENING SOON</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-premium reveal stagger-delay-3" style={{ 
                            marginTop: '2rem', 
                            display: 'inline-flex', 
                            gap: '1.25rem', 
                            alignItems: 'center', 
                            padding: '1rem 2rem',
                            borderRadius: '2.5rem',
                            border: '1px solid rgba(255,255,255,0.4)',
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            <Clock color="var(--color-accent)" size={24} />
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', fontWeight: 500 }}>
                                <strong style={{ color: 'var(--color-primary)' }}>Consultation Hours:</strong> Mon - Sat: 10AM - 7PM
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
};

export default OfficeInfo;
