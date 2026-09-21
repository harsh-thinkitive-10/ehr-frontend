import { apiClient } from '../../../services/api/apiClient';

import type {
  CreateLocationRequest,
  LocationListResponse,
  UpdateLocationRequest,
} from '../types/location';

interface ApiResponse<T> {
  code: string;
  data: T;
  message: string;
}

export interface LocationListParams {
  page: number;
  size: number;
}

export const locationService = {
  async getLocations(params: LocationListParams): Promise<LocationListResponse> {
    const response = await apiClient.get<LocationListResponse>('/v1/location', { params });
    return response.data;
  },

  async getLocation(uuid: string) {
    const response = await apiClient.get<ApiResponse<unknown>>(`/v1/location/${uuid}`);
    return response.data;
  },

  async createLocation(data: CreateLocationRequest) {
    const response = await apiClient.post<ApiResponse<unknown>>('/v1/location', data);
    return response.data;
  },

  async updateLocation(uuid: string, data: UpdateLocationRequest) {
    const response = await apiClient.put<ApiResponse<unknown>>(`/v1/location/${uuid}`, data);
    return response.data;
  },

  async deleteLocation(uuid: string) {
    const response = await apiClient.delete<ApiResponse<unknown>>(`/v1/location/${uuid}`);
    return response.data;
  },
};