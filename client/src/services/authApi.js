import { login as loginRequest, register as registerRequest } from './api';
import apiClient from './api';

export const login = async (email, password) => {
  const data = await loginRequest({ email, password });
  localStorage.setItem('authToken', data.token);
  localStorage.setItem('user', JSON.stringify({
    _id: data._id,
    name: data.name,
    email: data.email
  }));
  return data;
};

export const register = async (name, email, password, role = 'user') => {
  const data = await registerRequest({ name, email, password, role });
  localStorage.setItem('authToken', data.token);
  localStorage.setItem('user', JSON.stringify({
    _id: data._id,
    name: data.name,
    email: data.email
  }));
  return data;
};

export const getProfile = async () => {
  const response = await apiClient.get('/auth/profile');
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (err) {
    return null;
  }
};
