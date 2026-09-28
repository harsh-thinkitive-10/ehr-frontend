import { useGetAllDoctors } from '../../../sdk/generated/doctor/doctor';

import type { AppointmentProvider } from '../types/appointmentProvider';

export function useAppointmentProviders() {
  return useGetAllDoctors(undefined, {
    query: {
      select: (response) =>
        (response.data as unknown as { content: AppointmentProvider[] }).content,
      staleTime: 5 * 60 * 1000,
    },
  });
}
