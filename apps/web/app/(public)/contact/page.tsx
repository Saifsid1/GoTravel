'use client';
import { useState } from 'react';
import { useLeadCapture } from '@/hooks/useLeadCapture';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const { mutate, isPending, isSuccess } = useLeadCapture();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ userName: form.name, userEmail: form.email, userPhone: form.phone, message: form.message, sourcePage: '/contact' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-orange-100">We're here to help plan your perfect trip</p>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <p className="text-2xl mb-2">🎉</p>
                <h3 className="font-bold text-green-800">Message Sent!</h3>
                <p className="text-green-600 text-sm">We'll contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[['name', 'Full Name', 'text', 'John Doe'], ['email', 'Email Address', 'email', 'you@example.com'], ['phone', 'Phone Number', 'tel', '+91 98765 43210']].map(([k, l, t, p]) => (
                  <div key={k}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{l}</label>
                    <input type={t} placeholder={p} value={(form as any)[k]} onChange={e => setForm(pv => ({...pv, [k]: e.target.value}))} required={k !== 'phone'} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm(pv => ({...pv, message: e.target.value}))} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" placeholder="Tell us about your travel plans..." />
                </div>
                <button type="submit" disabled={isPending} className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50">
                  {isPending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              {[
                { icon: MapPin, title: 'Address', text: '123 Travel Hub, Connaught Place, New Delhi - 110001' },
                { icon: Phone, title: 'Phone', text: '+91 99999 99999' },
                { icon: Mail, title: 'Email', text: 'support@gotravel.com' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg"><Icon className="h-5 w-5 text-orange-500" /></div>
                  <div><p className="font-medium text-gray-900 text-sm">{title}</p><p className="text-gray-500 text-sm">{text}</p></div>
                </div>
              ))}
              <a href="https://wa.me/919999999999?text=Hi%20GoTravel!" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mt-6 bg-green-500 text-white px-5 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors">
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
