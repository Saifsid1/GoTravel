'use client';
import { X, ShoppingCart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { FITAddOn } from '@gotravel/types';
import Link from 'next/link';

interface Props {
  selectedAddons: FITAddOn[];
  travelers: number;
  onRemove: (id: string) => void;
  destinationSlug?: string;
}

export default function FITCostCalculator({ selectedAddons, travelers, onRemove, destinationSlug }: Props) {
  const total = selectedAddons.reduce((sum, a) => sum + a.pricePerPerson * travelers, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sticky top-20">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="h-5 w-5 text-orange-500" />
        <h3 className="font-bold text-gray-900">Your FIT Package</h3>
      </div>
      {selectedAddons.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">Select add-ons to build your package</p>
      ) : (
        <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
          {selectedAddons.map(addon => (
            <div key={addon.id} className="flex items-center justify-between gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-800 truncate">{addon.name}</p>
                <p className="text-xs text-gray-400">{formatPrice(addon.pricePerPerson)} × {travelers}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-semibold text-orange-500">{formatPrice(addon.pricePerPerson * travelers)}</span>
                <button onClick={() => onRemove(addon.id)} className="text-gray-400 hover:text-red-500"><X className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Travelers</span>
          <span className="text-sm font-medium">{travelers}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-orange-500">{formatPrice(total)}</span>
        </div>
        {selectedAddons.length > 0 && (
          <Link
            href={destinationSlug ? `/book/${destinationSlug}-fit?addons=${selectedAddons.map(a => a.id).join(',')}` : '/contact'}
            className="w-full block text-center bg-orange-500 text-white py-2.5 rounded-xl font-medium hover:bg-orange-600 transition-colors"
          >
            Book FIT Package
          </Link>
        )}
      </div>
    </div>
  );
}
