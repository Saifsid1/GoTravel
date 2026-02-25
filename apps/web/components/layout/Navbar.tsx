'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, User, LogOut, ChevronDown, Globe } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const navLinks = [
    { href: '/destinations', label: 'Destinations' },
    { href: '/packages', label: 'Packages' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Globe className="h-7 w-7 text-orange-500" />
            <span className="text-xl font-bold text-orange-500">GoTravel</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-gray-700 hover:text-orange-500 text-sm font-medium transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-500"
                >
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-orange-600" />
                  </div>
                  <span>{user?.name?.split(' ')[0]}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>Dashboard</Link>
                    <Link href="/dashboard/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>My Bookings</Link>
                    <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>Profile</Link>
                    {isAdmin && <Link href="/admin" className="block px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 font-medium" onClick={() => setUserMenuOpen(false)}>Admin Panel</Link>}
                    <button onClick={() => { logout(); setUserMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">Login</Link>
                <Link href="/register" className="bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">Register</Link>
              </>
            )}
          </div>
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="block px-4 py-2 text-sm text-gray-700 hover:text-orange-500" onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 px-4 pt-3 border-t border-gray-100 mt-2">
              {isAuthenticated ? (
                <button onClick={() => { logout(); setIsOpen(false); }} className="flex items-center gap-1 text-sm text-red-600">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              ) : (
                <>
                  <Link href="/login" className="flex-1 text-center py-2 text-sm border border-gray-300 rounded-lg" onClick={() => setIsOpen(false)}>Login</Link>
                  <Link href="/register" className="flex-1 text-center py-2 text-sm bg-orange-500 text-white rounded-lg" onClick={() => setIsOpen(false)}>Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
