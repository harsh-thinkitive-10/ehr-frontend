import { apiClient } from '../../../services/api/apiClient';

import type {
  AppointmentPatient,
} from '../types/appointmentPatient';

interface AppointmentPatientResponse {
  code: string;
  data: AppointmentPatient[];
  message: string;
}

export const appointmentPatientService = {
  async getPatients(): Promise<
    AppointmentPatientResponse
  > {
    const response =
      await apiClient.get<AppointmentPatientResponse>(
        '/v1/patient/patients',
      );

    return response.data;
  },
};