import { apiClient } from '../../../services/api/apiClient';

import type {
  AdminDashboard,
} from '../types/adminDashboard';

interface ApiResponse<T> {
  code: string;
  data: T;
  message: string;
}

export const adminDashboardService = {
  async getDashboard(): Promise<AdminDashboard> {
    const response =
      await apiClient.get<
        ApiResponse<AdminDashboard>
      >('/v1/admin/dashboard');

    return response.data.data;
  },
};