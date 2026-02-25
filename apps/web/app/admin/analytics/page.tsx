'use client';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/lib/api';
import AdminHeader from '@/components/admin/AdminHeader';
import StatCard from '@/components/admin/StatCard';
import RevenueChart from '@/components/admin/RevenueChart';
import { IndianRupee, BookOpen, Users, TrendingUp, MapPin } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminAnalyticsPage() {
  const { data: stats } = useQuery({ queryKey: ['analytics'], queryFn: () => analyticsApi.getDashboard().then(r => r.data) });

  const revenueData = stats?.revenueByMonth || [
    { month: 'Sep', revenue: 250000 }, { month: 'Oct', revenue: 380000 },
    { month: 'Nov', revenue: 420000 }, { month: 'Dec', revenue: 610000 },
    { month: 'Jan', revenue: 530000 }, { month: 'Feb', revenue: 490000 },
  ];

  return (
    <div>
      <AdminHeader title="Analytics" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Revenue" value={stats ? formatPrice(stats.totalRevenue || 0) : '—'} icon={<IndianRupee className="h-5 w-5" />} color="orange" />
          <StatCard title="Total Bookings" value={stats?.totalBookings ?? '—'} icon={<BookOpen className="h-5 w-5" />} color="teal" />
          <StatCard title="Total Leads" value={stats?.totalLeads ?? '—'} icon={<Users className="h-5 w-5" />} color="blue" />
          <StatCard title="Conversion Rate" value={stats ? `${stats.conversionRate?.toFixed(1) || 0}%` : '—'} icon={<TrendingUp className="h-5 w-5" />} color="green" />
        </div>
        <RevenueChart data={revenueData} />
        {stats?.topDestinations && (
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Top Destinations</h3>
            <div className="space-y-2">
              {stats.topDestinations.map((d: any, i: number) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-orange-500" /><span className="text-sm text-gray-700">{d.name}</span></div>
                  <span className="text-sm font-semibold text-gray-900">{d.count} bookings</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
