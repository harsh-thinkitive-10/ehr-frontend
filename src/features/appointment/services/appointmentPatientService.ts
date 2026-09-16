import { apiClient } from '../../../services/api/apiClient';

import type {
  AppointmentPatient,
} from '../types/appointmentPatient';

export const appointmentPatientService = {
  async getPatients(): Promise<
    AppointmentPatient[]
  > {
    const response =
      await apiClient.get<
        AppointmentPatient[]
      >('/v1/patient/patients');

    return response.data;
  },
};