import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api',
  withCredentials: true, // Optional: if you’re using cookies for auth
});



export default api;
