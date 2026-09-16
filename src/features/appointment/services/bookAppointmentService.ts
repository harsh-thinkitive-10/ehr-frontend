import { apiClient } from '../../../services/api/apiClient';

import type {
  BookAppointmentRequest,
} from '../types/bookAppointment';

export const bookAppointmentService = {
  async bookAppointment(
    data: BookAppointmentRequest,
  ) {
    const response =
      await apiClient.post(
        '/v1/appointment',
        data,
      );

    return response.data;
  },
};