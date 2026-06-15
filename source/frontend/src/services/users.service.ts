import api from './api';

export const usersService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  getOrders: (status?: string, page?: number) => api.get('/users/orders', { params: { status, page } }),
  getOrderDetail: (id: number) => api.get(`/users/orders/${id}`),
  getFavorites: (page?: number) => api.get('/users/favorites', { params: { page } }),
  toggleFavorite: (carId: number) => api.put(`/users/favorites/${carId}`),
  getCoupons: () => api.get('/users/coupons'),
};