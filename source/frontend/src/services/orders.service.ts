import api from './api';

export const ordersService = {
  create: (data: any) => api.post('/orders', data),
  cancel: (id: number, reason?: string) => api.post(`/orders/${id}/cancel`, { reason }),
  pay: (orderNo: string, method?: string) => api.post(`/orders/${orderNo}/pay`, { method: method || 'alipay' }),
};