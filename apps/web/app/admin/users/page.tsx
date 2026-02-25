'use client';
import { useQuery } from '@tanstack/react-query';
import { adminUsersApi } from '@/lib/api';
import AdminHeader from '@/components/admin/AdminHeader';
import DataTable from '@/components/admin/DataTable';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function AdminUsersPage() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-users'], queryFn: () => adminUsersApi.getAll({ limit: 100 }).then(r => r.data) });
  const users = (Array.isArray(data) ? data : (data as any)?.data) || [];

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', render: (u: any) => u.phone || '-' },
    { key: 'role', label: 'Role', render: (u: any) => <Badge variant={u.role === 'ADMIN' ? 'warning' : 'default'}>{u.role}</Badge> },
    { key: 'createdAt', label: 'Joined', render: (u: any) => formatDate(u.createdAt) },
    { key: 'utmSource', label: 'Source', render: (u: any) => u.utmSource || '-' },
  ];

  return (
    <div>
      <AdminHeader title="Users" />
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-4">{users.length} registered users</p>
        {isLoading ? <p className="text-gray-400">Loading...</p> : <DataTable data={users} columns={columns as any} />}
      </div>
    </div>
  );
}
