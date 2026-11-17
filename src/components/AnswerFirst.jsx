import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AnswerFirst({ text }) {
    if (!text || typeof text !== 'string') return null;

    return (
        <div
            style={{
                backgroundColor: '#F8FAFC',
                borderLeft: '4px solid var(--color-gold, #D97706)',
                borderRadius: '8px',
                padding: '1.25rem 1.75rem',
                margin: '2rem auto',
                maxWidth: '1200px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
            }}
            className="answer-first-summary"
        >
            <Sparkles
                size={22}
                style={{
                    color: 'var(--color-gold, #D97706)',
                    flexShrink: 0,
                    marginTop: '2px',
                }}
            />
            <div>
                <span
                    style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        color: 'var(--color-gold, #D97706)',
                        marginBottom: '0.35rem',
                    }}
                >
                    Overview &amp; Quick Facts
                </span>
                <p
                    style={{
                        margin: 0,
                        color: '#334155',
                        fontSize: '1.05rem',
                        lineHeight: 1.6,
                        fontWeight: 500,
                    }}
                >
                    {text}
                </p>
            </div>
        </div>
    );
}
