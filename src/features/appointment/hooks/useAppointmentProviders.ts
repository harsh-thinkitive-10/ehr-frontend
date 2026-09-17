import { useQuery } from '@tanstack/react-query';

import { appointmentProviderService } from '../services/appointmentProviderService';

export const appointmentProviderKeys = {
  all: ['appointment-providers'] as const,

  list: () =>
    [
      ...appointmentProviderKeys.all,
      'list',
    ] as const,
};

export function useAppointmentProviders() {
  return useQuery({
    queryKey:
      appointmentProviderKeys.list(),

    queryFn:
      appointmentProviderService.getProviders,

    staleTime: 5 * 60 * 1000,
  });
}