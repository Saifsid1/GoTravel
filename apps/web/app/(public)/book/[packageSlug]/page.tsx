'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { packagesApi, bookingsApi } from '@/lib/api';
import BookingSteps from '@/components/booking/BookingSteps';
import FITAddOnCard from '@/components/fit/FITAddOnCard';
import RazorpayButton from '@/components/booking/RazorpayButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';
import type { FITAddOn } from '@gotravel/types';

const STEPS = [{ id: 1, label: 'Trip Details' }, { id: 2, label: 'Add-ons' }, { id: 3, label: 'Your Info' }, { id: 4, label: 'Payment' }];

export default function BookPage({ params }: { params: { packageSlug: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as any;
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<any>(null);
  const [form, setForm] = useState({ travelDate: '', numAdults: 2, numChildren: 0, specialRequests: '', name: user?.name || '', email: user?.email || '', phone: '' });
  const [selectedAddons, setSelectedAddons] = useState<FITAddOn[]>([]);

  const { data: pkg } = useQuery({ queryKey: ['package', params.packageSlug], queryFn: () => packagesApi.getBySlug(params.packageSlug).then(r => r.data) });

  const total = pkg ? (pkg.discountedPrice || pkg.basePrice) * (form.numAdults + form.numChildren) + selectedAddons.reduce((s, a) => s + a.pricePerPerson * (form.numAdults + form.numChildren), 0) : 0;

  const handleCreateBooking = async () => {
    if (!pkg) return;
    try {
      const res = await bookingsApi.create({ packageId: pkg.id, travelDate: form.travelDate, numAdults: form.numAdults, numChildren: form.numChildren, totalAmount: total, specialRequests: form.specialRequests, selectedFitAddons: selectedAddons.map(a => ({ addonId: a.id, name: a.name, pricePerPerson: a.pricePerPerson, quantity: form.numAdults + form.numChildren, totalPrice: a.pricePerPerson * (form.numAdults + form.numChildren) })) });
      setBooking(res.data);
      setStep(4);
    } catch (e: any) {
      if (e.response?.status === 401) { toast.error('Please login to book'); router.push('/login'); }
      else toast.error('Failed to create booking');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Book Your Trip</h1>
        <BookingSteps steps={STEPS} currentStep={step} />
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-bold text-gray-900">{pkg?.name}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                  <input type="date" value={form.travelDate} onChange={e => setForm(p => ({...p, travelDate: e.target.value}))} required min={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                  <select value={form.numAdults} onChange={e => setForm(p => ({...p, numAdults: +e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={() => { if(!form.travelDate){toast.error('Select travel date');return;} setStep(2); }} className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors">Next: Add-ons</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="font-bold text-gray-900 mb-4">Select Add-ons (Optional)</h2>
              {(pkg as any)?.destination?.fitAddOns?.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {(pkg as any).destination.fitAddOns.map((a: FITAddOn) => (
                    <FITAddOnCard key={a.id} addon={a} selected={!!selectedAddons.find(s => s.id === a.id)} onToggle={addon => setSelectedAddons(p => p.find(x => x.id === addon.id) ? p.filter(x => x.id !== addon.id) : [...p, addon])} />
                  ))}
                </div>
              ) : <p className="text-gray-400 text-sm">No add-ons available</p>}
              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-orange-500 text-white py-2.5 rounded-lg font-medium hover:bg-orange-600">Next</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-bold text-gray-900">Your Details</h2>
              {[['name','Full Name','text'],['email','Email','email'],['phone','Phone','tel']].map(([k,l,t]) => (
                <div key={k}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{l}</label>
                  <input type={t} value={(form as any)[k]} onChange={e => setForm(p => ({...p, [k]: e.target.value}))} required={k !== 'phone'} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
              ))}
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="flex justify-between text-sm mb-1"><span>Package ({form.numAdults + form.numChildren} travelers)</span><span>{formatPrice((pkg?.discountedPrice || pkg?.basePrice || 0) * (form.numAdults + form.numChildren))}</span></div>
                {selectedAddons.map(a => <div key={a.id} className="flex justify-between text-sm mb-1"><span>{a.name}</span><span>{formatPrice(a.pricePerPerson * (form.numAdults + form.numChildren))}</span></div>)}
                <div className="flex justify-between font-bold border-t border-orange-200 pt-2 mt-2"><span>Total</span><span className="text-orange-500">{formatPrice(total)}</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium">Back</button>
                <button onClick={handleCreateBooking} className="flex-1 bg-orange-500 text-white py-2.5 rounded-lg font-medium hover:bg-orange-600">Confirm & Pay</button>
              </div>
            </div>
          )}
          {step === 4 && booking && (
            <div className="space-y-4">
              <h2 className="font-bold text-gray-900">Payment</h2>
              <div className="bg-green-50 rounded-xl p-4 text-center mb-4">
                <p className="font-semibold text-green-800">Booking Created!</p>
                <p className="text-sm text-green-600">Ref: {booking.bookingRef}</p>
              </div>
              <RazorpayButton bookingId={booking.id} amount={total * 100} name={form.name} email={form.email} phone={form.phone} onSuccess={() => router.push(`/confirmation/${booking.bookingRef}`)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
