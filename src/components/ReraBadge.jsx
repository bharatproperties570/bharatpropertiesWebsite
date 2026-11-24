/* global process */
import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function ReraBadge({ style = {} }) {
    const reraNumber = process.env.NEXT_PUBLIC_RERA_NUMBER || 'PBRERA-HRY06-0050';
    if (!reraNumber || typeof reraNumber !== 'string' || !reraNumber.trim()) {
        return null;
    }

    return (
        <div
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
                ...style,
            }}
        >
            <ShieldCheck size={16} />
            <span>RERA Reg: {reraNumber.trim()}</span>
        </div>
    );
}
