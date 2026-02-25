export function validateEmail(email: string): string | null {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address';
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone) return null;
  if (!/^[+]?[\d\s-]{10,15}$/.test(phone.replace(/\s/g, ''))) return 'Invalid phone number';
  return null;
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || value.trim() === '') return `${fieldName} is required`;
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return null;
}

export interface EnquiryFormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export function validateEnquiryForm(data: { name: string; email: string; phone?: string }): EnquiryFormErrors {
  const errors: EnquiryFormErrors = {};
  const nameError = validateRequired(data.name, 'Name');
  if (nameError) errors.name = nameError;
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  if (data.phone) {
    const phoneError = validatePhone(data.phone);
    if (phoneError) errors.phone = phoneError;
  }
  return errors;
}
