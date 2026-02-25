export const APP_NAME = 'GoTravel';
export const APP_DESCRIPTION = 'Premium India Travel Experiences';
export const APP_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const WHATSAPP_NUMBER = '+919999999999';
export const SUPPORT_EMAIL = 'support@gotravel.com';
export const ADMIN_EMAIL = 'admin@gotravel.com';

export const FIT_CATEGORIES = [
  { value: 'ALL', label: 'All', icon: '🌟' },
  { value: 'ACTIVITY', label: 'Activities', icon: '🏄' },
  { value: 'TRANSPORT', label: 'Transport', icon: '🚗' },
  { value: 'ACCOMMODATION', label: 'Stay', icon: '🏨' },
  { value: 'MEAL', label: 'Food', icon: '🍛' },
  { value: 'EXPERIENCE', label: 'Experiences', icon: '✨' },
] as const;

export const BOOKING_STATUSES = [
  { value: 'ENQUIRY', label: 'Enquiry', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'CONFIRMED', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  { value: 'PAID', label: 'Paid', color: 'bg-green-100 text-green-800' },
  { value: 'CANCELLED', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  { value: 'COMPLETED', label: 'Completed', color: 'bg-purple-100 text-purple-800' },
] as const;

export const LEAD_STATUSES = [
  { value: 'NEW', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { value: 'CONTACTED', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'CONVERTED', label: 'Converted', color: 'bg-green-100 text-green-800' },
  { value: 'LOST', label: 'Lost', color: 'bg-red-100 text-red-800' },
] as const;

export const DIFFICULTY_LEVELS = ['Easy', 'Moderate', 'Challenging', 'Expert'] as const;

export const STATS = [
  { value: '50,000+', label: 'Happy Travelers', icon: '😊' },
  { value: '200+', label: 'Destinations', icon: '📍' },
  { value: '1,000+', label: 'Packages', icon: '📦' },
  { value: '4.8/5', label: 'Average Rating', icon: '⭐' },
] as const;
