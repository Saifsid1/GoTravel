import Link from 'next/link';
import { Globe, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold text-orange-500">GoTravel</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Premium India travel experiences with AI-powered itinerary planning and fully customizable FIT packages.</p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Destinations</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Manali', 'Goa', 'Kerala', 'Rajasthan', 'Ladakh', 'Andaman'].map(d => (
                <li key={d}><Link href={`/destinations/${d.toLowerCase()}`} className="hover:text-orange-400 transition-colors">{d}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[['/', 'Home'], ['/packages', 'Packages'], ['/blog', 'Travel Blog'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={href}><Link href={href} className="hover:text-orange-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" /><span>123 Travel Hub, Connaught Place, New Delhi - 110001</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange-500" /><span>+91 99999 99999</span></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-orange-500" /><span>support@gotravel.com</span></li>
            </ul>
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Newsletter</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500" />
                <button className="px-3 py-1.5 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors">Go</button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© 2024 GoTravel. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/refund" className="hover:text-white">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
