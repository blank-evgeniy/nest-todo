import axios, { CreateAxiosDefaults } from 'axios';
import { getAuthToken, removeAuthToken } from './auth-token';

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const axiosClassic = axios.create(options);

const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
  const authToken = getAuthToken();

  if (config?.headers && authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      removeAuthToken();
    }
  }
);

export { axiosClassic, axiosWithAuth };
