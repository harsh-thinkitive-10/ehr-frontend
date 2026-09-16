import { apiClient } from '../../../services/api/apiClient';

import type {
  AdminAppointmentPage,
} from '../types/adminAppointment';

export interface AdminAppointmentListParams {
  page: number;
  size: number;
}

interface ApiResponse<T> {
  code: string;
  data: T;
  message: string;
}

export const adminAppointmentService = {
  async getAppointments(
    params: AdminAppointmentListParams,
  ): Promise<AdminAppointmentPage> {
    const response =
      await apiClient.get<
        ApiResponse<AdminAppointmentPage>
      >('/v1/appointment/admin', {
        params: {
          page: params.page,
          size: params.size,
        },
      });

    return response.data.data;
  },
};