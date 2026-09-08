import { apiClient } from '../../../services/api/apiClient';

export interface DashboardSummary {
  totalVisits: number;
  upcomingAppointments: number;
  activeMedications: number;
  medicalRecords: number;
}

export const dashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    const response =
      await apiClient.get<DashboardSummary>(
        '/v1/dashboard/summary',
      );

    return response.data;
  },
};