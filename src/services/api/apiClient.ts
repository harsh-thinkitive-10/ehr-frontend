import axios from 'axios';

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

apiClient.interceptors.request.use((config) => {
  const isAuthRequest =
    config.url?.startsWith('/v1/auth/');

  const isAuthChangePasswordRequest = config.url?.startsWith('/v1/auth/change-password');

  if (isAuthChangePasswordRequest) {
    const accessToken =
      tokenService.getAccessToken();
    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }
  }

  if (isAuthRequest) {
    return config;
  }

  const accessToken =
    tokenService.getAccessToken();

  if (accessToken) {
    config.headers.Authorization =
      `Bearer ${accessToken}`;
  }

  return config;
});