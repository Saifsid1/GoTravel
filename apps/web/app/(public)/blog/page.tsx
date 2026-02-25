import Link from 'next/link';
import { API_URL } from '@/lib/constants';
import { Calendar } from 'lucide-react';

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    const res = await fetch(`${API_URL}/blog?published=true`, { next: { revalidate: 3600 } });
    const data = await res.json();
    posts = data.data || data || [];
  } catch {}

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">Travel Blog</h1>
        <p className="text-orange-100">Tips, guides, and stories from incredible India</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              {post.featuredImage && <div className="h-48 overflow-hidden"><img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>}
              <div className="p-5">
                <div className="flex gap-2 mb-2">{post.tags?.slice(0,2).map((t: string) => <span key={t} className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">{t}</span>)}</div>
                <h2 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors">{post.title}</h2>
                {post.excerpt && <p className="text-sm text-gray-500 mt-2 line-clamp-2">{post.excerpt}</p>}
                {post.publishedAt && <div className="flex items-center gap-1 text-xs text-gray-400 mt-3"><Calendar className="h-3 w-3" />{new Date(post.publishedAt).toLocaleDateString('en-IN', {day:'numeric',month:'short',year:'numeric'})}</div>}
              </div>
            </Link>
          ))}
        </div>
        {posts.length === 0 && <p className="text-center text-gray-400 py-16">No blog posts yet</p>}
      </div>
    </div>
  );
}
