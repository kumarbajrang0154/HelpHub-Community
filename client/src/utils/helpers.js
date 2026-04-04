/**
 * Utility helper functions
 */

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isTokenValid = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const setToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const removeToken = () => {
  localStorage.removeItem('authToken');
};

export default {
  formatDate,
  validateEmail,
  isTokenValid,
  getToken,
  setToken,
  removeToken,
};
