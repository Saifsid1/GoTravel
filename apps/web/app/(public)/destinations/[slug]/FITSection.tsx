'use client';
import { useState } from 'react';
import { useFITAddons } from '@/hooks/useFITAddons';
import FITAddOnCard from '@/components/fit/FITAddOnCard';
import FITCategoryFilter from '@/components/fit/FITCategoryFilter';
import FITCostCalculator from '@/components/fit/FITCostCalculator';
import FITBookingModal from '@/components/fit/FITBookingModal';
import type { FITAddOn } from '@gotravel/types';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  destinationId: string;
  destinationSlug: string;
  destinationName: string;
}

export default function FITSection({ destinationId, destinationSlug, destinationName }: Props) {
  const [category, setCategory] = useState('ALL');
  const [selected, setSelected] = useState<FITAddOn[]>([]);
  const [travelers, setTravelers] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading } = useFITAddons(destinationId, category === 'ALL' ? undefined : category);
  const addons: FITAddOn[] = Array.isArray(data) ? data : (data as any)?.data || [];

  const toggle = (addon: FITAddOn) => {
    setSelected(prev => prev.find(a => a.id === addon.id) ? prev.filter(a => a.id !== addon.id) : [...prev, addon]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Build Your FIT Package</h2>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Travelers:</span>
          <select value={travelers} onChange={e => setTravelers(+e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm">
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
      <FITCategoryFilter selected={category} onChange={setCategory} />
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {Array.from({length: 6}).map((_, i) => <Skeleton key={i} className="h-52 rounded-xl" />)}
        </div>
      ) : addons.length === 0 ? (
        <p className="text-gray-400 text-sm py-6">No add-ons available for this category</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {addons.map(a => <FITAddOnCard key={a.id} addon={a} selected={!!selected.find(s => s.id === a.id)} onToggle={toggle} />)}
        </div>
      )}
      {selected.length > 0 && (
        <div className="mt-6">
          <FITCostCalculator selectedAddons={selected} travelers={travelers} onRemove={id => setSelected(prev => prev.filter(a => a.id !== id))} destinationSlug={destinationSlug} />
        </div>
      )}
      <FITBookingModal open={modalOpen} onClose={() => setModalOpen(false)} selectedAddons={selected} travelers={travelers} destinationName={destinationName} />
    </div>
  );
}
