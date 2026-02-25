'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      await signIn('credentials', { email: form.email, password: form.password, redirect: false });
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
      <p className="text-gray-500 text-sm mb-6">Join 50,000+ travelers on GoTravel</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
          { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
          { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 98765 43210' },
          { key: 'password', label: 'Password', type: 'password', placeholder: '8+ characters' },
        ].map(field => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <input type={field.type} value={(form as any)[field.key]} onChange={e => setForm(p => ({...p, [field.key]: e.target.value}))} required={field.key !== 'phone'} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder={field.placeholder} />
          </div>
        ))}
        <button type="submit" disabled={loading} className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50">
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account? <Link href="/login" className="text-orange-500 font-medium hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
