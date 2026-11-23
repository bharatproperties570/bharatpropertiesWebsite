/**
 * @file formValidation.js
 * Server-side validation and sanitization for lead forms, property submissions, and site visit bookings.
 */

export const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
export const TIME_REGEX = /^\d{1,2}:\d{2}$/;

/**
 * Normalizes phone numbers to standard 10-digit Indian mobile format.
 * Strips '+91', '91', leading '0', spaces, hyphens, and parentheses.
 * @param {string|number} rawPhone
 * @returns {string|null} 10-digit string or null if invalid
 */
export function normalizeIndianPhone(rawPhone) {
  if (!rawPhone) return null;
  const digits = String(rawPhone).replace(/\D/g, '');

  let normalized = digits;
  if (digits.length === 12 && digits.startsWith('91')) {
    normalized = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    normalized = digits.slice(1);
  }

  if (normalized.length === 10 && INDIAN_MOBILE_REGEX.test(normalized)) {
    return normalized;
  }
  return null;
}

/**
 * Sanitizes and trims a string, stripping dangerous HTML markup.
 */
export function sanitizeText(value, maxLength = 500) {
  if (value === null || value === undefined) return '';
  const text = String(value)
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Strip control chars
    .trim();
  return text.slice(0, maxLength);
}

/**
 * Checks honeypot field and form submission time to prevent automated bot spam.
 */
export function validateHoneypotAndTiming(body = {}) {
  // Honeypot check: Bots fill hidden fields
  const honeypot = body._gotcha ?? body.honeypot ?? body.faxNumber ?? '';
  if (honeypot && String(honeypot).trim().length > 0) {
    return { isSpam: true, error: 'Spam detected (honeypot).' };
  }

  // Minimum fill time check (at least 1.5 seconds)
  const renderedAt = body._renderedAt ?? body.formRenderTime;
  if (renderedAt) {
    const elapsed = Date.now() - Number(renderedAt);
    if (!isNaN(elapsed) && elapsed < 1500) {
      return { isSpam: true, error: 'Form submitted suspiciously fast. Please try again.' };
    }
  }

  return { isSpam: false };
}

/**
 * Validates Lead Submission payload (ConsultationForm, SiteVisitForm, TalkToExpertForm).
 */
export function validateLeadPayload(body = {}) {
  const errors = [];

  const spamCheck = validateHoneypotAndTiming(body);
  if (spamCheck.isSpam) {
    return { isValid: false, errors: [spamCheck.error], data: null };
  }

  // Name validation
  const rawName = body.name || body.fullName || '';
  const sanitizedName = sanitizeText(rawName, 80);
  if (!sanitizedName || sanitizedName.length < 2) {
    errors.push('Full name must be at least 2 characters long.');
  }

  // Mobile validation
  const rawMobile = body.mobile || body.phone || '';
  const normalizedPhone = normalizeIndianPhone(rawMobile);
  if (!normalizedPhone) {
    errors.push('Please provide a valid 10-digit Indian mobile number (e.g. 9876543210).');
  }

  // Email validation (optional but validated if provided)
  let sanitizedEmail = '';
  if (body.email) {
    sanitizedEmail = sanitizeText(body.email, 120).toLowerCase();
    if (!EMAIL_REGEX.test(sanitizedEmail)) {
      errors.push('Please provide a valid email address.');
    }
  }

  // Activity Type validation
  const allowedActivities = ['call', 'site visit', 'meeting', 'consultation', 'general', 'requirement'];
  const rawActivity = (body.activityType || 'General').toLowerCase();
  const validActivity = allowedActivities.includes(rawActivity) ? body.activityType : 'General';

  // Sanitize remarks/message
  const sanitizedRemarks = sanitizeText(body.remarks || body.message || '', 1000);
  const sanitizedProject = sanitizeText(body.projectName || body.project || '', 100);
  const sanitizedCity = sanitizeText(body.city || '', 60);

  if (errors.length > 0) {
    return { isValid: false, errors, data: null };
  }

  return {
    isValid: true,
    errors: [],
    data: {
      ...body,
      name: sanitizedName,
      fullName: sanitizedName,
      mobile: normalizedPhone,
      phone: normalizedPhone,
      email: sanitizedEmail,
      activityType: validActivity,
      remarks: sanitizedRemarks,
      projectName: sanitizedProject,
      city: sanitizedCity
    }
  };
}

/**
 * Validates Property Listing Submission payload (PostPropertyForm).
 */
export function validatePropertyPayload(body = {}) {
  const errors = [];

  const spamCheck = validateHoneypotAndTiming(body);
  if (spamCheck.isSpam) {
    return { isValid: false, errors: [spamCheck.error], data: null };
  }

  const rawName = body.fullName || body.name || body.contact?.name || '';
  const sanitizedName = sanitizeText(rawName, 80);
  if (!sanitizedName || sanitizedName.length < 2) {
    errors.push('Owner or contact name must be at least 2 characters long.');
  }

  const rawMobile = body.phone || body.mobile || body.contact?.mobile || '';
  const normalizedPhone = normalizeIndianPhone(rawMobile);
  if (!normalizedPhone) {
    errors.push('Please provide a valid 10-digit Indian mobile number.');
  }

  let sanitizedEmail = '';
  const rawEmail = body.email || body.contact?.email;
  if (rawEmail) {
    sanitizedEmail = sanitizeText(rawEmail, 120).toLowerCase();
    if (!EMAIL_REGEX.test(sanitizedEmail)) {
      errors.push('Please provide a valid email address.');
    }
  }

  const allowedIntents = ['sale', 'rent', 'lease', 'buy', 'sell'];
  const intent = (body.availableFor || body.intent || 'Sale').toLowerCase();
  const validIntent = allowedIntents.includes(intent) ? body.availableFor || body.intent : 'Sale';

  if (errors.length > 0) {
    return { isValid: false, errors, data: null };
  }

  return {
    isValid: true,
    errors: [],
    data: {
      ...body,
      fullName: sanitizedName,
      phone: normalizedPhone,
      email: sanitizedEmail,
      availableFor: validIntent,
      description: sanitizeText(body.description || body.remarks || '', 2000)
    }
  };
}

/**
 * Validates WhatsApp Site Visit Booking (wa-action).
 */
export function validateWaSiteVisitPayload(body = {}) {
  const errors = [];

  const spamCheck = validateHoneypotAndTiming(body);
  if (spamCheck.isSpam) {
    return { isValid: false, errors: [spamCheck.error], data: null };
  }

  const token = sanitizeText(body.token, 500);
  if (!token) {
    errors.push('Missing or invalid booking token.');
  }

  const date = sanitizeText(body.date, 20);
  if (!date || !DATE_REGEX.test(date)) {
    errors.push('Please select a valid visit date (YYYY-MM-DD).');
  }

  const time = sanitizeText(body.time, 10);
  if (!time || !TIME_REGEX.test(time)) {
    errors.push('Please select a valid visit time (HH:MM).');
  }

  const remarks = sanitizeText(body.remarks, 1000);

  if (errors.length > 0) {
    return { isValid: false, errors, data: null };
  }

  return {
    isValid: true,
    errors: [],
    data: {
      token,
      date,
      time,
      remarks
    }
  };
}
