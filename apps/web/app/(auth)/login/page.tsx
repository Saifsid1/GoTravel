'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', { ...form, redirect: false });
    setLoading(false);
    if (res?.ok) {
      toast.success('Welcome back!');
      router.push('/dashboard');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h1>
      <p className="text-gray-500 text-sm mb-6">Sign in to your GoTravel account</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} required className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))} required className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="••••••••" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-4">
        Don't have an account? <Link href="/register" className="text-orange-500 font-medium hover:underline">Register</Link>
      </p>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
        <p>Demo: admin@gotravel.com / Admin@123</p>
      </div>
    </div>
  );
}
