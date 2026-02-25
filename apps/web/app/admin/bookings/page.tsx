'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminBookingsApi } from '@/lib/api';
import AdminHeader from '@/components/admin/AdminHeader';
import DataTable from '@/components/admin/DataTable';
import { formatPrice, formatDate } from '@/lib/utils';
import { BOOKING_STATUSES } from '@/lib/constants';
import toast from 'react-hot-toast';

export default function AdminBookingsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['admin-bookings'], queryFn: () => adminBookingsApi.getAll({ limit: 100 }).then(r => r.data) });
  const bookings = (Array.isArray(data) ? data : (data as any)?.data) || [];

  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => adminBookingsApi.updateStatus(id, status),
    onSuccess: () => { toast.success('Status updated'); qc.invalidateQueries({ queryKey: ['admin-bookings'] }); },
    onError: () => toast.error('Failed to update'),
  });

  const columns = [
    { key: 'bookingRef', label: 'Ref', sortable: true, render: (b: any) => <span className="font-mono text-xs">{b.bookingRef?.slice(0,8)}</span> },
    { key: 'user', label: 'Traveler', render: (b: any) => <span className="text-sm">{b.user?.name || b.user?.email || '-'}</span> },
    { key: 'package', label: 'Package', render: (b: any) => <span className="text-sm">{b.package?.name || '-'}</span> },
    { key: 'travelDate', label: 'Travel Date', render: (b: any) => <span className="text-sm">{b.travelDate ? formatDate(b.travelDate) : '-'}</span> },
    { key: 'totalAmount', label: 'Amount', sortable: true, render: (b: any) => <span className="font-semibold text-orange-500">{formatPrice(b.totalAmount)}</span> },
    { key: 'status', label: 'Status', render: (b: any) => (
      <select defaultValue={b.status} onChange={e => updateStatus({ id: b.id, status: e.target.value })} className="text-xs border border-gray-200 rounded px-2 py-1 bg-white">
        {BOOKING_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
    )},
  ];

  return (
    <div>
      <AdminHeader title="Bookings" />
      <div className="p-6">
        {isLoading ? <p className="text-gray-400">Loading...</p> : <DataTable data={bookings} columns={columns as any} />}
      </div>
    </div>
  );
}
