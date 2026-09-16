import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { appointmentKeys } from '../constant/queryKeys';

import {
  doctorAppointmentService,
  type DoctorAppointmentListParams,
} from '../services/doctorAppointmentService';

export function useDoctorAppointments(
  params: DoctorAppointmentListParams,
) {
  return useQuery({
    queryKey: appointmentKeys.doctor(
      params.page,
      params.size,
    ),

    queryFn: () =>
      doctorAppointmentService.getAppointments(
        params,
      ),

    placeholderData: keepPreviousData,
  });
}