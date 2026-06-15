import api from './api';

export const authService = {
  register: (phone: string, password: string, nickname?: string) =>
    api.post('/auth/register', { phone, password, nickname }),
  login: (phone: string, password: string) =>
    api.post('/auth/login', { phone, password }),
  loginByCode: (phone: string) =>
    api.post('/auth/login/code', { phone }),
  adminLogin: (username: string, password: string) =>
    api.post('/auth/admin/login', { username, password }),
};