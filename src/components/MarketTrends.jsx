import React from 'react';
import { TrendingUp, Award, BarChart3, ShieldCheck } from 'lucide-react';

const MarketTrends = () => {
    const trends = [
        {
            title: 'Average ROI',
            value: '8.4%',
            icon: <TrendingUp className="text-emerald-500" />,
            desc: 'Annual appreciation rate in North India regions.',
            trendColor: '#059669'
        },
        {
            title: 'Trusted Assets',
            value: '500+',
            icon: <ShieldCheck className="text-blue-500" />,
            desc: 'Verified premium properties listed this year.',
            trendColor: '#2563eb'
        },
        {
            title: 'Market Growth',
            value: '+12.5%',
            icon: <BarChart3 className="text-amber-500" />,
            desc: 'Quarterly increase in luxury home demand.',
            trendColor: '#d97706'
        },
        {
            title: 'Sustainability',
            value: '65%',
            icon: <Award className="text-gold-500" />,
            desc: 'Properties now feature eco-friendly ratings.',
            trendColor: 'var(--color-gold)'
        }
    ];

    return (
        <section style={{ padding: 'var(--spacing-xl) 0', backgroundColor: 'var(--color-primary)', color: 'white', overflow: 'hidden' }}>
            <div className="container reveal">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.1, color: 'white' }}>
                            Data-Driven <br />
                            <span style={{ color: 'var(--color-gold)' }}>Real Estate Insights</span>
                        </h2>
                        <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '3rem', lineHeight: 1.6 }}>
                            We help you make informed decisions by tracking real-time market trends,
                            appreciation rates, and locality growth potential.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {trends.map((trend, index) => (
                                <div key={index} style={{
                                    padding: '1.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    transition: 'transform 0.3s ease'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{ color: trend.trendColor }}>{trend.icon}</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{trend.value}</div>
                                    </div>
                                    <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'white' }}>{trend.title}</h4>
                                    <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>{trend.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        {/* Abstract Visual Representation of a Graph */}
                        <div style={{
                            width: '100%',
                            height: '400px',
                            borderRadius: 'var(--radius-lg)',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                width: '150%',
                                height: '150%',
                                background: 'radial-gradient(circle, var(--color-gold) 0%, transparent 70%)',
                                opacity: 0.05,
                                filter: 'blur(50px)'
                            }}></div>

                            <div style={{ textAlign: 'center', zIndex: 2 }}>
                                <TrendingUp size={80} style={{ color: 'var(--color-gold)', opacity: 0.5, marginBottom: '2rem' }} />
                                <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '1rem' }}>Future Growth 2026</h3>
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                    {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                                        <div key={i} style={{
                                            width: '12px',
                                            height: `${h}px`,
                                            backgroundColor: i === 5 ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)',
                                            borderRadius: '50px',
                                            alignSelf: 'flex-end',
                                            transition: 'height 1s ease'
                                        }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketTrends;
