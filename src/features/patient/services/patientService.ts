import { apiClient } from '../../../services/api/apiClient';

import type { Patient } from '../types/patient.types';

export const patientService = {
  async getMyProfile(): Promise<Patient> {
    const response = await apiClient.get<Patient>(
      '/v1/patient/me',
    );

    return response.data;
  },
};