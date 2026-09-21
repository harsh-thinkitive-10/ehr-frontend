import { apiClient } from '../../../services/api/apiClient';

import type { DoctorListResponse, RegisterDoctorRequest, RegisterDoctorResponse, UpdateDoctorRequest, UpdateDoctorResponse } from '../types/doctor';

export interface DoctorListParams {
  page: number;
  size: number;
  sort?: string;
  search?: string;
  specialization?: string;
}

export const doctorService = {
  async getDoctors(params: DoctorListParams): Promise<DoctorListResponse> {
    const response = await apiClient.get<DoctorListResponse>('/v1/doctor', { params });
    return response.data;
  },

  async registerDoctor(data: RegisterDoctorRequest): Promise<RegisterDoctorResponse> {
    const response = await apiClient.post<RegisterDoctorResponse>('/v1/doctor/register', data);
    return response.data;
  },

  async updateDoctor(uuid: string, data: UpdateDoctorRequest): Promise<UpdateDoctorResponse> {
    const response = await apiClient.put<UpdateDoctorResponse>(`/v1/doctor/${uuid}`, data);
    return response.data;
  },
  async deleteDoctor(uuid: string): Promise<void> {
    await apiClient.delete(`/v1/doctor/${uuid}`);
  },
};