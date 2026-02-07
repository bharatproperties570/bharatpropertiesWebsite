'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, PieChart, IndianRupee } from 'lucide-react';

const HomeLoanCalculator = () => {
    const [amount, setAmount] = useState(5000000); // 50 Lakhs default
    const [rate, setRate] = useState(8.5); // 8.5% default
    const [tenure, setTenure] = useState(20); // 20 Years default

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Derived State Calculation
    const principal = parseFloat(amount);
    const calculatedInterest = parseFloat(rate) / 12 / 100;
    const calculatedPayments = parseFloat(tenure) * 12;

    // EMI Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    let emi = 0;
    let totalAmount = 0;
    let totalInterest = 0;

    if (isFinite(monthly)) {
        emi = monthly.toFixed(0);
        totalAmount = (monthly * calculatedPayments).toFixed(0);
        totalInterest = (monthly * calculatedPayments - principal).toFixed(0);
    }

    // Helper to format currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    // Pie Chart Calculation
    const interestPercent = (totalInterest / totalAmount) * 100;

    return (
        <div style={{ padding: '8rem 0 4rem', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
            <div className="container reveal">

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                        <Calculator size={40} /> Home Loan EMI Calculator
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                        Plan your dream home budget with our easy-to-use EMI calculator.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {/* Input Section */}
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem', color: 'var(--color-primary)' }}>Loan Details</h3>

                        {/* Loan Amount */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Loan Amount</label>
                                <span style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>{formatCurrency(amount)}</span>
                            </div>
                            <input
                                type="range"
                                min="100000"
                                max="100000000"
                                step="100000"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                            />
                        </div>

                        {/* Interest Rate */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Interest Rate (%)</label>
                                <span style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>{rate} %</span>
                            </div>
                            <input
                                type="range"
                                min="5"
                                max="15"
                                step="0.1"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                            />
                        </div>

                        {/* Tenure */}
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Loan Tenure (Years)</label>
                                <span style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>{tenure} Yr</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="30"
                                step="1"
                                value={tenure}
                                onChange={(e) => setTenure(e.target.value)}
                                style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                            />
                        </div>
                    </div>

                    {/* Result Section */}
                    <div style={{ backgroundColor: 'var(--color-primary)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                        <div>
                            <h3 style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '0.5rem' }}>Monthly EMI</h3>
                            <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--color-gold)' }}>
                                {formatCurrency(emi)}
                            </div>

                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ opacity: 0.8 }}>Principal Amount</span>
                                    <span style={{ fontWeight: 600 }}>{formatCurrency(amount)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ opacity: 0.8 }}>Total Interest</span>
                                    <span style={{ fontWeight: 600 }}>{formatCurrency(totalInterest)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontWeight: 700, fontSize: '1.1rem' }}>
                                    <span>Total Amount Payable</span>
                                    <span>{formatCurrency(totalAmount)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Simple CSS Pie Chart representation */}
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                            <div style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                                background: `conic-gradient(var(--color-gold) 0% ${interestPercent}%, rgba(255,255,255,0.2) ${interestPercent}% 100%)`,
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '100px',
                                    height: '100px',
                                    backgroundColor: 'var(--color-primary)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    fontSize: '0.8rem'
                                }}>
                                    <div style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Interest</div>
                                    <div style={{ opacity: 0.7 }}>{interestPercent.toFixed(0)}%</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.7 }}>
                            Breakdown: Gold (Interest) vs. Light (Principal)
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default HomeLoanCalculator;
