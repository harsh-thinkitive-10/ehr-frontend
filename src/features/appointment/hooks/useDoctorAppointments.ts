import { keepPreviousData } from '@tanstack/react-query';

import { useGetDoctorAppointments } from '../../../sdk/generated/appointment/appointment';

import type { DoctorAppointmentPage } from '../types/doctorAppointment';

export interface DoctorAppointmentListParams {
  page: number;
  size: number;
}

export function useDoctorAppointments(params: DoctorAppointmentListParams) {
  return useGetDoctorAppointments(params, {
    query: {
      select: (response) => response.data as unknown as DoctorAppointmentPage,
      placeholderData: keepPreviousData,
    },
  });
}
