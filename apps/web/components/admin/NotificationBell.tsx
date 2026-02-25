'use client';
import { useState, useEffect } from 'react';
import { Bell, X, CheckCheck } from 'lucide-react';
import { notificationsApi } from '@/lib/api';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    notificationsApi.getAll({ limit: 10 }).then(r => setNotifications(r.data?.data || [])).catch(() => {});
  }, []);

  const unread = notifications.filter(n => !n.isRead).length;

  const markRead = async (id: string) => {
    await notificationsApi.markAsRead(id).catch(() => {});
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2 text-gray-500 hover:text-gray-700">
        <Bell className="h-5 w-5" />
        {unread > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{unread}</span>}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="font-semibold text-sm">Notifications</h3>
            <button onClick={() => setOpen(false)}><X className="h-4 w-4 text-gray-400" /></button>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-6">No notifications</p>
            ) : notifications.map(n => (
              <div key={n.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 ${!n.isRead ? 'bg-orange-50' : ''}`}>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{n.title}</p>
                    <p className="text-xs text-gray-500">{n.message}</p>
                  </div>
                  {!n.isRead && (
                    <button onClick={() => markRead(n.id)} className="text-orange-500 hover:text-orange-600 flex-shrink-0">
                      <CheckCheck className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
