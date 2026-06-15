import api from './api';

export const carsService = {
  getList: (params?: any) => api.get('/cars', { params }),
  getHot: () => api.get('/cars/hot'),
  getBanners: () => api.get('/banners'),
  getDetail: (id: number) => api.get(`/car/${id}`),
  getSchedule: (id: number, year: number, month: number) =>
    api.get(`/car/${id}/schedule`, { params: { year, month } }),

  // Merchant
  getMerchantCars: (page?: number) => api.get('/merchant/cars', { params: { page } }),
  create: (data: any) => api.post('/merchant/cars', data),
  update: (id: number, data: any) => api.put(`/merchant/cars/${id}`, data),
  toggleStatus: (id: number) => api.post(`/merchant/cars/${id}/toggle`),
  delete: (id: number) => api.delete(`/merchant/cars/${id}`),
  updateSchedule: (id: number, date: string, status: number) =>
    api.put(`/merchant/cars/${id}/schedule`, { date, status }),

  // Fleet packages
  getFleetPackages: () => api.get('/merchant/fleet-packages'),
  createFleetPackage: (data: any) => api.post('/merchant/fleet-packages', data),
  updateFleetPackage: (id: number, data: any) => api.put(`/merchant/fleet-packages/${id}`, data),
  deleteFleetPackage: (id: number) => api.delete(`/merchant/fleet-packages/${id}`),
};