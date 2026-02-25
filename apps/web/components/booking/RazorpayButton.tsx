'use client';
import { useState } from 'react';
import { paymentsApi } from '@/lib/api';
import { initiatePayment } from '@/lib/razorpay';
import toast from 'react-hot-toast';

interface Props {
  bookingId: string;
  amount: number;
  name?: string;
  email?: string;
  phone?: string;
  onSuccess?: (response: any) => void;
}

export default function RazorpayButton({ bookingId, amount, name, email, phone, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderRes = await paymentsApi.createOrder(bookingId, amount);
      const order = orderRes.data;
      await initiatePayment({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'GoTravel',
        description: `Booking ${bookingId}`,
        order_id: order.id,
        prefill: { name, email, contact: phone },
        theme: { color: '#f97316' },
        handler: async (response: any) => {
          try {
            await paymentsApi.verifyPayment(response);
            toast.success('Payment successful!');
            onSuccess?.(response);
          } catch {
            toast.error('Payment verification failed. Contact support.');
          }
        },
      });
    } catch {
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          Processing...
        </span>
      ) : (
        <span>Pay ₹{(amount / 100).toLocaleString('en-IN')}</span>
      )}
    </button>
  );
}
