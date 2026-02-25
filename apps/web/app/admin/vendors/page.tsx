'use client';
import { useQuery } from '@tanstack/react-query';
import { adminVendorsApi } from '@/lib/api';
import AdminHeader from '@/components/admin/AdminHeader';
import DataTable from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';

export default function AdminVendorsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-vendors'], queryFn: () => adminVendorsApi.getAll({ limit: 100 }).then(r => r.data) });
  const vendors = (Array.isArray(data) ? data : (data as any)?.data) || [];

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'type', label: 'Type', render: (v: any) => <Badge variant="outline">{v.type}</Badge> },
    { key: 'city', label: 'City' },
    { key: 'contractStatus', label: 'Contract', render: (v: any) => <Badge variant={v.contractStatus === 'ACTIVE' ? 'success' : v.contractStatus === 'PENDING' ? 'warning' : 'destructive'}>{v.contractStatus}</Badge> },
    { key: 'rating', label: 'Rating', render: (v: any) => v.rating ? `⭐ ${v.rating}` : '-' },
    { key: 'phone', label: 'Phone', render: (v: any) => v.phone || '-' },
  ];

  return (
    <div>
      <AdminHeader title="Vendors" />
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-4">{vendors.length} vendors</p>
        {isLoading ? <p className="text-gray-400">Loading...</p> : <DataTable data={vendors} columns={columns as any} />}
      </div>
    </div>
  );
}
