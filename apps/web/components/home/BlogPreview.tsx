import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@gotravel/types';

interface Props {
  posts: BlogPost[];
}

export default function BlogPreview({ posts }: Props) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Travel Inspiration</h2>
            <p className="mt-1 text-gray-600">Tips, guides, and stories from India</p>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-1 text-orange-500 font-medium hover:text-orange-600">
            All Posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-44 mb-3">
                {post.featuredImage && (
                  <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                )}
              </div>
              <div className="flex gap-2 mb-2">
                {post.tags?.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2">{post.title}</h3>
              {post.excerpt && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.excerpt}</p>}
              {post.publishedAt && (
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
