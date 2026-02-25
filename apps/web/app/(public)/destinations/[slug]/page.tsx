import { notFound } from 'next/navigation';
import { API_URL } from '@/lib/constants';
import { MapPin, Clock, CloudSun } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import DestinationGallery from '@/components/destinations/DestinationGallery';
import EnquiryForm from '@/components/destinations/EnquiryForm';
import FITSection from './FITSection';
import PackagesSection from './PackagesSection';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const res = await fetch(`${API_URL}/destinations/${params.slug}`, { next: { revalidate: 3600 } });
    const dest = await res.json();
    return { title: dest.seoTitle || `${dest.name} Tour Packages`, description: dest.seoDescription || dest.shortDescription };
  } catch { return { title: 'Destination' }; }
}

export default async function DestinationPage({ params }: { params: { slug: string } }) {
  let dest: any;
  try {
    const res = await fetch(`${API_URL}/destinations/${params.slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) notFound();
    dest = await res.json();
  } catch { notFound(); }

  let packages: any[] = [];
  try {
    const pkgRes = await fetch(`${API_URL}/packages?destinationId=${dest.id}`, { next: { revalidate: 3600 } });
    const pkgData = await pkgRes.json();
    packages = pkgData.data || pkgData || [];
  } catch {}

  return (
    <div>
      <div className="relative h-[60vh] overflow-hidden">
        <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-orange-300 text-sm mb-2"><MapPin className="h-4 w-4" />{dest.state}, India</div>
            <h1 className="text-4xl font-bold mb-2">{dest.name}</h1>
            <p className="text-lg text-gray-200 max-w-2xl">{dest.shortDescription}</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Gallery</h2>
              <DestinationGallery images={dest.galleryImages || []} alt={dest.name} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">About {dest.name}</h2>
              <p className="text-gray-600 leading-relaxed">{dest.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dest.bestTimeToVisit && (
                <div className="bg-orange-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-orange-600 font-semibold mb-1"><Clock className="h-4 w-4" />Best Time to Visit</div>
                  <p className="text-sm text-gray-600">{dest.bestTimeToVisit}</p>
                </div>
              )}
              {dest.weatherInfo && (
                <div className="bg-teal-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-teal-600 font-semibold mb-1"><CloudSun className="h-4 w-4" />Weather</div>
                  <p className="text-sm text-gray-600">{dest.weatherInfo}</p>
                </div>
              )}
            </div>
            <PackagesSection packages={packages} />
            <FITSection destinationId={dest.id} destinationSlug={dest.slug} destinationName={dest.name} />
          </div>
          <div className="space-y-6">
            <div className="bg-orange-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500 mb-1">Starting from</p>
              <p className="text-3xl font-bold text-orange-500">{formatPrice(dest.basePricePerPerson)}</p>
              <p className="text-sm text-gray-500">per person</p>
            </div>
            <EnquiryForm destinationId={dest.id} destinationName={dest.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
