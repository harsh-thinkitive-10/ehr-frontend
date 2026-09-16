import { apiClient } from '../../../services/api/apiClient';

import type {
  PatientAppointmentPage,
} from '../types/appointment';

interface ApiResponse<T> {
  code: string;
  data: T;
  message: string;
}

export interface AppointmentListParams {
  page: number;
  size: number;
}

export const appointmentService = {
  async getPatientAppointments(
    page: number,
    size: number,
  ): Promise<ApiResponse<PatientAppointmentPage>> {
    const response =
      await apiClient.get<
        ApiResponse<PatientAppointmentPage>
      >('/v1/appointment/patient', {
        params: {
          page,
          size,
        },
      });

    return response.data;
  },
};