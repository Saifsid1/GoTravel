'use client';
import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [travelers, setTravelers] = useState('2');

  const destinations = ['Manali', 'Goa', 'Kerala', 'Rajasthan', 'Ladakh', 'Andaman', 'Coorg', 'Rishikesh'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination) {
      router.push(`/destinations/${destination.toLowerCase()}`);
    } else {
      router.push('/destinations');
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80"
          alt="Incredible India"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <span className="inline-block bg-orange-500/90 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          ✈️ AI-Powered Travel Planning
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Discover <span className="text-orange-400">Incredible</span><br />India
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Fully customizable FIT packages & expertly curated group tours. Your perfect Indian journey starts here.
        </p>
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-4 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl">
              <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
              <select
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-700 focus:outline-none"
              >
                <option value="">All Destinations</option>
                {destinations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl">
              <Calendar className="h-4 w-4 text-orange-500 flex-shrink-0" />
              <input
                type="date"
                className="flex-1 bg-transparent text-sm text-gray-700 focus:outline-none"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl">
              <Users className="h-4 w-4 text-orange-500 flex-shrink-0" />
              <select
                value={travelers}
                onChange={e => setTravelers(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-700 focus:outline-none"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} Traveler{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="mt-3 w-full md:w-auto md:ml-auto flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
            <Search className="h-4 w-4" />
            Search Trips
          </button>
        </form>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {destinations.slice(0, 5).map(d => (
            <a key={d} href={`/destinations/${d.toLowerCase()}`} className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
              {d}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
