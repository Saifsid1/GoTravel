'use client';
import { useState, useEffect, useCallback } from 'react';
import { X, Tag } from 'lucide-react';
import { useLeadCapture } from '@/hooks/useLeadCapture';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [shown, setShown] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { mutate: submitLead, isPending } = useLeadCapture();

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !shown) {
      setIsVisible(true);
      setShown(true);
    }
  }, [shown]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dismissed = sessionStorage.getItem('exitPopupDismissed');
    if (dismissed) return;
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [handleMouseLeave]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('exitPopupDismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead({ userName: name, userEmail: email, sourcePage: 'exit_intent', message: 'Exit intent popup - ₹2000 offer' }, {
      onSuccess: () => handleClose(),
    });
  };

  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white text-center relative">
          <button onClick={handleClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20">
            <X className="h-5 w-5" />
          </button>
          <Tag className="h-10 w-10 mx-auto mb-2" />
          <h2 className="text-2xl font-bold">Wait! Don't Leave Yet</h2>
          <p className="mt-1 text-orange-100">Get ₹2,000 off your first trip</p>
        </div>
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-4 text-center">Enter your details to claim your exclusive discount coupon</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              {isPending ? 'Claiming...' : 'Claim ₹2,000 Discount'}
            </button>
          </form>
          <button onClick={handleClose} className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600">No thanks, I'll pay full price</button>
        </div>
      </div>
    </div>
  );
}
