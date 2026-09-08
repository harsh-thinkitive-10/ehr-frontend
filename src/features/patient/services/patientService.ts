import { apiClient } from '../../../services/api/apiClient';

import type { Patient } from '../types/patient.types';
import type { PatientDashboard } from '../types/dashboard.types';

export interface UpdatePatientProfileRequest {
  fullName: string;
  age: number;
  gender: string;
  phoneNumber: string;
  email: string;
}

export const patientService = {
  async getMyProfile(): Promise<Patient> {
    const response = await apiClient.get<Patient>(
      '/v1/patient/me',
    );

    return response.data;
  },

  async getDashboard(): Promise<PatientDashboard> {
    const response =
      await apiClient.get<PatientDashboard>(
        '/v1/patient/dashboard',
      );

    return response.data;
  },

  async updateMyProfile(
    data: UpdatePatientProfileRequest,
  ): Promise<Patient> {
    const response = await apiClient.patch<Patient>(
      '/v1/patient/me',
      data,
    );

    return response.data;
  },
};