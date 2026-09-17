import { apiClient } from '../../../services/api/apiClient';

import type { Patient } from '../types/patient';
import type { PatientDashboard } from '../types/dashboard.types';

import type {
  PatientListResponse,
  RegisterPatientRequest,
  RegisterPatientResponse,
} from '../types/patient';

export interface UpdatePatientProfileRequest {
  fullName: string;
  age: number;
  gender: string;
  phoneNumber: string;
  email: string;
}

export interface PatientListParams {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  gender?: string;
  age?: number;
}

export const patientService = {
  async getMyProfile(): Promise<Patient> {
    const response =
      await apiClient.get<Patient>(
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
    const response =
      await apiClient.patch<Patient>(
        '/v1/patient/me',
        data,
      );

    return response.data;
  },

  async getPatients(
    params?: PatientListParams,
  ): Promise<PatientListResponse> {
    const response =
      await apiClient.get<PatientListResponse>(
        '/v1/patient/patients',
        {
          params,
        },
      );

    return response.data;
  },

  async registerPatient(
    data: RegisterPatientRequest,
  ): Promise<RegisterPatientResponse> {
    const response =
      await apiClient.post<RegisterPatientResponse>(
        '/v1/patient/register',
        data,
      );

    return response.data;
  },
};