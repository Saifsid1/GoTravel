'use client';
import { useMutation } from '@tanstack/react-query';
import { leadsApi } from '@/lib/api';
import toast from 'react-hot-toast';

export function useLeadCapture() {
  return useMutation({
    mutationFn: (data: any) => leadsApi.create(data).then(r => r.data),
    onSuccess: () => {
      toast.success("Thanks! We'll be in touch soon.");
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });
}
