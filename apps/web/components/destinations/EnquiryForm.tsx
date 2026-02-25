'use client';
import { useState } from 'react';
import { useLeadCapture } from '@/hooks/useLeadCapture';
import { MessageSquare } from 'lucide-react';

interface Props {
  destinationId?: string;
  destinationName?: string;
}

export default function EnquiryForm({ destinationId, destinationName }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', travelDate: '' });
  const { mutate, isPending, isSuccess } = useLeadCapture();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ userName: form.name, userEmail: form.email, userPhone: form.phone, message: form.message, destinationId, sourcePage: `/destinations/${destinationName?.toLowerCase()}` });
  };

  if (isSuccess) return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
      <div className="text-4xl mb-2">🎉</div>
      <h3 className="font-bold text-green-800">Enquiry Sent!</h3>
      <p className="text-green-600 text-sm mt-1">Our travel expert will contact you within 24 hours.</p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-orange-500" />
        <h3 className="font-bold text-gray-900">Send Enquiry</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Your Name *" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
        <input type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
        <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
        <input type="date" placeholder="Travel Date" value={form.travelDate} onChange={e => setForm(p => ({...p, travelDate: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
        <textarea placeholder="Message (optional)" value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" />
        <button type="submit" disabled={isPending} className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50">
          {isPending ? 'Sending...' : 'Send Enquiry'}
        </button>
      </form>
    </div>
  );
}
