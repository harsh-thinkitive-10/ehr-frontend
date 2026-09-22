import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { appointmentService } from '../services/appointmentService';
import { appointmentKeys } from './appointmentKeys';

export function usePatientAppointments(page: number, size: number) {
  return useQuery({
    queryKey: appointmentKeys.patient(page, size),
    queryFn: () => appointmentService.getPatientAppointments(page, size),
    placeholderData: keepPreviousData,
  });
}