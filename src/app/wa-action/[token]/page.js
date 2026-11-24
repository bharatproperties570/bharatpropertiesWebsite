'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, Loader2, MapPin, Building } from 'lucide-react';

export default function WaActionPage({ params }) {
    const { token } = params;
    
    const [payload, setPayload] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        remarks: ''
    });

    useEffect(() => {
        try {
            // Very basic decode of the JWT payload to display details instantly
            // Real validation happens on backend
            if (token) {
                const base64Url = token.split('.')[1];
                if (!base64Url) throw new Error('Invalid token');
                const base64 = base64Url.replace(/-/g, '+').replace(/_/, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                
                const decoded = JSON.parse(jsonPayload);
                setPayload(decoded);
            }
        } catch (e) {
            console.error('Failed to parse token payload:', e);
            setError('Invalid or Expired Link.');
        } finally {
            setLoading(false);
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            const response = await fetch('/api/public/wa-site-visit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token,
                    date: formData.date,
                    time: formData.time,
                    remarks: formData.remarks
                })
            });

            const result = await response.json();
            if (result.success) {
                setSubmitted(true);
            } else {
                throw new Error(result.message || 'Failed to schedule');
            }
        } catch (err) {
            setError(err.message || 'Failed to connect. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
                <Loader2 className="animate-spin text-primary" size={48} style={{ color: '#4F46E5' }} />
            </div>
        );
    }

    if (error && !payload) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
                <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', textAlign: 'center' }}>
                    <h2 style={{ color: '#EF4444', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Link Error</h2>
                    <p style={{ color: '#64748B' }}>{error}</p>
                </div>
            </div>
        );
    }

    const firstProperty = payload?.properties?.[0] || {};
    const projectName = firstProperty.name || 'Your Matched Property';

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem 1rem' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
                
                {/* Header */}
                <div style={{ backgroundColor: '#4F46E5', padding: '2rem', textAlign: 'center', color: 'white' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Schedule Site Visit</h1>
                    <p style={{ margin: 0, opacity: 0.9 }}>Pick a time to view your matched property</p>
                </div>

                <div style={{ padding: '2rem' }}>
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <CheckCircle size={64} color="#22C55E" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ color: '#166534', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Visit Scheduled!</h2>
                            <p style={{ color: '#15803D' }}>Our executive will call you shortly to confirm your appointment for {projectName}.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {/* Property Details Display */}
                            <div style={{ backgroundColor: '#EEF2FF', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <Building size={20} color="#4F46E5" />
                                    <span style={{ fontWeight: '600', color: '#1E293B', fontSize: '1.1rem' }}>{projectName}</span>
                                </div>
                                
                                {(!payload?.hideUnit && firstProperty.unit) && (
                                    <div style={{ color: '#475569', marginLeft: '2.2rem', marginBottom: '0.25rem' }}>
                                        Unit: <span style={{ fontWeight: '500' }}>{firstProperty.unit}</span> {firstProperty.block ? `| Block: ${firstProperty.block}` : ''}
                                    </div>
                                )}
                                
                                {(!payload?.hideLocation) && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', marginLeft: '1.75rem' }}>
                                        <MapPin size={16} />
                                        <span>Site Location</span>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#475569' }}>Date</label>
                                    <div style={{ position: 'relative' }}>
                                        <Calendar size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                        <input
                                            type="date"
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            style={{
                                                width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem',
                                                border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem',
                                                outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#475569' }}>Time</label>
                                    <div style={{ position: 'relative' }}>
                                        <Clock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                        <select
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            style={{
                                                width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem',
                                                border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem',
                                                outline: 'none', transition: 'border-color 0.2s', backgroundColor: 'white', boxSizing: 'border-box'
                                            }}
                                        >
                                            <option value="10:00">10:00 AM</option>
                                            <option value="11:00">11:00 AM</option>
                                            <option value="12:00">12:00 PM</option>
                                            <option value="14:00">02:00 PM</option>
                                            <option value="15:00">03:00 PM</option>
                                            <option value="16:00">04:00 PM</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#475569' }}>Message (Optional)</label>
                                <textarea
                                    rows="2"
                                    placeholder="Any specific requests?"
                                    value={formData.remarks}
                                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                                    style={{
                                        width: '100%', padding: '0.75rem', border: '2px solid #e2e8f0',
                                        borderRadius: '8px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box',
                                        fontFamily: 'inherit', resize: 'vertical'
                                    }}
                                />
                            </div>

                            {error && (
                                <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                style={{
                                    width: '100%', padding: '1rem', backgroundColor: submitting ? '#94a3b8' : '#4F46E5',
                                    color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem',
                                    fontWeight: 'bold', cursor: submitting ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                }}
                            >
                                {submitting && <Loader2 className="animate-spin" size={20} />}
                                {submitting ? 'Confirming...' : 'Confirm Site Visit'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
