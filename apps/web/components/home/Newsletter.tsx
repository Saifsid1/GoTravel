'use client';
import { useState } from 'react';
import { useLeadCapture } from '@/hooks/useLeadCapture';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const { mutate, isPending } = useLeadCapture();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ userName: 'Newsletter Subscriber', userEmail: email, sourcePage: 'newsletter', message: 'Newsletter signup' });
    setEmail('');
  };

  return (
    <section className="py-12 bg-orange-500">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <Mail className="h-10 w-10 text-white mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-white mb-2">Get Travel Inspiration in Your Inbox</h2>
        <p className="text-orange-100 mb-6">Join 50,000+ travelers. Get exclusive deals, destination guides, and travel tips.</p>
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-xl text-sm bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-orange-200 focus:outline-none focus:border-white"
          />
          <button type="submit" disabled={isPending} className="px-6 py-3 bg-white text-orange-500 font-semibold rounded-xl hover:bg-orange-50 transition-colors disabled:opacity-50">
            {isPending ? '...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}
