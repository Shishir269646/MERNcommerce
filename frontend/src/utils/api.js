import axios from 'axios';

const api = axios.create({
  baseURL: 'https://merncommerce-u8ss.onrender.com/api',
  withCredentials: true,
});

console.log('API Base URL:', api.defaults.baseURL);

// Automatically add token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
