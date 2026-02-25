import Link from 'next/link';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Destination } from '@gotravel/types';

interface Props {
  destinations: Destination[];
}

export default function FeaturedDestinations({ destinations }: Props) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Featured Destinations</h2>
          <p className="mt-2 text-gray-600">Discover India's most breathtaking places</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.slice(0, 6).map(dest => (
            <Link key={dest.id} href={`/destinations/${dest.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" /> 4.8
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-bold text-lg">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3" /> {dest.state}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-500 text-sm line-clamp-2">{dest.shortDescription}</p>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="text-xs text-gray-400">Starting from</span>
                    <div className="text-orange-500 font-bold">{formatPrice(dest.basePricePerPerson)}<span className="text-xs text-gray-400 font-normal">/person</span></div>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-teal-600 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/destinations" className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors">
            View All Destinations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
