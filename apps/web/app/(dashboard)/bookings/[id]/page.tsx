'use client';
import { useQuery } from '@tanstack/react-query';
import { bookingsApi } from '@/lib/api';
import { formatPrice, formatDate } from '@/lib/utils';
import { BOOKING_STATUSES } from '@/lib/constants';
import RazorpayButton from '@/components/booking/RazorpayButton';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const user = session?.user as any;
  const { data: booking, isLoading } = useQuery({ queryKey: ['booking', params.id], queryFn: () => bookingsApi.getById(params.id).then(r => r.data) });
  const s = BOOKING_STATUSES.find(x => x.value === booking?.status);

  if (isLoading) return <div className="space-y-4">{Array.from({length:4}).map((_,i) => <Skeleton key={i} className="h-20 rounded-xl" />)}</div>;
  if (!booking) return <p className="text-gray-400">Booking not found</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${s?.color || 'bg-gray-100 text-gray-600'}`}>{booking.status}</span>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div className="bg-orange-50 p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">{booking.package?.name}</h2>
          <p className="text-sm text-gray-500">Ref: {booking.bookingRef}</p>
        </div>
        <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[['Travel Date', booking.travelDate ? formatDate(booking.travelDate) : '-'], ['Return Date', booking.returnDate ? formatDate(booking.returnDate) : '-'], ['Adults', booking.numAdults], ['Children', booking.numChildren]].map(([label, val]) => (
            <div key={String(label)}><p className="text-xs text-gray-400 mb-0.5">{label}</p><p className="font-semibold text-gray-800">{val}</p></div>
          ))}
        </div>
        <div className="px-5 pb-5 border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Total Amount</span><span className="text-xl font-bold text-gray-900">{formatPrice(booking.totalAmount)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Paid</span><span className="text-lg font-semibold text-green-600">{formatPrice(booking.paidAmount)}</span>
          </div>
          {booking.paidAmount < booking.totalAmount && (
            <div className="mt-4">
              <RazorpayButton bookingId={booking.id} amount={(booking.totalAmount - booking.paidAmount) * 100} name={user?.name} email={user?.email} />
            </div>
          )}
        </div>
      </div>
      {booking.specialRequests && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Special Requests</p>
          <p className="text-sm text-gray-500">{booking.specialRequests}</p>
        </div>
      )}
    </div>
  );
}
