import { api } from '@/lib/api';

export function trackPageView(path: string) {
  if (typeof window === 'undefined') return;
  try {
    api.post('/analytics/track', { event: 'page_view', path }).catch(() => {});
  } catch {}
}

export function trackEvent(event: string, category: string, action: string, label?: string, value?: number) {
  if (typeof window === 'undefined') return;
  try {
    api.post('/analytics/track', { event, category, action, label, value }).catch(() => {});
  } catch {}
}
