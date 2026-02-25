import { create } from 'zustand';

interface SelectedAddon {
  id: string;
  name: string;
  pricePerPerson: number;
  category: string;
  durationHours?: number;
}

interface FITStore {
  destinationId: string | null;
  basePackageId: string | null;
  selectedAddons: SelectedAddon[];
  travelers: { adults: number; children: number };
  basePrice: number;
  
  setDestination: (id: string) => void;
  setBasePackage: (id: string, price: number) => void;
  addAddon: (addon: SelectedAddon) => void;
  removeAddon: (addonId: string) => void;
  setTravelers: (travelers: { adults: number; children: number }) => void;
  getTotalCost: () => number;
  getAddonsCost: () => number;
  reset: () => void;
}

export const useFITStore = create<FITStore>((set, get) => ({
  destinationId: null,
  basePackageId: null,
  selectedAddons: [],
  travelers: { adults: 2, children: 0 },
  basePrice: 0,

  setDestination: (id) => set({ destinationId: id }),
  
  setBasePackage: (id, price) => set({ basePackageId: id, basePrice: price }),
  
  addAddon: (addon) =>
    set((state) => ({
      selectedAddons: state.selectedAddons.some((a) => a.id === addon.id)
        ? state.selectedAddons
        : [...state.selectedAddons, addon],
    })),
  
  removeAddon: (addonId) =>
    set((state) => ({
      selectedAddons: state.selectedAddons.filter((a) => a.id !== addonId),
    })),
  
  setTravelers: (travelers) => set({ travelers }),
  
  getTotalCost: () => {
    const state = get();
    const totalTravelers = state.travelers.adults + state.travelers.children * 0.5;
    const addonsTotal = state.selectedAddons.reduce(
      (sum, addon) => sum + addon.pricePerPerson * totalTravelers,
      0,
    );
    return state.basePrice * totalTravelers + addonsTotal;
  },
  
  getAddonsCost: () => {
    const state = get();
    const totalTravelers = state.travelers.adults + state.travelers.children * 0.5;
    return state.selectedAddons.reduce(
      (sum, addon) => sum + addon.pricePerPerson * totalTravelers,
      0,
    );
  },
  
  reset: () =>
    set({
      destinationId: null,
      basePackageId: null,
      selectedAddons: [],
      travelers: { adults: 2, children: 0 },
      basePrice: 0,
    }),
}));
