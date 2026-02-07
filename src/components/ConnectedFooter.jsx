'use client';
import React from 'react';
import Footer from './Footer';
import { useRouter } from 'next/navigation';

export default function ConnectedFooter() {
    const router = useRouter();

    return (
        <Footer
            onPrivacyClick={() => router.push('/privacy')}
            onTermsClick={() => router.push('/terms')}
            onCalculatorClick={() => router.push('/calculator')}
            onAboutClick={() => router.push('/about')}
        />
    );
}
