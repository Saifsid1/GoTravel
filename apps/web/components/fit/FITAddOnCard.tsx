'use client';
import { Check, Clock, Tag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { FITAddOn } from '@gotravel/types';

interface Props {
  addon: FITAddOn;
  selected: boolean;
  onToggle: (addon: FITAddOn) => void;
}

const categoryColors: Record<string, string> = {
  ACTIVITY: 'bg-blue-100 text-blue-700',
  TRANSPORT: 'bg-purple-100 text-purple-700',
  ACCOMMODATION: 'bg-green-100 text-green-700',
  MEAL: 'bg-yellow-100 text-yellow-700',
  EXPERIENCE: 'bg-pink-100 text-pink-700',
};

export default function FITAddOnCard({ addon, selected, onToggle }: Props) {
  return (
    <div
      onClick={() => onToggle(addon)}
      className={`relative bg-white rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${selected ? 'border-orange-500 shadow-md' : 'border-gray-100'}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-10 bg-orange-500 text-white rounded-full p-0.5">
          <Check className="h-3.5 w-3.5" />
        </div>
      )}
      <div className="h-32 overflow-hidden rounded-t-xl">
        {addon.images?.[0] ? (
          <img src={addon.images[0]} alt={addon.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-4xl">
            {addon.category === 'ACTIVITY' ? '🏄' : addon.category === 'TRANSPORT' ? '🚗' : addon.category === 'ACCOMMODATION' ? '🏨' : addon.category === 'MEAL' ? '🍛' : '✨'}
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm text-gray-900 leading-tight">{addon.name}</h3>
          {addon.isPopular && <span className="text-xs bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded-full whitespace-nowrap">Popular</span>}
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[addon.category] || 'bg-gray-100 text-gray-600'}`}>
          {addon.category}
        </span>
        {addon.durationHours && (
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1.5">
            <Clock className="h-3 w-3" /> {addon.durationHours}h
          </div>
        )}
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-orange-500">{formatPrice(addon.pricePerPerson)}</span>
          <span className="text-xs text-gray-400">per person</span>
        </div>
      </div>
    </div>
  );
}
