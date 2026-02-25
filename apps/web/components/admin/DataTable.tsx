'use client';
import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export default function DataTable<T extends { id: string }>({ data, columns, className }: Props<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sortedData = [...data].sort((a: any, b: any) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey], bVal = b[sortKey];
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className={cn('overflow-x-auto rounded-xl border border-gray-200', className)}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th key={String(col.key)} className={cn('px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider', col.sortable && 'cursor-pointer hover:bg-gray-100')}
                onClick={() => col.sortable && handleSort(String(col.key))}>
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortKey === String(col.key) && (sortDir === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {sortedData.map(row => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              {columns.map(col => (
                <td key={String(col.key)} className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                  {col.render ? col.render(row) : String((row as any)[col.key] ?? '-')}
                </td>
              ))}
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-gray-400 text-sm">No records found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
