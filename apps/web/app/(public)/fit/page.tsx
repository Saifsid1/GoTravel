'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fitApi, destinationsApi } from '@/lib/api';
import FITAddOnCard from '@/components/fit/FITAddOnCard';
import FITCategoryFilter from '@/components/fit/FITCategoryFilter';
import FITCostCalculator from '@/components/fit/FITCostCalculator';
import FITBookingModal from '@/components/fit/FITBookingModal';
import type { FITAddOn } from '@gotravel/types';

export default function FITPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedAddons, setSelectedAddons] = useState<FITAddOn[]>([]);
  const [travelers, setTravelers] = useState(2);
  const [destinationId, setDestinationId] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { data: destinations } = useQuery({
    queryKey: ['destinations-list'],
    queryFn: () => destinationsApi.getAll({ limit: 50 }).then(r => {
      const d = r.data;
      return Array.isArray(d) ? d : (d as any)?.data || [];
    }),
  });

  const { data: addonsData, isLoading } = useQuery({
    queryKey: ['fit-addons', destinationId, selectedCategory],
    queryFn: () => fitApi.getAddOns(destinationId || undefined as any, selectedCategory !== 'ALL' ? selectedCategory : undefined).then(r => {
      const d = r.data;
      return Array.isArray(d) ? d : (d as any)?.data || [];
    }),
  });

  const addons: FITAddOn[] = addonsData || [];

  const handleToggle = (addon: FITAddOn) => {
    setSelectedAddons(prev =>
      prev.find(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon],
    );
  };

  const selectedDestination = destinations?.find((d: any) => d.id === destinationId);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 to-teal-500 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Build Your Perfect Trip</h1>
          <p className="text-lg text-white/90 mb-6">
            Mix and match activities, transport, stays, and experiences across India's best destinations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <select
              value={destinationId}
              onChange={e => setDestinationId(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg text-gray-900 bg-white border-0 focus:ring-2 focus:ring-white/50"
            >
              <option value="">All Destinations</option>
              {destinations?.map((d: any) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm">Travelers:</span>
              <button onClick={() => setTravelers(t => Math.max(1, t - 1))} className="w-7 h-7 bg-white/20 rounded-full hover:bg-white/30 font-bold">-</button>
              <span className="w-6 text-center font-bold">{travelers}</span>
              <button onClick={() => setTravelers(t => Math.min(20, t + 1))} className="w-7 h-7 bg-white/20 rounded-full hover:bg-white/30 font-bold">+</button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Filters + Add-ons */}
          <div className="flex-1">
            <div className="mb-6">
              <FITCategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
            </div>
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-xl h-52 animate-pulse" />
                ))}
              </div>
            ) : addons.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">🗺️</p>
                <p className="text-lg font-medium">No add-ons found</p>
                <p className="text-sm mt-1">Try a different destination or category</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {addons.map((addon: FITAddOn) => (
                  <FITAddOnCard
                    key={addon.id}
                    addon={addon}
                    selected={!!selectedAddons.find(a => a.id === addon.id)}
                    onToggle={handleToggle}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Cost Calculator */}
          <div className="lg:w-80 xl:w-96">
            <FITCostCalculator
              selectedAddons={selectedAddons}
              travelers={travelers}
              onRemove={id => setSelectedAddons(prev => prev.filter(a => a.id !== id))}
              destinationSlug={selectedDestination?.slug}
            />
            {selectedAddons.length > 0 && (
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 w-full bg-teal-500 text-white py-3 rounded-xl font-semibold hover:bg-teal-600 transition-colors"
              >
                Send Enquiry
              </button>
            )}
          </div>
        </div>
      </div>

      <FITBookingModal
        open={showModal}
        selectedAddons={selectedAddons}
        travelers={travelers}
        destinationName={selectedDestination?.name}
        onClose={() => setShowModal(false)}
      />
    </main>
  );
}
