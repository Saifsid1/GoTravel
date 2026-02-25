// User Types
export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  avatar?: string;
  role: UserRole;
  googleId?: string;
  preferences?: Record<string, any>;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Destination Types
export interface Destination {
  id: string;
  slug: string;
  name: string;
  state: string;
  city: string;
  country: string;
  description: string;
  shortDescription: string;
  heroImage: string;
  galleryImages: string[];
  latitude?: number;
  longitude?: number;
  bestTimeToVisit?: string;
  weatherInfo?: string;
  tags: string[];
  categories: string[];
  basePricePerPerson: number;
  isFeatured: boolean;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Package Types
export type PackageType = 'GROUP' | 'FIT' | 'CUSTOM';

export interface Package {
  id: string;
  destinationId: string;
  name: string;
  slug: string;
  type: PackageType;
  durationDays: number;
  durationNights: number;
  basePrice: number;
  discountedPrice?: number;
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  maxGroupSize?: number;
  minGroupSize?: number;
  difficultyLevel?: string;
  isActive: boolean;
  isFeatured: boolean;
  destination?: Destination;
  itineraries?: Itinerary[];
}

// Itinerary Types
export interface ItineraryActivity {
  items: string[];
}

export interface Itinerary {
  id: string;
  packageId: string;
  dayNumber: number;
  title: string;
  description: string;
  activities: ItineraryActivity;
  mealsIncluded: string[];
  accommodationType?: string;
  distanceKm?: number;
  images: string[];
}

// FIT Add-on Types
export type FITAddOnCategory = 'ACTIVITY' | 'TRANSPORT' | 'ACCOMMODATION' | 'MEAL' | 'EXPERIENCE';

export interface FITAddOn {
  id: string;
  destinationId: string;
  name: string;
  description: string;
  category: FITAddOnCategory;
  pricePerPerson: number;
  durationHours?: number;
  images: string[];
  locationName?: string;
  latitude?: number;
  longitude?: number;
  aiTags: string[];
  isAvailable: boolean;
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Booking Types
export type BookingStatus = 'ENQUIRY' | 'CONFIRMED' | 'PAID' | 'CANCELLED' | 'COMPLETED';

export interface Booking {
  id: string;
  userId: string;
  packageId: string;
  bookingRef: string;
  status: BookingStatus;
  travelDate: Date;
  returnDate?: Date;
  numAdults: number;
  numChildren: number;
  totalAmount: number;
  paidAmount: number;
  selectedFitAddons?: SelectedFITAddon[];
  specialRequests?: string;
  assignedAgentId?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  package?: Package;
  payments?: Payment[];
}

export interface SelectedFITAddon {
  addonId: string;
  name: string;
  pricePerPerson: number;
  quantity: number;
  totalPrice: number;
}

// Payment Types
export interface Payment {
  id: string;
  bookingId: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod?: string;
  createdAt: Date;
}

// Lead Types
export type LeadStatus = 'NEW' | 'CONTACTED' | 'CONVERTED' | 'LOST';

export interface Lead {
  id: string;
  userId?: string;
  destinationId?: string;
  sourcePage?: string;
  utmSource?: string;
  utmMedium?: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  message?: string;
  status: LeadStatus;
  assignedTo?: string;
  notifiedAt?: Date;
  contactedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  destination?: Destination;
}

// Vendor Types
export type VendorType = 'HOTEL' | 'TRANSPORT' | 'ACTIVITY' | 'RESTAURANT' | 'GUIDE';
export type ContractStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';
export type VendorSource = 'MANUAL' | 'SCRAPED_GOOGLE';

export interface Vendor {
  id: string;
  name: string;
  type: VendorType;
  destinationId?: string;
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  email?: string;
  website?: string;
  googleMapsUrl?: string;
  googlePlaceId?: string;
  rating?: number;
  reviewCount?: number;
  priceRange?: string;
  contactPersonName?: string;
  contactPersonPhone?: string;
  contractStatus: ContractStatus;
  notes?: string;
  source: VendorSource;
  createdAt: Date;
  updatedAt: Date;
}

// Notification Types
export type NotificationType = 'LEAD' | 'BOOKING' | 'PAYMENT' | 'ENQUIRY';

export interface AdminNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
  relatedUserId?: string;
  relatedBookingId?: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  isPublished: boolean;
  publishedAt?: Date;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  review: string;
  destination?: string;
  createdAt: Date;
  isActive: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// FIT Builder Types
export interface FITBuilderState {
  destinationId: string;
  basePackageId?: string;
  selectedAddons: SelectedFITAddon[];
  travelers: {
    adults: number;
    children: number;
  };
  totalCost: number;
}

// Razorpay Types
export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// Search Types
export interface DestinationSearchParams {
  query?: string;
  state?: string;
  minBudget?: number;
  maxBudget?: number;
  minDuration?: number;
  maxDuration?: number;
  categories?: string[];
  tags?: string[];
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

// Form Types
export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  travelDate?: string;
  numTravelers?: number;
  destinationId?: string;
  packageId?: string;
}

export interface BookingFormData {
  packageId: string;
  travelDate: string;
  returnDate?: string;
  numAdults: number;
  numChildren: number;
  selectedAddons?: string[];
  specialRequests?: string;
  name: string;
  email: string;
  phone: string;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
}

// Indian States for filters
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Andaman & Nicobar Islands', 'Arunachal Pradesh', 'Assam',
  'Bihar', 'Chandigarh', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Karnataka',
  'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
] as const;

export const DESTINATION_CATEGORIES = [
  'Adventure', 'Beach', 'Cultural', 'Desert', 'Heritage', 'Hill Station',
  'Honeymoon', 'Nature', 'Party', 'Photography', 'Relaxation', 'Spiritual',
  'Trekking', 'Wildlife', 'Wellness'
] as const;
