'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { packagesApi } from '@/lib/api';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, Users, Check } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function PackagesPage() {
  const [type, setType] = useState('');
  const { data, isLoading } = useQuery({ queryKey: ['packages', type], queryFn: () => packagesApi.getAll({ type: type || undefined }).then(r => r.data) });
  const packages = (Array.isArray(data) ? data : (data as any)?.data) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">Travel Packages</h1>
        <p className="text-orange-100">Handcrafted experiences for every type of traveler</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-3 mb-6">
          {[{ v: '', l: 'All' }, { v: 'GROUP', l: 'Group Tours' }, { v: 'FIT', l: 'FIT Packages' }, { v: 'CUSTOM', l: 'Custom' }].map(t => (
            <button key={t.v} onClick={() => setType(t.v)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${type === t.v ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-orange-50'}`}>{t.l}</button>
          ))}
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({length: 6}).map((_, i) => <Skeleton key={i} className="h-64 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg: any) => (
              <Link key={pkg.id} href={`/packages/${pkg.slug}`} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all p-5 border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${pkg.type === 'GROUP' ? 'bg-blue-100 text-blue-700' : pkg.type === 'FIT' ? 'bg-teal-100 text-teal-700' : 'bg-purple-100 text-purple-700'}`}>{pkg.type}</span>
                    <h3 className="font-bold text-gray-900 mt-2 group-hover:text-orange-500 transition-colors">{pkg.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-orange-500">{formatPrice(pkg.discountedPrice || pkg.basePrice)}</p>
                    <p className="text-xs text-gray-400">per person</p>
                  </div>
                </div>
                <div className="flex gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{pkg.durationDays}D/{pkg.durationNights}N</span>
                  {pkg.maxGroupSize && <span className="flex items-center gap-1"><Users className="h-3 w-3" />Up to {pkg.maxGroupSize}</span>}
                </div>
                <ul className="space-y-1 mb-4">
                  {pkg.highlights?.slice(0, 3).map((h: string) => (
                    <li key={h} className="flex items-start gap-1.5 text-xs text-gray-600"><Check className="h-3 w-3 text-teal-500 mt-0.5 flex-shrink-0" />{h}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
