import Link from 'next/link';
import { MapPin, Star, Clock } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Destination } from '@gotravel/types';

interface Props {
  destination: Destination;
}

export default function DestinationCard({ destination }: Props) {
  return (
    <Link href={`/destinations/${destination.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative h-52 overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 text-orange-600 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="h-3 w-3 fill-current" /> 4.8
        </div>
        {destination.isFeatured && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Featured</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 text-white">
          <h3 className="font-bold text-lg">{destination.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="h-3 w-3" /> {destination.state}
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">{destination.shortDescription}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {destination.categories?.slice(0, 3).map(cat => (
            <span key={cat} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{cat}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400">From</span>
            <div className="text-orange-500 font-bold text-lg">{formatPrice(destination.basePricePerPerson)}<span className="text-xs text-gray-400 font-normal">/person</span></div>
          </div>
          <span className="text-sm font-medium text-teal-600 group-hover:text-teal-700">Explore →</span>
        </div>
      </div>
    </Link>
  );
}
