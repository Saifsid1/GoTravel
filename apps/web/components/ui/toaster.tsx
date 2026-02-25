'use client';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { Toast, ToastClose, ToastDescription, ToastTitle } from './toast';

export function Toaster() {
  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </ToastPrimitive.Provider>
  );
}
