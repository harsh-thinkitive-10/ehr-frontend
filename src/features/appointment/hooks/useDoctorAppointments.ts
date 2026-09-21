import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { appointmentKeys } from '../constant/queryKeys';
import { appointmentService, type DoctorAppointmentListParams } from '../services/appointmentService';

export function useDoctorAppointments(params: DoctorAppointmentListParams) {
  return useQuery({
    queryKey: appointmentKeys.doctor(params.page, params.size),
    queryFn: () => appointmentService.getDoctorAppointments(params),
    placeholderData: keepPreviousData,
  });
}