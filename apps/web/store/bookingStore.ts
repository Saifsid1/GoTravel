import { create } from 'zustand';

interface BookingStore {
  currentStep: number;
  packageId: string | null;
  packageSlug: string | null;
  travelDate: string | null;
  returnDate: string | null;
  numAdults: number;
  numChildren: number;
  selectedAddons: string[];
  totalAmount: number;
  bookingId: string | null;
  bookingRef: string | null;
  
  setStep: (step: number) => void;
  setPackage: (id: string, slug: string) => void;
  setDates: (travel: string, returnDate?: string) => void;
  setTravelers: (adults: number, children: number) => void;
  setSelectedAddons: (addons: string[]) => void;
  setTotalAmount: (amount: number) => void;
  setBooking: (id: string, ref: string) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  currentStep: 1,
  packageId: null,
  packageSlug: null,
  travelDate: null,
  returnDate: null,
  numAdults: 2,
  numChildren: 0,
  selectedAddons: [],
  totalAmount: 0,
  bookingId: null,
  bookingRef: null,

  setStep: (step) => set({ currentStep: step }),
  setPackage: (id, slug) => set({ packageId: id, packageSlug: slug }),
  setDates: (travel, returnDate) => set({ travelDate: travel, returnDate: returnDate || null }),
  setTravelers: (adults, children) => set({ numAdults: adults, numChildren: children }),
  setSelectedAddons: (addons) => set({ selectedAddons: addons }),
  setTotalAmount: (amount) => set({ totalAmount: amount }),
  setBooking: (id, ref) => set({ bookingId: id, bookingRef: ref }),
  reset: () =>
    set({
      currentStep: 1,
      packageId: null,
      packageSlug: null,
      travelDate: null,
      returnDate: null,
      numAdults: 2,
      numChildren: 0,
      selectedAddons: [],
      totalAmount: 0,
      bookingId: null,
      bookingRef: null,
    }),
}));
