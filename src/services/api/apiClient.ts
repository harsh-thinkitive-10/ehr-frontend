import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';

import { authService } from '../../features/auth/services/authService';
import { tokenService } from '../../features/auth/services/tokenService';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: false,
});

const publicAuthEndpoints = new Set([
  '/v1/auth/login',
  '/v1/auth/forgot-password',
  '/v1/auth/reset-password',
  '/v1/auth/refresh',
]);

apiClient.interceptors.request.use((config) => {
  if (
    config.url &&
    publicAuthEndpoints.has(config.url)
  ) {
    return config;
  }

  const accessToken = tokenService.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let refreshPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as
        | (InternalAxiosRequestConfig & {
            _retry?: boolean;
          })
        | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    if (
      originalRequest.url ===
      '/v1/auth/refresh'
    ) {
      tokenService.clearTokens();

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const currentRefreshToken =
      tokenService.getRefreshToken();

    if (!currentRefreshToken) {
      tokenService.clearTokens();

      return Promise.reject(error);
    }

    try {
      if (!refreshPromise) {
        refreshPromise = authService
          .refresh(currentRefreshToken)
          .then((response) => {
            tokenService.setTokens(
              response.access_token,
              response.refresh_token,
            );

            return response.access_token;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken =
        await refreshPromise;

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      tokenService.clearTokens();

      return Promise.reject(refreshError);
    }
  },
);