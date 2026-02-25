import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export default function FITBanner() {
  const benefits = [
    'Choose your own dates & duration',
    'Pick only the activities you love',
    'Select accommodation at your budget',
    'AI-powered personalized recommendations',
    'No minimum group size required',
    '24/7 support throughout your trip',
  ];
  return (
    <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-white/20 text-sm font-medium px-3 py-1 rounded-full mb-4">🚀 New Feature</span>
            <h2 className="text-3xl font-bold mb-4">Build Your Perfect FIT Package</h2>
            <p className="text-teal-100 mb-6">Fully Independent Travel (FIT) — create a completely personalized itinerary. Mix and match activities, stays, and experiences at your pace and budget.</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {benefits.map(b => (
                <li key={b} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-teal-300 flex-shrink-0" /> {b}
                </li>
              ))}
            </ul>
            <Link href="/destinations" className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors">
              Start Building <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="font-semibold mb-4 text-lg">FIT Builder Preview</h3>
              <div className="space-y-3">
                {[
                  { icon: '🏔️', label: 'Rohtang Pass Excursion', price: '₹2,500' },
                  { icon: '🏂', label: 'Skiing at Solang Valley', price: '₹1,800' },
                  { icon: '🏨', label: 'Boutique Mountain Resort', price: '₹4,500/night' },
                  { icon: '🍛', label: 'Local Cuisine Experience', price: '₹800' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-2.5">
                    <span>{item.icon} {item.label}</span>
                    <span className="font-semibold text-teal-200">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 flex justify-between">
                <span className="font-medium">Total Estimate</span>
                <span className="text-xl font-bold text-white">₹9,600</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
