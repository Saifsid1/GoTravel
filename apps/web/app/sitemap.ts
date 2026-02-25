import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/destinations`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Try to fetch dynamic pages
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    
    const [destRes, packageRes, blogRes] = await Promise.allSettled([
      fetch(`${apiUrl}/destinations?limit=100`),
      fetch(`${apiUrl}/packages?limit=100`),
      fetch(`${apiUrl}/blog?limit=100`),
    ]);

    const dynamicPages: MetadataRoute.Sitemap = [];

    if (destRes.status === 'fulfilled' && destRes.value.ok) {
      const { data } = await destRes.value.json();
      data?.forEach((d: any) => {
        dynamicPages.push({
          url: `${baseUrl}/destinations/${d.slug}`,
          lastModified: new Date(d.updatedAt),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
        dynamicPages.push({
          url: `${baseUrl}/destinations/${d.slug}/fit`,
          lastModified: new Date(d.updatedAt),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    }

    if (packageRes.status === 'fulfilled' && packageRes.value.ok) {
      const packages = await packageRes.value.json();
      packages?.forEach((p: any) => {
        dynamicPages.push({
          url: `${baseUrl}/packages/${p.slug}`,
          lastModified: new Date(p.updatedAt),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    }

    if (blogRes.status === 'fulfilled' && blogRes.value.ok) {
      const { data } = await blogRes.value.json();
      data?.forEach((b: any) => {
        dynamicPages.push({
          url: `${baseUrl}/blog/${b.slug}`,
          lastModified: new Date(b.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    }

    return [...staticPages, ...dynamicPages];
  } catch {
    return staticPages;
  }
}
