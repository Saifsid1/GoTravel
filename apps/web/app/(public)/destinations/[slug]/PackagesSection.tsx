'use client';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Check, X, Clock, Users } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Props {
  packages: any[];
}

export default function PackagesSection({ packages }: Props) {
  if (!packages.length) return null;
  const groupPkgs = packages.filter(p => p.type === 'GROUP');
  const fitPkgs = packages.filter(p => p.type === 'FIT');

  const PackageCard = ({ pkg }: { pkg: any }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="font-bold text-gray-900">{pkg.name}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{pkg.durationDays}D/{pkg.durationNights}N</span>
            {pkg.maxGroupSize && <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />Max {pkg.maxGroupSize}</span>}
          </div>
        </div>
        <div className="text-right">
          {pkg.discountedPrice && <p className="text-xs text-gray-400 line-through">{formatPrice(pkg.basePrice)}</p>}
          <p className="text-xl font-bold text-orange-500">{formatPrice(pkg.discountedPrice || pkg.basePrice)}</p>
          <p className="text-xs text-gray-400">per person</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs font-semibold text-green-700 mb-1">Included</p>
          {pkg.inclusions?.slice(0, 3).map((inc: string) => (
            <div key={inc} className="flex items-start gap-1 text-xs text-gray-600 mb-0.5"><Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />{inc}</div>
          ))}
        </div>
        <div>
          <p className="text-xs font-semibold text-red-600 mb-1">Excluded</p>
          {pkg.exclusions?.slice(0, 3).map((exc: string) => (
            <div key={exc} className="flex items-start gap-1 text-xs text-gray-600 mb-0.5"><X className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />{exc}</div>
          ))}
        </div>
      </div>
      <Link href={`/packages/${pkg.slug}`} className="w-full block text-center bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
        View Details
      </Link>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Available Packages</h2>
      <Tabs defaultValue="group">
        <TabsList>
          <TabsTrigger value="group">Group Tours ({groupPkgs.length})</TabsTrigger>
          <TabsTrigger value="fit">FIT Packages ({fitPkgs.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="group">
          <div className="space-y-4">{groupPkgs.map(p => <PackageCard key={p.id} pkg={p} />)}</div>
          {!groupPkgs.length && <p className="text-gray-400 text-sm py-4">No group packages available</p>}
        </TabsContent>
        <TabsContent value="fit">
          <div className="space-y-4">{fitPkgs.map(p => <PackageCard key={p.id} pkg={p} />)}</div>
          {!fitPkgs.length && <p className="text-gray-400 text-sm py-4">No FIT packages available. Use the FIT Builder below.</p>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
