'use client';
import { useQuery } from '@tanstack/react-query';
import { adminLeadsApi } from '@/lib/api';
import AdminHeader from '@/components/admin/AdminHeader';
import LeadKanban from '@/components/admin/LeadKanban';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLeadsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-leads'], queryFn: () => adminLeadsApi.getAll({ limit: 100 }).then(r => r.data) });
  const leads = (Array.isArray(data) ? data : (data as any)?.data) || [];

  return (
    <div>
      <AdminHeader title="Leads Management" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">{leads.length} total leads</p>
        </div>
        {isLoading ? <div className="grid grid-cols-4 gap-4">{Array.from({length:4}).map((_,i)=><Skeleton key={i} className="h-64 rounded-xl"/>)}</div> : <LeadKanban leads={leads} />}
      </div>
    </div>
  );
}
