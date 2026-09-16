import { useQuery } from '@tanstack/react-query';

import {
  appointmentPatientService,
} from '../services/appointmentPatientService';

export const appointmentPatientKeys = {
  all: ['appointment-patients'] as const,

  list: () => [
    ...appointmentPatientKeys.all,
    'list',
  ] as const,
};

export function useAppointmentPatients() {
  return useQuery({
    queryKey:
      appointmentPatientKeys.list(),

    queryFn:
      appointmentPatientService.getPatients,

    staleTime: 5 * 60 * 1000,
  });
}