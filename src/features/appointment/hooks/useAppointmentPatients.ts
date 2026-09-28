import { useGetAllPatients } from '../../../sdk/generated/patient/patient';

import type { AppointmentPatient } from '../types/appointmentPatient';

export function useAppointmentPatients() {
  return useGetAllPatients(undefined, {
    query: {
      select: (response) =>
        (response.data as unknown as { content: AppointmentPatient[] }).content,
      staleTime: 5 * 60 * 1000,
    },
  });
}
