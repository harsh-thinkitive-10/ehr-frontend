import { apiClient } from '../../../services/api/apiClient';

import type { AppointmentPatient } from '../types/appointmentPatient';

interface AppointmentPatientPage {
  content: AppointmentPatient[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface AppointmentPatientResponse {
  code: string;
  data: AppointmentPatientPage;
  message: string;
}

export const appointmentPatientService = {
  async getPatients(): Promise<AppointmentPatient[]> {
    const response = await apiClient.get<AppointmentPatientResponse>(
      '/v1/patient/patients',
      { params: { page: 0, size: 100 } },
    );

    return response.data.data.content;
  },
};