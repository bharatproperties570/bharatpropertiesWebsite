'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
    const pathname = usePathname();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before crossing the line
        });

        const observeElements = () => {
            const revealElements = document.querySelectorAll('.reveal');
            revealElements.forEach((el) => observer.observe(el));
        };

        // Initial observation
        observeElements();

        // Create a mutation observer to handle dynamically loaded content
        const mutationObserver = new MutationObserver((mutations) => {
            observeElements();
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, [pathname]); // Re-run when route changes

    return null; // This component doesn't render anything
}
