'use client';
import { Bell, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  title: string;
}

export default function AdminHeader({ title }: Props) {
  const { user } = useAuth();
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-gray-700">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-orange-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">{user?.name || 'Admin'}</span>
        </div>
      </div>
    </header>
  );
}
