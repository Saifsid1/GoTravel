'use client';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { API_URL } from '@/lib/constants';

export function useSocket(onNotification?: (data: any) => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(API_URL, { transports: ['websocket'], autoConnect: true });
    socketRef.current.on('notification', (data: any) => {
      onNotification?.(data);
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return socketRef.current;
}
