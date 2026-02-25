'use client';
import { useQuery } from '@tanstack/react-query';
import { bookingsApi } from '@/lib/api';
import Link from 'next/link';
import { formatPrice, formatDate } from '@/lib/utils';
import { BOOKING_STATUSES } from '@/lib/constants';
import { Skeleton } from '@/components/ui/skeleton';

export default function BookingsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['my-bookings'], queryFn: () => bookingsApi.getMyBookings().then(r => r.data) });
  const bookings = (Array.isArray(data) ? data : (data as any)?.data) || [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>
      {isLoading ? (
        <div className="space-y-3">{Array.from({length: 4}).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-white rounded-xl border">
          <p className="mb-3">No bookings found</p>
          <Link href="/destinations" className="text-orange-500 hover:underline">Browse packages</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b: any) => {
            const s = BOOKING_STATUSES.find(x => x.value === b.status);
            return (
              <Link key={b.id} href={`/dashboard/bookings/${b.id}`} className="block bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-gray-900">{b.package?.name}</p>
                    <p className="text-xs text-gray-400">Ref: {b.bookingRef}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s?.color || 'bg-gray-100 text-gray-600'}`}>{b.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mt-3">
                  <div><p className="text-gray-400">Travel Date</p><p className="font-medium text-gray-700">{b.travelDate ? formatDate(b.travelDate) : '-'}</p></div>
                  <div><p className="text-gray-400">Travelers</p><p className="font-medium text-gray-700">{b.numAdults + b.numChildren}</p></div>
                  <div><p className="text-gray-400">Amount</p><p className="font-semibold text-orange-500">{formatPrice(b.totalAmount)}</p></div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
