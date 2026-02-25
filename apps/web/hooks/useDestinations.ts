'use client';
import { useQuery } from '@tanstack/react-query';
import { destinationsApi } from '@/lib/api';

export function useDestinations(params?: any) {
  return useQuery({
    queryKey: ['destinations', params],
    queryFn: () => destinationsApi.getAll(params).then(r => r.data),
  });
}

export function useFeaturedDestinations() {
  return useQuery({
    queryKey: ['destinations', 'featured'],
    queryFn: () => destinationsApi.getFeatured().then(r => r.data),
  });
}

export function useDestination(slug: string) {
  return useQuery({
    queryKey: ['destinations', slug],
    queryFn: () => destinationsApi.getBySlug(slug).then(r => r.data),
    enabled: !!slug,
  });
}
