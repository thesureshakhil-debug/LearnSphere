import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const loginUser = (credentials: { email: string; password: string }) =>
  api.post('/auth/login', credentials);

export const registerUser = (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => api.post('/auth/register', userData);

// Dashboard API
export const getDashboardStats = () => api.get('/dashboard/stats');

// Courses API
export const getCourses = () => api.get('/courses');
export const getCourseById = (id: string) => api.get(`/courses/${id}`);
export const enrollInCourse = (courseId: string) => api.post(`/courses/${courseId}/enroll`);