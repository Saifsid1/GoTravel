import { Star } from 'lucide-react';
import type { Testimonial } from '@gotravel/types';

interface Props {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: Props) {
  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">What Our Travelers Say</h2>
          <p className="mt-2 text-gray-600">Real stories from real adventurers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map(t => (
            <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-4 italic">"{t.review}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600 text-sm">
                  {t.userName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.userName}</p>
                  {t.destination && <p className="text-xs text-gray-400">{t.destination}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
