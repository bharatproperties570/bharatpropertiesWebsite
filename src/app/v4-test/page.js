import React from 'react';
import HeroSection from '../../components/BP_Hero_Final_v4';

export default function V4TestPage() {
    return (
        <div id="v4-sync-verification-success">
            <HeroSection />
            <div style={{ padding: '50px', textAlign: 'center', background: '#f8fafc' }}>
                <h2 style={{ color: '#1e293b' }}>v4.5-FINAL-SYNC-VERIFICATION</h2>
                <p style={{ color: '#64748b' }}>If you see Kurukshetra above, the sync is successful.</p>
            </div>
        </div>
    );
}
