import Link from 'next/link';
import { API_URL } from '@/lib/constants';
import { CheckCircle, Share2, MessageCircle } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

export default async function ConfirmationPage({ params }: { params: { bookingRef: string } }) {
  let booking: any = null;
  try {
    const res = await fetch(`${API_URL}/bookings/ref/${params.bookingRef}`, { cache: 'no-store' });
    if (res.ok) booking = await res.json();
  } catch {}

  const waMessage = encodeURIComponent(`I just booked a trip with GoTravel! 🎉 Booking Ref: ${params.bookingRef}`);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Booking Confirmed! 🎉</h1>
        <p className="text-gray-500 mb-6">Thank you for booking with GoTravel</p>
        <div className="bg-orange-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
          <p className="text-xl font-bold font-mono text-orange-500">{params.bookingRef}</p>
        </div>
        {booking && (
          <div className="text-left space-y-2 mb-6 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Package</span><span className="font-medium">{booking.package?.name}</span></div>
            {booking.travelDate && <div className="flex justify-between"><span className="text-gray-500">Travel Date</span><span className="font-medium">{formatDate(booking.travelDate)}</span></div>}
            <div className="flex justify-between"><span className="text-gray-500">Travelers</span><span className="font-medium">{booking.numAdults + booking.numChildren}</span></div>
            <div className="flex justify-between font-bold"><span>Total Paid</span><span className="text-orange-500">{formatPrice(booking.totalAmount)}</span></div>
          </div>
        )}
        <div className="space-y-3">
          <a href={`https://wa.me/?text=${waMessage}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-2.5 rounded-xl font-medium hover:bg-green-600 transition-colors">
            <MessageCircle className="h-4 w-4" /> Share on WhatsApp
          </a>
          <Link href="/dashboard/bookings" className="block w-full border border-gray-300 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors">View My Bookings</Link>
          <Link href="/" className="block w-full text-orange-500 text-sm hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
