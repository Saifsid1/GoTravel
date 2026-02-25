'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Globe, LayoutDashboard, BookOpen, User, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login');
  }, [status, router]);

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full" /></div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-orange-500" />
          <span className="font-bold text-orange-500">GoTravel</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-orange-500 flex items-center gap-1"><LayoutDashboard className="h-4 w-4" /> Dashboard</Link>
          <Link href="/dashboard/bookings" className="text-sm text-gray-600 hover:text-orange-500 flex items-center gap-1"><BookOpen className="h-4 w-4" /> Bookings</Link>
          <Link href="/dashboard/profile" className="text-sm text-gray-600 hover:text-orange-500 flex items-center gap-1"><User className="h-4 w-4" /> Profile</Link>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"><LogOut className="h-4 w-4" /> Logout</button>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
