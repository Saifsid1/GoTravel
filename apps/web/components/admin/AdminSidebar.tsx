'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, MapPin, Package, BookOpen, FileText, CreditCard, BarChart3, Bell, Globe, Store } from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/leads', label: 'Leads', icon: FileText },
  { href: '/admin/bookings', label: 'Bookings', icon: BookOpen },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/destinations', label: 'Destinations', icon: MapPin },
  { href: '/admin/vendors', label: 'Vendors', icon: Store },
  { href: '/admin/payments', label: 'Payments', icon: CreditCard },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-800">
        <Globe className="h-6 w-6 text-orange-500" />
        <span className="font-bold text-orange-500">GoTravel Admin</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(link => {
          const Icon = link.icon;
          const active = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" /> {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-gray-800">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
          <Globe className="h-4 w-4" /> View Site
        </Link>
      </div>
    </aside>
  );
}
