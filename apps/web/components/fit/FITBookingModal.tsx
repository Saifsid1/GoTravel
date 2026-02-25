'use client';
import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { formatPrice } from '@/lib/utils';
import type { FITAddOn } from '@gotravel/types';
import { useLeadCapture } from '@/hooks/useLeadCapture';

interface Props {
  open: boolean;
  onClose: () => void;
  selectedAddons: FITAddOn[];
  travelers: number;
  destinationName?: string;
}

export default function FITBookingModal({ open, onClose, selectedAddons, travelers, destinationName }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '' });
  const { mutate, isPending, isSuccess } = useLeadCapture();
  const total = selectedAddons.reduce((s, a) => s + a.pricePerPerson * travelers, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      userName: form.name,
      userEmail: form.email,
      userPhone: form.phone,
      message: `FIT Package booking request for ${destinationName}. Selected ${selectedAddons.length} add-ons. Total: ${formatPrice(total)}`,
      sourcePage: 'fit_builder',
    });
  };

  return (
    <Dialog open={open} onClose={onClose} title="Book Your FIT Package">
      {isSuccess ? (
        <div className="text-center py-4">
          <div className="text-5xl mb-3">🎉</div>
          <h3 className="font-bold text-gray-900 text-lg">Booking Request Sent!</h3>
          <p className="text-gray-500 text-sm mt-1">Our team will contact you within 2 hours to confirm.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="bg-orange-50 rounded-xl p-3 mb-4">
            <p className="text-sm font-medium text-gray-700">{selectedAddons.length} add-ons • {travelers} travelers</p>
            <p className="text-xl font-bold text-orange-500">{formatPrice(total)}</p>
          </div>
          <input type="text" placeholder="Your Name *" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <input type="email" placeholder="Email *" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <input type="tel" placeholder="Phone *" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <input type="date" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <button type="submit" disabled={isPending} className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50">
            {isPending ? 'Submitting...' : 'Confirm Booking Request'}
          </button>
        </form>
      )}
    </Dialog>
  );
}
