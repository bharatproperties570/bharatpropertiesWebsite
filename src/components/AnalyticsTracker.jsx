'use client';

import { useEffect } from 'react';
import { trackPhoneClick, trackWhatsAppClick, trackDirectionClick } from '../lib/analytics';

export default function AnalyticsTracker() {
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href') || '';

      // Phone click
      if (href.startsWith('tel:')) {
        trackPhoneClick(href.replace('tel:', ''));
        return;
      }

      // WhatsApp click
      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        trackWhatsAppClick(link.getAttribute('data-source') || href);
        return;
      }

      // Directions / Maps click
      if (
        href.includes('maps.google.com') ||
        href.includes('maps.app.goo.gl') ||
        href.includes('goo.gl/maps')
      ) {
        trackDirectionClick(link.getAttribute('data-destination') || href);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
