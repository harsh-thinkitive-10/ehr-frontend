import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';

import { getAccessToken } from './accessToken';
import { refreshSession } from './refreshSession';
import { expireSession } from './session';

/**
 * The single HTTP client of the app, and the Orval mutator every generated
 * SDK function calls. Generated URLs are relative (`/v1/...`); the base URL
 * comes only from the environment.
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
  // Arrays as repeated keys (`sort=a&sort=b`), the form Spring reads.
  paramsSerializer: { indexes: null },
});

const REFRESH_URL = '/v1/auth/refresh';

const publicAuthEndpoints = new Set([
  '/v1/auth/login',
  '/v1/auth/forgot-password',
  '/v1/auth/reset-password',
  REFRESH_URL,
]);

axiosInstance.interceptors.request.use((config) => {
  if (config.url && publicAuthEndpoints.has(config.url)) {
    return config;
  }

  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url === REFRESH_URL) {
      expireSession();

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshSession();

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      expireSession();

      return Promise.reject(refreshError);
    }
  },
);

export const apiClient = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => axiosInstance({ ...config, ...options }).then(({ data }) => data);

/** Error type of every generated query/mutation. */
export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
