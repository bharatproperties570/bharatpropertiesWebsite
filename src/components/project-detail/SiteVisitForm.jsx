import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { countryCodes } from '../../data/countryCodes';

const SiteVisitForm = ({ projectName }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+91',
        phone: '',
        date: '',
        time: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Replace with actual API call to your CRM
        console.log('Site visit request:', { ...formData, project: projectName });
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    return (
        <section style={{ padding: '3rem 0', backgroundColor: 'white' }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: 'var(--color-primary)',
                            marginBottom: '0.5rem'
                        }}>
                            Schedule a Site Visit
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                            Visit {projectName} and explore your future home
                        </p>
                    </div>

                    {submitted ? (
                        <div style={{
                            backgroundColor: '#F0FDF4',
                            border: '2px solid #86EFAC',
                            borderRadius: 'var(--radius-lg)',
                            padding: '3rem',
                            textAlign: 'center'
                        }}>
                            <CheckCircle size={64} color="#22C55E" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ color: '#166534', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                Site Visit Scheduled!
                            </h3>
                            <p style={{ color: '#15803D' }}>
                                Our team will contact you shortly to confirm your visit.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{
                            backgroundColor: 'white',
                            borderRadius: 'var(--radius-lg)',
                            padding: '2.5rem',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid #e2e8f0'
                        }}>
                            {/* Name and Phone */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.5rem',
                                        fontWeight: 600,
                                        color: 'var(--color-text-main)'
                                    }}>
                                        <User size={18} />
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your full name"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: 'var(--radius-md)',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.2s'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.5rem',
                                        fontWeight: 600,
                                        color: 'var(--color-text-main)'
                                    }}>
                                        <Phone size={18} />
                                        Phone Number *
                                    </label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <select
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleChange}
                                            style={{
                                                width: '100px',
                                                padding: '0.75rem 0.5rem',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: 'var(--radius-md)',
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                transition: 'border-color 0.2s',
                                                backgroundColor: 'white',
                                                cursor: 'pointer'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                        >
                                            {countryCodes.map((item) => (
                                                <option key={`${item.country}-${item.code}`} value={item.code}>
                                                    {item.flag} {item.code}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your phone number"
                                            style={{
                                                flex: 1,
                                                padding: '0.75rem 1rem',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: 'var(--radius-md)',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'border-color 0.2s'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.5rem',
                                    fontWeight: 600,
                                    color: 'var(--color-text-main)'
                                }}>
                                    <Mail size={18} />
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your@email.com"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>

                            {/* Date and Time */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.5rem',
                                        fontWeight: 600,
                                        color: 'var(--color-text-main)'
                                    }}>
                                        <Calendar size={18} />
                                        Preferred Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        min={today}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: 'var(--radius-md)',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.2s'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.5rem',
                                        fontWeight: 600,
                                        color: 'var(--color-text-main)'
                                    }}>
                                        <Clock size={18} />
                                        Preferred Time *
                                    </label>
                                    <select
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: 'var(--radius-md)',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.2s',
                                            backgroundColor: 'white'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    >
                                        <option value="">Select time</option>
                                        <option value="09:00">09:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                        <option value="12:00">12:00 PM</option>
                                        <option value="14:00">02:00 PM</option>
                                        <option value="15:00">03:00 PM</option>
                                        <option value="16:00">04:00 PM</option>
                                        <option value="17:00">05:00 PM</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: 600,
                                    color: 'var(--color-text-main)'
                                }}>
                                    Additional Message (Optional)
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Any specific requirements or questions..."
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-primary)'}
                            >
                                <Send size={20} />
                                Schedule Site Visit
                            </button>
                        </form>
                    )}

                    {/* Info Box */}
                    <div style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        backgroundColor: '#EEF2FF',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid #C7D2FE'
                    }}>
                        <p style={{ color: '#4F46E5', fontSize: '0.9rem', margin: 0, textAlign: 'center' }}>
                            💡 Our team will contact you within 24 hours to confirm your site visit appointment
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SiteVisitForm;
