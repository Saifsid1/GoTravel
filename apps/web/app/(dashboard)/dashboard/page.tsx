'use client';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { bookingsApi } from '@/lib/api';
import Link from 'next/link';
import { BookOpen, User, MapPin } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { BOOKING_STATUSES } from '@/lib/constants';

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user as any;
  const { data, isLoading } = useQuery({ queryKey: ['my-bookings'], queryFn: () => bookingsApi.getMyBookings().then(r => r.data) });
  const bookings = (Array.isArray(data) ? data : (data as any)?.data) || [];

  return (
    <div>
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0] || 'Traveler'}! 👋</h1>
        <p className="text-gray-600 mt-1">Ready for your next adventure?</p>
        <Link href="/destinations" className="inline-block mt-4 bg-orange-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors">Explore Destinations</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          { icon: BookOpen, label: 'Total Bookings', value: bookings.length, href: '/dashboard/bookings' },
          { icon: MapPin, label: 'Destinations Visited', value: new Set(bookings.map((b: any) => b.package?.destinationId)).size, href: '/destinations' },
          { icon: User, label: 'Profile', value: 'Complete →', href: '/dashboard/profile' },
        ].map(item => (
          <Link key={item.label} href={item.href} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <item.icon className="h-6 w-6 text-orange-500 mb-2" />
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="font-bold text-gray-900">{item.value}</p>
          </Link>
        ))}
      </div>
      <div>
        <h2 className="font-bold text-gray-900 mb-4">Recent Bookings</h2>
        {isLoading ? <p className="text-gray-400 text-sm">Loading...</p> : bookings.length === 0 ? (
          <div className="text-center py-8 text-gray-400 bg-white rounded-xl border border-gray-100">
            <BookOpen className="h-10 w-10 mx-auto mb-2 opacity-40" />
            <p>No bookings yet</p>
            <Link href="/destinations" className="text-orange-500 text-sm hover:underline mt-1 block">Browse packages</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 5).map((b: any) => {
              const statusInfo = BOOKING_STATUSES.find(s => s.value === b.status);
              return (
                <Link key={b.id} href={`/dashboard/bookings/${b.id}`} className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{b.package?.name || 'Package'}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Ref: {b.bookingRef?.slice(0, 8)}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusInfo?.color || 'bg-gray-100 text-gray-600'}`}>{b.status}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Travel: {b.travelDate ? formatDate(b.travelDate) : '-'}</span>
                    <span className="font-semibold text-orange-500">{formatPrice(b.totalAmount)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
