'use client';
import { useState } from 'react';
import { useDestinations } from '@/hooks/useDestinations';
import DestinationCard from '@/components/destinations/DestinationCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter } from 'lucide-react';

export default function DestinationsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { data, isLoading } = useDestinations();
  const destinations = (Array.isArray(data) ? data : (data as any)?.data) || [];

  const categories = ['Adventure', 'Beach', 'Cultural', 'Heritage', 'Hill Station', 'Honeymoon', 'Nature', 'Spiritual'];

  const filtered = destinations.filter((d: any) => {
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.state.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || d.categories?.includes(selectedCategory);
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">Explore Destinations</h1>
          <p className="text-orange-100 text-lg">Discover India's most beautiful places</p>
          <div className="mt-6 flex gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Search destinations..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl text-gray-900 text-sm focus:outline-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setSelectedCategory('')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!selectedCategory ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'}`}>All</button>
          {categories.map(c => (
            <button key={c} onClick={() => setSelectedCategory(c)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === c ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'}`}>{c}</button>
          ))}
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({length: 6}).map((_, i) => <Skeleton key={i} className="h-72 rounded-2xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No destinations found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((d: any) => <DestinationCard key={d.id} destination={d} />)}
          </div>
        )}
      </div>
    </div>
  );
}
