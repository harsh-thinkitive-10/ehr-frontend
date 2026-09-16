import { apiClient } from '../../../services/api/apiClient';
import type {
  DoctorDashboard,
  DoctorDashboardResponse,
} from '../types/doctorDashboard';

export const doctorDashboardService = {
  async getDashboard(): Promise<DoctorDashboard> {
    const response =
      await apiClient.get<DoctorDashboardResponse>(
        '/v1/doctor/dashboard',
      );

    return response.data.data;
  },
};