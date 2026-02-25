import { create } from 'zustand';

interface UIStore {
  isLoading: boolean;
  isMobileMenuOpen: boolean;
  isEnquiryModalOpen: boolean;
  enquiryDestinationId: string | null;
  
  setLoading: (loading: boolean) => void;
  toggleMobileMenu: () => void;
  openEnquiryModal: (destinationId?: string) => void;
  closeEnquiryModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isLoading: false,
  isMobileMenuOpen: false,
  isEnquiryModalOpen: false,
  enquiryDestinationId: null,

  setLoading: (loading) => set({ isLoading: loading }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  openEnquiryModal: (destinationId) =>
    set({ isEnquiryModalOpen: true, enquiryDestinationId: destinationId || null }),
  closeEnquiryModal: () =>
    set({ isEnquiryModalOpen: false, enquiryDestinationId: null }),
}));
