import { notFound } from 'next/navigation';
import { API_URL } from '@/lib/constants';
import { Clock, Users, Check, X, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import ItineraryTimeline from '@/components/destinations/ItineraryTimeline';
import Link from 'next/link';

export default async function PackagePage({ params }: { params: { slug: string } }) {
  let pkg: any;
  try {
    const res = await fetch(`${API_URL}/packages/${params.slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) notFound();
    pkg = await res.json();
  } catch { notFound(); }

  return (
    <div>
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${pkg.type === 'GROUP' ? 'bg-blue-500' : 'bg-teal-500'}`}>{pkg.type}</span>
            {pkg.difficultyLevel && <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">{pkg.difficultyLevel}</span>}
          </div>
          <h1 className="text-4xl font-bold mb-4">{pkg.name}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-gray-300">
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-orange-400" />{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
            {pkg.maxGroupSize && <span className="flex items-center gap-2"><Users className="h-4 w-4 text-orange-400" />Max {pkg.maxGroupSize} people</span>}
            <span className="flex items-center gap-2"><Star className="h-4 w-4 text-orange-400" />4.8 Rating</span>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />What's Included</h3>
                <ul className="space-y-1">{pkg.inclusions?.map((inc: string) => <li key={inc} className="flex items-start gap-1.5 text-sm text-gray-600"><Check className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />{inc}</li>)}</ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><X className="h-4 w-4 text-red-500" />What's Excluded</h3>
                <ul className="space-y-1">{pkg.exclusions?.map((exc: string) => <li key={exc} className="flex items-start gap-1.5 text-sm text-gray-600"><X className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />{exc}</li>)}</ul>
              </div>
            </div>
            {pkg.itineraries?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Day-by-Day Itinerary</h2>
                <ItineraryTimeline itineraries={pkg.itineraries} />
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-20">
              {pkg.discountedPrice && <p className="text-sm text-gray-400 line-through">{formatPrice(pkg.basePrice)}/person</p>}
              <p className="text-3xl font-bold text-orange-500">{formatPrice(pkg.discountedPrice || pkg.basePrice)}</p>
              <p className="text-sm text-gray-500 mb-4">per person</p>
              <ul className="space-y-1.5 mb-5 text-sm">
                {pkg.highlights?.map((h: string) => <li key={h} className="flex items-start gap-1.5 text-gray-600"><Check className="h-3.5 w-3.5 text-teal-500 mt-0.5 flex-shrink-0" />{h}</li>)}
              </ul>
              <Link href={`/book/${pkg.slug}`} className="w-full block text-center bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">Book Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
