import api from './api';

export const merchantService = {
  getDashboard: () => api.get('/merchant/dashboard'),
  getOrders: (status?: string, page?: number) => api.get('/merchant/orders', { params: { status, page } }),
  getOrderDetail: (id: number) => api.get(`/merchant/orders/${id}`),
  confirmOrder: (id: number) => api.post(`/merchant/orders/${id}/confirm`),
  rejectOrder: (id: number, reason: string) => api.post(`/merchant/orders/${id}/reject`, { reason }),
  completeOrder: (id: number) => api.post(`/merchant/orders/${id}/complete`),
  getShopInfo: () => api.get('/merchant/shop'),
  updateShop: (data: any) => api.put('/merchant/shop', data),
  applyQualification: (data: any) => api.post('/merchant/qualification', data),
  getFinance: () => api.get('/merchant/finance'),
  applyWithdraw: (data: any) => api.post('/merchant/withdraw', data),
  getReviews: (page?: number) => api.get('/merchant/reviews', { params: { page } }),
  replyReview: (id: number, content: string) => api.post(`/merchant/reviews/${id}/reply`, { content }),
};