import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function FAQ({
    faqs = [],
    title = 'Frequently Asked Questions',
    subtitle = 'Clear, transparent answers to common real estate questions.',
}) {
    // Only render questions that have valid answers and are NOT pending owner verification
    const validFaqs = faqs.filter((f) => f && f.question && f.answer && !f.answer.includes('TODO_OWNER'));

    if (!validFaqs.length) return null;

    return (
        <section
            style={{
                padding: '5rem 0',
                backgroundColor: '#F8FAFC',
                borderTop: '1px solid #E2E8F0',
                borderBottom: '1px solid #E2E8F0',
            }}
        >
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--color-primary)',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            fontSize: '0.85rem',
                            marginBottom: '0.75rem',
                        }}
                    >
                        <HelpCircle size={18} />
                        <span>Got Questions?</span>
                    </div>
                    <h2
                        style={{
                            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                            fontWeight: 800,
                            color: 'var(--color-primary)',
                            marginBottom: '0.75rem',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {title}
                    </h2>
                    {subtitle && (
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
                            {subtitle}
                        </p>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {validFaqs.map((faq, index) => (
                        <details
                            key={index}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '12px',
                                padding: '1.25rem 1.75rem',
                                border: '1px solid #E2E8F0',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <summary
                                style={{
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    color: 'var(--color-primary)',
                                    outline: 'none',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <span>{faq.question}</span>
                            </summary>
                            <p
                                style={{
                                    marginTop: '1rem',
                                    marginBottom: 0,
                                    color: '#475569',
                                    lineHeight: 1.65,
                                    fontSize: '1rem',
                                }}
                            >
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
