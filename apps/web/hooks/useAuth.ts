'use client';
import { useSession, signOut } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();
  const user = session?.user as any;

  return {
    user,
    token: user?.accessToken,
    role: user?.role,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    isAdmin: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    logout: () => signOut({ callbackUrl: '/' }),
  };
}
