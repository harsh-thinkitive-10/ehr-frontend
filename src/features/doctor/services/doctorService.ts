import { apiClient } from '../../../services/api/apiClient';

import type {
  DoctorListResponse,
} from '../types/doctor';

export interface DoctorListParams {
  page: number;
  size: number;
  sort?: string;
  search?: string;
  specialization?: string;
}

export const doctorService = {
  async getDoctors(
    params: DoctorListParams,
  ): Promise<DoctorListResponse> {
    const response =
      await apiClient.get<DoctorListResponse>(
        '/v1/doctor',
        {
          params,
        },
      );

    return response.data;
  },
};