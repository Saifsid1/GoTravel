import { notFound } from 'next/navigation';
import { API_URL } from '@/lib/constants';
import { Calendar, User } from 'lucide-react';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post: any;
  try {
    const res = await fetch(`${API_URL}/blog/${params.slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) notFound();
    post = await res.json();
  } catch { notFound(); }

  return (
    <div className="min-h-screen bg-white">
      {post.featuredImage && (
        <div className="h-72 md:h-96 relative overflow-hidden">
          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex gap-2 mb-4">{post.tags?.map((t: string) => <span key={t} className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">{t}</span>)}</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
          <span className="flex items-center gap-1"><User className="h-4 w-4" />{post.author?.name || 'GoTravel Team'}</span>
          {post.publishedAt && <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(post.publishedAt).toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'})}</span>}
        </div>
        <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</div>
      </div>
    </div>
  );
}
