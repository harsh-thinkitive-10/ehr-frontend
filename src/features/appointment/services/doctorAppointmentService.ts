import { apiClient } from '../../../services/api/apiClient';

import type {
  DoctorAppointmentPage,
  DoctorAppointmentResponse,
} from '../types/doctorAppointment';

export interface DoctorAppointmentListParams {
  page: number;
  size: number;
}

export const doctorAppointmentService = {
  async getAppointments(
    params: DoctorAppointmentListParams,
  ): Promise<DoctorAppointmentPage> {
    const response =
      await apiClient.get<DoctorAppointmentResponse>(
        '/v1/appointment/doctor',
        {
          params,
        },
      );

    return response.data.data;
  },
};