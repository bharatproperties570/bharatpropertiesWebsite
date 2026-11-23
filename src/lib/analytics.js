/* global window */

/**
 * Dispatches GA4 custom event if gtag is initialized
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export function trackLeadSubmit(formName, metadata = {}) {
  trackEvent('lead_form_submit', {
    form_name: formName,
    ...metadata
  });
}

export function trackPhoneClick(phoneNumber) {
  trackEvent('phone_click', {
    phone_number: phoneNumber
  });
}

export function trackWhatsAppClick(source = 'unknown') {
  trackEvent('whatsapp_click', {
    source
  });
}

export function trackDirectionClick(destination = 'unknown') {
  trackEvent('direction_click', {
    destination
  });
}
