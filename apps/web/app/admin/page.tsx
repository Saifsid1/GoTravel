'use client';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/lib/api';
import AdminHeader from '@/components/admin/AdminHeader';
import StatCard from '@/components/admin/StatCard';
import RevenueChart from '@/components/admin/RevenueChart';
import { BookOpen, Users, IndianRupee, TrendingUp } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: stats } = useQuery({ queryKey: ['dashboard-stats'], queryFn: () => analyticsApi.getDashboard().then(r => r.data) });

  const revenueData = stats?.revenueByMonth || [
    { month: 'Sep', revenue: 250000 }, { month: 'Oct', revenue: 380000 },
    { month: 'Nov', revenue: 420000 }, { month: 'Dec', revenue: 610000 },
    { month: 'Jan', revenue: 530000 }, { month: 'Feb', revenue: 490000 },
  ];

  return (
    <div>
      <AdminHeader title="Dashboard" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Revenue" value={stats ? formatPrice(stats.totalRevenue || 0) : '—'} icon={<IndianRupee className="h-5 w-5" />} trend={12} color="orange" />
          <StatCard title="Total Bookings" value={stats?.totalBookings ?? '—'} icon={<BookOpen className="h-5 w-5" />} trend={8} color="teal" />
          <StatCard title="Total Leads" value={stats?.totalLeads ?? '—'} icon={<Users className="h-5 w-5" />} trend={15} color="blue" />
          <StatCard title="Conversion Rate" value={stats ? `${stats.conversionRate?.toFixed(1) || 0}%` : '—'} icon={<TrendingUp className="h-5 w-5" />} trend={3} color="green" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><RevenueChart data={revenueData} /></div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { href: '/admin/leads', label: 'View All Leads', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
                { href: '/admin/bookings', label: 'Manage Bookings', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
                { href: '/admin/destinations', label: 'Destinations', color: 'bg-orange-50 text-orange-700 hover:bg-orange-100' },
                { href: '/admin/analytics', label: 'Analytics', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
              ].map(a => (
                <Link key={a.href} href={a.href} className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${a.color}`}>{a.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
