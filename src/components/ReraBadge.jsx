import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { getReraRegistrations } from '../lib/rera';

export default function ReraBadge({ style = {} }) {
    const registrations = getReraRegistrations();

    if (!registrations || registrations.length === 0) {
        return null;
    }

    return (
        <div
            style={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                gap: '8px',
                alignItems: 'center',
                ...style,
            }}
        >
            {registrations.map((reg) => (
                <div
                    key={reg.label}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(217, 119, 6, 0.1)',
                        border: '1px solid rgba(217, 119, 6, 0.3)',
                        color: 'var(--color-gold, #D97706)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                    }}
                >
                    <ShieldCheck size={16} />
                    <span>{reg.label} {reg.value}</span>
                </div>
            ))}
        </div>
    );
}
