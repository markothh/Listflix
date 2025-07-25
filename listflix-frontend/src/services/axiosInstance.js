import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json; charset=UTF-8', 
    'Accept': 'application/json; charset=UTF-8' 
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken'); 
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
