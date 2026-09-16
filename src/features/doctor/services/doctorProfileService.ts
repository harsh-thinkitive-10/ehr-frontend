import { apiClient } from '../../../services/api/apiClient';

import type {
  DoctorProfile,
  DoctorProfileResponse,
} from '../types/doctorProfile';

import type { DoctorProfileFormData } from '../schemas/doctorProfile.schema';

export const doctorProfileService = {
  async getProfile(): Promise<DoctorProfile> {
    const response =
      await apiClient.get<DoctorProfileResponse>(
        '/v1/doctor/profile',
      );

    return response.data.data;
  },

  async updateProfile(
    data: DoctorProfileFormData,
  ): Promise<void> {
    await apiClient.patch(
      '/v1/doctor/profile',
      data,
    );
  },
};