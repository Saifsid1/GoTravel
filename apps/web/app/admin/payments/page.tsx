'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import AdminHeader from '@/components/admin/AdminHeader';
import DataTable from '@/components/admin/DataTable';
import { formatPrice, formatDate } from '@/lib/utils';

export default function AdminPaymentsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-payments'], queryFn: () => api.get('/payments?limit=100').then(r => r.data) });
  const payments = (Array.isArray(data) ? data : (data as any)?.data) || [];

  const columns = [
    { key: 'id', label: 'ID', render: (p: any) => <span className="font-mono text-xs">{p.id?.slice(0,8)}</span> },
    { key: 'amount', label: 'Amount', render: (p: any) => <span className="font-semibold text-orange-500">{formatPrice(p.amount)}</span> },
    { key: 'status', label: 'Status', render: (p: any) => <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'captured' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{p.status}</span> },
    { key: 'paymentMethod', label: 'Method', render: (p: any) => p.paymentMethod || '-' },
    { key: 'razorpayPaymentId', label: 'Payment ID', render: (p: any) => p.razorpayPaymentId || '-' },
    { key: 'createdAt', label: 'Date', render: (p: any) => formatDate(p.createdAt) },
  ];

  return (
    <div>
      <AdminHeader title="Payments" />
      <div className="p-6">
        {isLoading ? <p className="text-gray-400">Loading...</p> : <DataTable data={payments} columns={columns as any} />}
      </div>
    </div>
  );
}
