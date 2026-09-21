import { useQuery } from '@tanstack/react-query';
import { locationService } from '../../location/services/locationService';

export const appointmentLocationKeys = {
  all: ['appointment-locations'] as const,
  list: () => [...appointmentLocationKeys.all, 'list'] as const,
};

export function useAppointmentLocations() {
  return useQuery({
    queryKey: appointmentLocationKeys.list(),
    queryFn: async () => {
      const response = await locationService.getLocations({ page: 0, size: 100 });
      return response.data.content;
    },
    staleTime: 5 * 60 * 1000,
  });
}