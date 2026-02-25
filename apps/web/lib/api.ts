import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('gotravel_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('gotravel_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

// API functions
export const destinationsApi = {
  getAll: (params?: any) => api.get('/destinations', { params }),
  getFeatured: () => api.get('/destinations/featured'),
  getBySlug: (slug: string) => api.get(`/destinations/${slug}`),
  search: (q: string) => api.get('/destinations/search', { params: { q } }),
};

export const packagesApi = {
  getAll: (params?: any) => api.get('/packages', { params }),
  getBySlug: (slug: string) => api.get(`/packages/${slug}`),
};

export const fitApi = {
  getAddOns: (destinationId: string, category?: string) =>
    api.get(`/fit/${destinationId}/addons`, { params: { category } }),
  calculatePrice: (data: any) => api.post('/fit/calculate', data),
  getRecommendations: (destinationId: string, selectedAddonIds: string[]) =>
    api.post(`/fit/${destinationId}/recommendations`, { selectedAddonIds }),
};

export const leadsApi = {
  create: (data: any) => api.post('/leads', data),
};

export const bookingsApi = {
  create: (data: any) => api.post('/bookings', data),
  getMyBookings: () => api.get('/bookings/my'),
  getById: (id: string) => api.get(`/bookings/${id}`),
  getByRef: (ref: string) => api.get(`/bookings/ref/${ref}`),
};

export const paymentsApi = {
  createOrder: (bookingId: string, amount: number) =>
    api.post('/payments/create-order', { bookingId, amount }),
  verifyPayment: (data: any) => api.post('/payments/verify', data),
};

export const blogApi = {
  getAll: (params?: any) => api.get('/blog', { params }),
  getBySlug: (slug: string) => api.get(`/blog/${slug}`),
};

export const aiApi = {
  generateItinerary: (data: any) => api.post('/ai/itinerary', data),
  chat: (message: string, context?: string) => api.post('/ai/chat', { message, context }),
};

export const analyticsApi = {
  getDashboard: () => api.get('/analytics/dashboard'),
  track: (data: any) => api.post('/analytics/track', data),
};

export const adminLeadsApi = {
  getAll: (params?: any) => api.get('/leads', { params }),
  getKanban: () => api.get('/leads/kanban'),
  getStats: () => api.get('/leads/stats'),
  getById: (id: string) => api.get(`/leads/${id}`),
  updateStatus: (id: string, status: string, assignedTo?: string) =>
    api.put(`/leads/${id}/status`, { status, assignedTo }),
};

export const adminBookingsApi = {
  getAll: (params?: any) => api.get('/bookings', { params }),
  updateStatus: (id: string, status: string) =>
    api.put(`/bookings/${id}/status`, { status }),
};

export const adminUsersApi = {
  getAll: (params?: any) => api.get('/users', { params }),
  getById: (id: string) => api.get(`/users/${id}`),
};

export const adminDestinationsApi = {
  create: (data: any) => api.post('/destinations', data),
  update: (id: string, data: any) => api.put(`/destinations/${id}`, data),
  remove: (id: string) => api.delete(`/destinations/${id}`),
};

export const adminVendorsApi = {
  getAll: (params?: any) => api.get('/vendors', { params }),
  getById: (id: string) => api.get(`/vendors/${id}`),
  create: (data: any) => api.post('/vendors', data),
  update: (id: string, data: any) => api.put(`/vendors/${id}`, data),
  remove: (id: string) => api.delete(`/vendors/${id}`),
};

export const notificationsApi = {
  getAll: (params?: any) => api.get('/notifications', { params }),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/mark-all-read'),
};
