import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export default function WhatsAppButton() {
  const waNumber = WHATSAPP_NUMBER.replace('+', '');
  const message = encodeURIComponent("Hi GoTravel! I'm interested in planning a trip.");
  return (
    <a
      href={`https://wa.me/${waNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-sm font-medium hidden sm:block">WhatsApp</span>
    </a>
  );
}
