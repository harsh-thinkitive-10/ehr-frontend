import { apiClient } from '../../../services/api/apiClient';

import type {
  AppointmentProvider,
  AppointmentProviderResponse,
} from '../types/appointmentProvider';

export const appointmentProviderService = {
  async getProviders(): Promise<AppointmentProvider[]> {
    const response =
      await apiClient.get<AppointmentProviderResponse>(
        '/v1/doctor',
      );

    return response.data.data.content;
  },
};