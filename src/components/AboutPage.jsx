import React from 'react';
import { MapPin, CheckCircle, Target, MessageSquare, Quote, Globe, Building2, Briefcase, Zap, Shield } from 'lucide-react';

const AboutPage = ({ onBookConsultation, onTalkToExpert }) => {
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: '100px' }}>
            {/* Hero Section */}
            <section style={{
                padding: '6rem 0',
                background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        🏢 About Us – <span style={{ color: 'var(--color-primary)' }}>Bharat Properties</span>
                    </h1>
                    <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', opacity: 0.9 }}>
                        Bharat Properties ek trusted aur fast-growing real estate consultancy hai jo North India ke key cities me buyers, sellers aur investors ko verified, transparent aur result-oriented property solutions provide karti hai.
                    </p>
                </div>
            </section>

            {/* Presence Section */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>
                            🌍 Our Presence – North India Coverage
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
                            Hum sirf Kurukshetra tak limited nahi hain. Aaj Bharat Properties North India ke multiple prime real estate markets me actively kaam karta hai.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div style={cardStyle}>
                            <h3 style={cityTitleStyle}>Haryana</h3>
                            <p style={cityListStyle}>Kurukshetra, Karnal, Ambala, Panipat, Hisar, Kaithal, Jind, Gurugram (Gurgaon), Faridabad</p>
                        </div>
                        <div style={cardStyle}>
                            <h3 style={cityTitleStyle}>Chandigarh Tricity</h3>
                            <p style={cityListStyle}>Chandigarh, Mohali, Panchkula</p>
                        </div>
                        <div style={cardStyle}>
                            <h3 style={cityTitleStyle}>Punjab</h3>
                            <p style={cityListStyle}>Patiala, Ludhiana, Jalandhar, Amritsar</p>
                        </div>
                        <div style={cardStyle}>
                            <h3 style={cityTitleStyle}>NCR</h3>
                            <p style={cityListStyle}>Delhi, Noida</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section style={{ padding: '5rem 0', backgroundColor: '#F8FAFC' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem' }}>
                                🔍 Real Estate Services Across North India
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.7' }}>
                                Bharat Properties ek one-stop real estate solution hai jahan aapko milta hai:
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
                                <li style={listItemStyle}><CheckCircle size={18} color="var(--color-primary)" /> Property for Sale in North India</li>
                                <li style={listItemStyle}><CheckCircle size={18} color="var(--color-primary)" /> Residential Plots, Houses & Floors</li>
                                <li style={listItemStyle}><CheckCircle size={18} color="var(--color-primary)" /> Commercial Shops, Offices, SCOs</li>
                                <li style={listItemStyle}><CheckCircle size={18} color="var(--color-primary)" /> Industrial or agricultural properties</li>
                                <li style={listItemStyle}><CheckCircle size={18} color="var(--color-primary)" /> Direct Owner & Developer Properties</li>
                                <li style={listItemStyle}><CheckCircle size={18} color="var(--color-primary)" /> Investor & Joint Venture (JV) Deals</li>
                                <li style={listItemStyle}><CheckCircle size={18} color="var(--color-primary)" /> Bank Auction & Institutional Properties</li>
                            </ul>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <img
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Modern Office"
                                style={{ width: '100%', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' }}
                            />
                            <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', backgroundColor: 'var(--color-primary)', color: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                                <Briefcase size={32} />
                                <div style={{ fontWeight: 800, fontSize: '1.2rem', marginTop: '8px' }}>Verified Listings</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Trust Section */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A' }}>
                            ⭐ Why Bharat Properties is Trusted
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <div style={featureCardStyle}>
                            <Zap color="var(--color-primary)" size={40} style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Verified & Genuine</h3>
                            <p style={{ color: '#64748b' }}>Hum sirf verified properties deal karte hain. No fake listings.</p>
                        </div>
                        <div style={featureCardStyle}>
                            <Globe color="var(--color-primary)" size={40} style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Multi-city Expertise</h3>
                            <p style={{ color: '#64748b' }}>North India ke har major city ka real estate market ka gehra gyan.</p>
                        </div>
                        <div style={featureCardStyle}>
                            <Shield color="var(--color-primary)" size={40} style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Transparent Process</h3>
                            <p style={{ color: '#64748b' }}>Poore process me transparency aur trust hamari priority hai.</p>
                        </div>
                        <div style={featureCardStyle}>
                            <Building2 color="var(--color-primary)" size={40} style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>CRM Integration</h3>
                            <p style={{ color: '#64748b' }}>Professional CRM-based working system se faster service.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO & Platform Section */}
            <section style={{ padding: '5rem 0', backgroundColor: '#F1F5F9' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '2rem' }}>
                            📈 Digital-Driven Real Estate Platform
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', textAlign: 'left' }}>
                            <div style={listItemStyle}>✅ Verified properties online available</div>
                            <div style={listItemStyle}>✅ City-wise & sector-wise listings</div>
                            <div style={listItemStyle}>✅ Clear, updated information</div>
                            <div style={listItemStyle}>✅ Professional enquiry handling</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="container">
                    <Target size={48} color="var(--color-primary)" style={{ margin: '0 auto 1.5rem' }} />
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>Our Mission</h2>
                    <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-primary)', fontStyle: 'italic' }}>
                        “North India me real estate ko transparent, professional aur stress-free banana.”
                    </p>
                </div>
            </section>

            {/* Founder Section */}
            <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC' }}>
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: 'white', padding: '4rem', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', position: 'relative' }}>
                        <Quote size={60} color="#E2E8F0" style={{ position: 'absolute', top: '20px', left: '20px' }} />
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '3rem' }}>
                            👤 CEO & Founder’s Message
                        </h2>
                        <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#334155', marginBottom: '2rem', fontWeight: 500 }}>
                            <p style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Bharat Properties</p>

                            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
                                “Bharat Properties ki shuruaat ek simple soch ke saath hui thi —<br />
                                real estate ko honest, transparent aur professional banana.”
                            </p>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Aaj jab hum Kurukshetra se le kar North India ke multiple cities me kaam kar rahe hain,<br />
                                to humari priority ab bhi wahi hai:
                            </p>

                            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                <li style={listItemStyle}><CheckCircle size={18} color="var(--color-primary)" /> Client ko genuine options dena</li>
                                <li style={listItemStyle}><CheckCircle size={18} color="var(--color-primary)" /> False promises se door rehna</li>
                                <li style={listItemStyle}><CheckCircle size={18} color="var(--color-primary)" /> Har deal me clarity aur trust maintain karna</li>
                            </ul>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Main manta hoon ki real estate sirf buying-selling ka kaam nahi hai,<br />
                                ye logon ke life decisions se juda hota hai.<br />
                                Isliye Bharat Properties me hum sirf deal close karne par focus nahi karte,<br />
                                balki client ko sahi decision lene me guide karte hain.
                            </p>

                            <p>
                                Chahe aap property buy, sell ya invest karna chahte ho,<br />
                                hum aapke saath ek long-term, transparent aur safe real estate journey banana chahte hain.”
                            </p>
                        </div>
                        <div style={{ textAlign: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '2rem' }}>
                            <div style={{ fontWeight: 800, fontSize: '1.4rem' }}>— CEO & Founder</div>
                            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1e293b', marginBottom: '4px' }}>Bharat Properties</div>
                            <div style={{ color: '#64748b', marginTop: '4px' }}>Expert Consultant Since 2001</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section style={{ padding: '5rem 0', textAlign: 'center', backgroundColor: 'var(--color-primary)', color: 'white' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>📞 Connect with Bharat Properties</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9 }}>
                        Agar aap North India ke kisi bhi city me property buy, sell ya invest karna chahte hain, <br />
                        to Bharat Properties aapka trusted real estate partner hai.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button onClick={onBookConsultation} style={ctaButtonStyle}>Book a Consultation</button>
                        <button onClick={onTalkToExpert} style={{ ...ctaButtonStyle, backgroundColor: 'white', color: 'var(--color-primary)' }}>Talk to Experts</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

const cardStyle = {
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    border: '1px solid #F1F5F9',
    transition: 'transform 0.3s ease'
};

const cityTitleStyle = {
    fontSize: '1.3rem',
    fontWeight: 800,
    color: 'var(--color-primary)',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
};

const cityListStyle = {
    fontSize: '0.95rem',
    color: '#64748b',
    lineHeight: '1.6'
};

const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#334155'
};

const featureCardStyle = {
    padding: '2.5rem',
    backgroundColor: '#fff',
    borderRadius: '24px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
    border: '1px solid #F1F5F9',
    textAlign: 'center'
};

const ctaButtonStyle = {
    padding: '1.2rem 2.5rem',
    borderRadius: '16px',
    border: 'none',
    fontWeight: 800,
    fontSize: '1.1rem',
    cursor: 'pointer',
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease'
};

export default AboutPage;
