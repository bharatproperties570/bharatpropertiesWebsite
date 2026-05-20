import React, { useState } from 'react';
import { Calculator, FileText, CheckCircle, Scale, ShieldCheck, Landmark } from 'lucide-react';

const formatCurrency = (val) => {
    if (val === undefined || val === null || isNaN(val)) return '₹ 0';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(val);
};

const PropertyCostSheet = ({ property }) => {
    const [gender, setGender] = useState('male');
    const [selectedTxType, setSelectedTxType] = useState(property.transactionType || 'Full White');

    if (!property || !property.rawPrice) return null;

    const rawPrice = property.rawPrice;
    const flexiblePercentage = property.flexiblePercentage || 100;
    const collectorRate = property.collectorRate || 0;
    const collectorRateUnit = property.collectorRateUnit || 'Sq Yard';
    const collectorValue = property.collectorValue || 0;

    // Dynamic Stamp Duty Percentage based on Gender Selection
    let stampDutyPercent = 7;
    if (gender === 'female') stampDutyPercent = 5;
    else if (gender === 'joint') stampDutyPercent = 6;

    const registrationPercent = 1;
    const legalCharges = 15000;
    const brokeragePercent = 1;

    // Registry / Stamp duty base calculation matching CRM logic
    let registryValue = rawPrice;
    if (selectedTxType === 'Collector Rate') {
        registryValue = collectorValue > 0 ? collectorValue : Math.round(rawPrice * 0.6);
    } else if (selectedTxType === 'Flexible') {
        registryValue = Math.round(rawPrice * (flexiblePercentage / 100));
    }

    const stampDutyBase = registryValue;
    const stampDutyAmount = Math.round(stampDutyBase * (stampDutyPercent / 100));
    const registrationAmount = Math.round(stampDutyBase * (registrationPercent / 100));
    const brokerageAmount = Math.round(rawPrice * (brokeragePercent / 100));
    const totalGovtCharges = stampDutyAmount + registrationAmount + legalCharges;
    const grandTotal = rawPrice + totalGovtCharges + brokerageAmount;

    return (
        <section style={{ marginTop: '4rem' }}>
            {/* Section Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2.5rem' }}>
                <span style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-gold)' }}></span>
                Landed Cost Sheet & Stamp Calculator
            </div>

            {/* Premium Outer Layout Container */}
            <div className="glass-card" style={{ backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                {/* Header Gradient Banner */}
                <div style={{ padding: '2.5rem', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ padding: '12px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '16px', color: '#fbbf24' }}>
                            <Calculator size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>Landed Cost Sheet</div>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>Select transaction type and gender to calculate stamp duty dynamically</div>
                        </div>
                    </div>

                    {/* Active Mode Pill badge */}
                    <div style={{ 
                        padding: '6px 14px', 
                        background: selectedTxType === 'Full White' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(249, 115, 22, 0.15)', 
                        borderRadius: '20px', 
                        border: '1px solid',
                        borderColor: selectedTxType === 'Full White' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(249, 115, 22, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <ShieldCheck size={14} style={{ color: selectedTxType === 'Full White' ? '#4ade80' : '#fb923c' }} />
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: selectedTxType === 'Full White' ? '#4ade80' : '#fb923c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Active: {selectedTxType} {selectedTxType === 'Flexible' && `(${flexiblePercentage}%)`}
                        </span>
                    </div>
                </div>

                <div style={{ padding: '2.5rem' }}>
                    {/* Interactive Transaction Type Tab Switcher */}
                    <div className="cost-switcher-row">
                        <button
                            onClick={() => setSelectedTxType('Full White')}
                            className="cost-switcher-btn"
                            style={{
                                backgroundColor: selectedTxType === 'Full White' ? '#0F172A' : 'transparent',
                                color: selectedTxType === 'Full White' ? '#fff' : '#64748b'
                            }}
                        >
                            <span>📄</span>
                            <span>Full White</span>
                        </button>
                        <button
                            onClick={() => setSelectedTxType('Collector Rate')}
                            className="cost-switcher-btn"
                            style={{
                                backgroundColor: selectedTxType === 'Collector Rate' ? '#0F172A' : 'transparent',
                                color: selectedTxType === 'Collector Rate' ? '#fff' : '#64748b'
                            }}
                        >
                            <span>🏛️</span>
                            <span>Collector Rate</span>
                        </button>
                        {property.transactionType === 'Flexible' && (
                            <button
                                onClick={() => setSelectedTxType('Flexible')}
                                className="cost-switcher-btn"
                                style={{
                                    backgroundColor: selectedTxType === 'Flexible' ? '#0F172A' : 'transparent',
                                    color: selectedTxType === 'Flexible' ? '#fff' : '#64748b'
                                }}
                            >
                                <span>⚖️</span>
                                <span>Flexible ({flexiblePercentage}%)</span>
                            </button>
                        )}
                    </div>

                    {/* Official Collector Rate Card (No Mock Data, Fetched Live from DB) */}
                    {selectedTxType === 'Collector Rate' && (
                        <div style={{ 
                            padding: '18px 22px', 
                            backgroundColor: '#fffbeb', 
                            border: '1px solid #f59e0b', 
                            borderRadius: '20px', 
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '12px',
                            boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.05)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ padding: '8px', backgroundColor: '#fef3c7', borderRadius: '12px', color: '#d97706' }}>
                                    <Landmark size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#78350f' }}>Official Circle Rate Details</div>
                                    <div style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 600 }}>
                                        State Assessed Rate: <span style={{ fontWeight: 800 }}>{formatCurrency(collectorRate)} per {collectorRateUnit}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>Registry Base Value</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#78350f' }}>{formatCurrency(collectorValue)}</div>
                            </div>
                        </div>
                    )}

                    {/* Dynamic Gender/Ownership Segmented Selector */}
                    <div className="gender-switcher-row">
                        {[
                            { id: 'male', label: 'Male Owner', rate: '7%', icon: '👨' },
                            { id: 'female', label: 'Female Owner', rate: '5%', icon: '👩' },
                            { id: 'joint', label: 'Joint Owners', rate: '6%', icon: '👥' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setGender(item.id)}
                                className="gender-switcher-btn"
                                style={{
                                    backgroundColor: gender === item.id ? '#0F172A' : 'transparent',
                                    color: gender === item.id ? '#fff' : '#64748b',
                                    boxShadow: gender === item.id ? '0 10px 15px -3px rgba(15, 23, 42, 0.15)' : 'none'
                                }}
                            >
                                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                                <span>{item.label}</span>
                                <span style={{ 
                                    fontSize: '0.7rem', 
                                    padding: '2px 6px', 
                                    backgroundColor: gender === item.id ? 'rgba(255,255,255,0.15)' : '#e2e8f0',
                                    color: gender === item.id ? '#fff' : '#475569',
                                    borderRadius: '6px',
                                    fontWeight: 800
                                }}>{item.rate}</span>
                            </button>
                        ))}
                    </div>

                    {/* Cost Breakdown Table */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Basic consideration & White/Black component card */}
                        <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: selectedTxType !== 'Full White' ? '12px' : 0 }}>
                                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#334155' }}>Basic Sale Value (Market Price)</span>
                                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A' }}>{formatCurrency(rawPrice)}</span>
                            </div>

                            {/* Registry / Assessed value breakdown in premium layout */}
                            {selectedTxType !== 'Full White' && (
                                <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                        <span style={{ color: '#64748b', fontWeight: 600 }}>Assessed Circle Rate Base:</span>
                                        <span style={{ color: '#0F172A', fontWeight: 700 }}>{formatCurrency(stampDutyBase)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                        <span style={{ color: '#64748b', fontWeight: 600 }}>Agreement Balance Component:</span>
                                        <span style={{ color: '#e11d48', fontWeight: 700 }}>{formatCurrency(rawPrice - stampDutyBase)}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Government & Registry charges breakups */}
                        <div style={{ border: '1px solid #f1f5f9', borderRadius: '20px', overflow: 'hidden' }}>
                            <div style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Landmark size={14} /> Government & Legal Dues (Calculated on Registry Base)
                                </span>
                                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>{formatCurrency(totalGovtCharges)}</span>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Stamp Duty ({stampDutyPercent}%)</span>
                                    <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 700 }}>{formatCurrency(stampDutyAmount)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Registration Fee (1%)</span>
                                    <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 700 }}>{formatCurrency(registrationAmount)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        Legal & Documentation Charges <Scale size={12} style={{ color: '#94a3b8' }} />
                                    </span>
                                    <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 700 }}>{formatCurrency(legalCharges)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Professional & Brokerage fees */}
                        <div style={{ padding: '20px', border: '1px solid #f1f5f9', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155' }}>Agency & Advisory Fee (1%)</span>
                            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>{formatCurrency(brokerageAmount)}</span>
                        </div>

                        {/* Dynamic Total Sum Card */}
                        <div style={{ 
                            padding: '24px', 
                            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', 
                            borderRadius: '24px', 
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            boxShadow: '0 12px 24px -6px rgba(15, 23, 42, 0.2)'
                        }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Total Landed Cost</div>
                                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>All-inclusive property acquisition cost</div>
                            </div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fbbf24', letterSpacing: '-0.5px' }}>
                                {formatCurrency(grandTotal)}
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer subtext */}
                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                        <CheckCircle size={14} style={{ color: '#10b981' }} />
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, fontStyle: 'italic' }}>
                            Valuations dynamically updated matching official circle rates.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertyCostSheet;
