import { apiClient } from '../../../services/api/apiClient';

import type {
  AppointmentProvider,
} from '../types/appointmentProvider';

export const appointmentProviderService = {
  async getProviders(): Promise<
    AppointmentProvider[]
  > {
    const response =
      await apiClient.get<
        AppointmentProvider[]
      >('/v1/doctor');

    return response.data;
  },
};