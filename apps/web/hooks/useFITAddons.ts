'use client';
import { useQuery } from '@tanstack/react-query';
import { fitApi } from '@/lib/api';

export function useFITAddons(destinationId: string, category?: string) {
  return useQuery({
    queryKey: ['fit-addons', destinationId, category],
    queryFn: () => fitApi.getAddOns(destinationId, category).then(r => r.data),
    enabled: !!destinationId,
  });
}
