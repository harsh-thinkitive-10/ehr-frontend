import { useQuery } from '@tanstack/react-query';
import { appointmentService } from '../services/appointmentService';

export const appointmentPatientKeys = {
  all: ['appointment-patients'] as const,
  list: () => [...appointmentPatientKeys.all, 'list'] as const,
};

export function useAppointmentPatients() {
  return useQuery({
    queryKey: appointmentPatientKeys.list(),
    queryFn: () => appointmentService.getPatients(),
    staleTime: 5 * 60 * 1000,
  });
}