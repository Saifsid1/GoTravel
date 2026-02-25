'use client';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { destinationsApi, adminDestinationsApi } from '@/lib/api';
import AdminHeader from '@/components/admin/AdminHeader';
import DataTable from '@/components/admin/DataTable';
import { Dialog } from '@/components/ui/dialog';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminDestinationsPage() {
  const qc = useQueryClient();
  const [editItem, setEditItem] = useState<any>(null);
  const { data, isLoading } = useQuery({ queryKey: ['admin-destinations'], queryFn: () => destinationsApi.getAll({ limit: 100 }).then(r => r.data) });
  const destinations = (Array.isArray(data) ? data : (data as any)?.data) || [];

  const handleSave = async () => {
    try {
      if (editItem?.id) {
        await adminDestinationsApi.update(editItem.id, editItem);
      } else {
        await adminDestinationsApi.create(editItem);
      }
      toast.success('Saved!');
      qc.invalidateQueries({ queryKey: ['admin-destinations'] });
      setEditItem(null);
    } catch { toast.error('Failed to save'); }
  };

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'state', label: 'State' },
    { key: 'basePricePerPerson', label: 'Base Price', render: (d: any) => formatPrice(d.basePricePerPerson) },
    { key: 'isFeatured', label: 'Featured', render: (d: any) => d.isFeatured ? '✅' : '—' },
    { key: 'isActive', label: 'Active', render: (d: any) => d.isActive ? '✅' : '❌' },
    { key: 'actions', label: 'Actions', render: (d: any) => (
      <button onClick={() => setEditItem(d)} className="text-xs text-orange-500 hover:underline">Edit</button>
    )},
  ];

  return (
    <div>
      <AdminHeader title="Destinations" />
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <button onClick={() => setEditItem({ name: '', state: '', city: '', description: '', shortDescription: '', heroImage: '', basePricePerPerson: 0 })} className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">+ Add Destination</button>
        </div>
        {isLoading ? <p className="text-gray-400">Loading...</p> : <DataTable data={destinations} columns={columns as any} />}
      </div>
      <Dialog open={!!editItem} onClose={() => setEditItem(null)} title={editItem?.id ? 'Edit Destination' : 'Add Destination'}>
        {editItem && (
          <div className="space-y-3">
            {['name', 'state', 'city', 'heroImage', 'shortDescription'].map(field => (
              <div key={field}>
                <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">{field}</label>
                <input type="text" value={editItem[field] || ''} onChange={e => setEditItem((p: any) => ({...p, [field]: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Base Price</label>
              <input type="number" value={editItem.basePricePerPerson || 0} onChange={e => setEditItem((p: any) => ({...p, basePricePerPerson: +e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <button onClick={handleSave} className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-medium hover:bg-orange-600">Save</button>
          </div>
        )}
      </Dialog>
    </div>
  );
}
