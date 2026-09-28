import { keepPreviousData } from '@tanstack/react-query';

import { useGetAllAppointments } from '../../../sdk/generated/appointment/appointment';

import type { AdminAppointmentPage } from '../types/adminAppointment';

export interface AppointmentListParams {
  page: number;
  size: number;
}

export function useAdminAppointments(params: AppointmentListParams) {
  return useGetAllAppointments(
    { page: params.page, size: params.size },
    {
      query: {
        select: (response) => response.data as unknown as AdminAppointmentPage,
        placeholderData: keepPreviousData,
      },
    },
  );
}
