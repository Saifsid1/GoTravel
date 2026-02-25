'use client';
import { useState } from 'react';
import type { Lead } from '@gotravel/types';
import { adminLeadsApi } from '@/lib/api';
import toast from 'react-hot-toast';

const COLUMNS = [
  { status: 'NEW', label: 'New', color: 'bg-blue-50 border-blue-200' },
  { status: 'CONTACTED', label: 'Contacted', color: 'bg-yellow-50 border-yellow-200' },
  { status: 'CONVERTED', label: 'Converted', color: 'bg-green-50 border-green-200' },
  { status: 'LOST', label: 'Lost', color: 'bg-red-50 border-red-200' },
];

interface Props {
  leads: Lead[];
}

export default function LeadKanban({ leads: initialLeads }: Props) {
  const [leads, setLeads] = useState(initialLeads);

  const updateStatus = async (id: string, status: string) => {
    try {
      await adminLeadsApi.updateStatus(id, status);
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: status as Lead['status'] } : l));
      toast.success('Lead status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {COLUMNS.map(col => {
        const colLeads = leads.filter(l => l.status === col.status);
        return (
          <div key={col.status} className={`rounded-xl border-2 p-3 ${col.color}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-gray-700">{col.label}</h3>
              <span className="bg-white text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">{colLeads.length}</span>
            </div>
            <div className="space-y-2">
              {colLeads.map(lead => (
                <div key={lead.id} className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="font-medium text-sm text-gray-900">{lead.userName}</p>
                  <p className="text-xs text-gray-500 truncate">{lead.userEmail}</p>
                  {lead.destination && <p className="text-xs text-teal-600 mt-1">📍 {(lead.destination as any)?.name || ''}</p>}
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {COLUMNS.filter(c => c.status !== col.status).map(c => (
                      <button key={c.status} onClick={() => updateStatus(lead.id, c.status)} className="text-xs text-gray-500 hover:text-gray-700 underline">
                        → {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
