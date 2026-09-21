import { apiClient } from '../../../services/api/apiClient';

import type {
  Patient,
} from '../types/patient.types';

import type {
  PatientDashboard,
} from '../types/dashboard.types';

import type { UpdatePatientRequest, UpdatePatientResponse } from '../types/patient';

import type {
  PatientListParams,
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
    params: PatientListParams = {},
  ): Promise<PatientListResponse> {
    const response =
      await apiClient.get<PatientListResponse>(
        '/v1/patient/patients',
        {
          params: {
            page:
              params.page ?? 0,

            size:
              params.size ?? 10,

            ...(params.search?.trim()
              ? {
                search:
                  params.search.trim(),
              }
              : {}),

            ...(params.gender
              ? {
                gender:
                  params.gender,
              }
              : {}),

            ...(params.age !== undefined
              ? {
                age:
                  params.age,
              }
              : {}),

            ...(params.sort
              ? {
                sort:
                  params.sort,
              }
              : {}),
          },
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

  async updatePatient(uuid: string, data: UpdatePatientRequest): Promise<UpdatePatientResponse> {
    const response = await apiClient.put<UpdatePatientResponse>(`/v1/patient/${uuid}`, data);
    return response.data;
  },
  async deletePatient(uuid: string): Promise<void> {
    await apiClient.delete(`/v1/patient/${uuid}`);
  },
};