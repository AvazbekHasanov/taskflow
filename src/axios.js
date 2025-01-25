// axiosGlobal.js

import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://prime-core.uz/api',
    // baseURL: 'https://helped-lucky-prawn.ngrok-free.app/api',
  timeout: 10000,
  headers:{
    'Content-Type': 'application/json'
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJ1c2VybmFtZSI6ImZhemxpZGRpbiIsImVtYWlsIjoiZmF6bGlkZGluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJGYXpsaWRkaW4iLCJsYXN0X25hbWUiOiJHYWRveWV2IiwiaWF0IjoxNzMxNzE1ODk3LCJleHAiOjE3MzE5NzUwOTd9.t9w1CZdLu9xzlzs3a6bgn2uUs775qgBdeNb7jG64B78'
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Global Axios object with methods for GET, POST, PUT, DELETE
const $axios = {
  get: async (url, params = {}) => {
    try {
      const response = await axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      console.error('GET request error:', error);
      throw error;
    }
  },

  post: async (url, data = {}) => {
    try {
      const response = await axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  },

  put: async (url, data = {}) => {
    try {
      const response = await axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      console.error('PUT request error:', error);
      throw error;
    }
  },

  delete: async (url, params = {}) => {
    try {
      const response = await axiosInstance.delete(url, { params });
      return response.data;
    } catch (error) {
      console.error('DELETE request error:', error);
      throw error;
    }
  }
};

export default $axios;
