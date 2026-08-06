/**
 * Brew Haven Security & Input Sanitization Utilities
 * Protects against Cross-Site Scripting (XSS) and malicious payload injection
 */

export function sanitizeInput(input: string): string {
  if (!input) return '';

  return input
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  const clean = phone.replace(/[^0-9+]/g, '');
  return clean.length >= 8 && clean.length <= 15;
}
