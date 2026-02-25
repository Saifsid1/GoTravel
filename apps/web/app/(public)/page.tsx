import HeroSection from '@/components/home/HeroSection';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';
import FITBanner from '@/components/home/FITBanner';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import Stats from '@/components/home/Stats';
import BlogPreview from '@/components/home/BlogPreview';
import Newsletter from '@/components/home/Newsletter';
import { API_URL } from '@/lib/constants';

async function getDestinations() {
  try {
    const res = await fetch(`${API_URL}/destinations/featured`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || data || [];
  } catch { return []; }
}

async function getBlogPosts() {
  try {
    const res = await fetch(`${API_URL}/blog?limit=3&published=true`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || data || [];
  } catch { return []; }
}

export default async function HomePage() {
  const [destinations, posts] = await Promise.all([getDestinations(), getBlogPosts()]);
  return (
    <>
      <HeroSection />
      <FeaturedDestinations destinations={destinations} />
      <FITBanner />
      <HowItWorks />
      <Stats />
      <BlogPreview posts={posts} />
      <Newsletter />
    </>
  );
}
