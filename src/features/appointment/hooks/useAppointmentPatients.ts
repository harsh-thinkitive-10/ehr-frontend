import { useQuery } from '@tanstack/react-query';

import {
  appointmentPatientService,
} from '../services/appointmentPatientService';

import type {
  AppointmentPatient,
} from '../types/appointmentPatient';

export const appointmentPatientKeys = {
  all: ['appointment-patients'] as const,

  list: () =>
    [
      ...appointmentPatientKeys.all,
      'list',
    ] as const,
};

function normalizePatients(
  response: unknown,
): AppointmentPatient[] {
  if (Array.isArray(response)) {
    return response as AppointmentPatient[];
  }

  if (
    response !== null &&
    typeof response === 'object' &&
    'data' in response &&
    Array.isArray(response.data)
  ) {
    return response.data as AppointmentPatient[];
  }

  throw new Error(
    'Invalid appointment patient list response.',
  );
}

export function useAppointmentPatients() {
  return useQuery({
    queryKey:
      appointmentPatientKeys.list(),

    queryFn: async () => {
      const response =
        await appointmentPatientService.getPatients();

      return normalizePatients(response);
    },

    staleTime: 5 * 60 * 1000,
  });
}