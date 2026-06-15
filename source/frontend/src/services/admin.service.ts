import api from './api';

export const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (page?: number, keyword?: string) => api.get('/admin/users', { params: { page, keyword } }),
  toggleUser: (id: number) => api.post(`/admin/users/${id}/toggle`),
  getMerchants: (page?: number, authStatus?: number) => api.get('/admin/merchants', { params: { page, authStatus } }),
  auditMerchant: (id: number, action: string, reason?: string) =>
    api.post(`/admin/merchants/${id}/audit`, { action, reason }),
  toggleMerchant: (id: number) => api.post(`/admin/merchants/${id}/toggle`),
  setCommission: (id: number, rate: number) => api.put(`/admin/merchants/${id}/commission`, { rate }),
  getCars: (page?: number, status?: number) => api.get('/admin/cars', { params: { page, status } }),
  auditCar: (id: number, action: string) => api.post(`/admin/cars/${id}/audit`, { action }),
  getOrders: (page?: number, status?: string, keyword?: string) =>
    api.get('/admin/orders', { params: { page, status, keyword } }),
  getFinance: () => api.get('/admin/finance'),
  auditWithdrawal: (id: number, action: string, remark?: string) =>
    api.post(`/admin/withdrawals/${id}/audit`, { action, remark }),
  getBanners: () => api.get('/admin/banners'),
  createBanner: (data: any) => api.post('/admin/banners', data),
  updateBanner: (id: number, data: any) => api.put(`/admin/banners/${id}`, data),
  deleteBanner: (id: number) => api.delete(`/admin/banners/${id}`),
  getAdmins: () => api.get('/admin/admins'),
  createAdmin: (data: any) => api.post('/admin/admins', data),
  getCoupons: () => api.get('/admin/coupons'),
  createCoupon: (data: any) => api.post('/admin/coupons', data),
  updateCoupon: (id: number, data: any) => api.put(`/admin/coupons/${id}`, data),
};