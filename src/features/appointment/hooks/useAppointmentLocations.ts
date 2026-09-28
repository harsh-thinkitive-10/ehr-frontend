import { useGetAllLocations } from '../../../sdk/generated/location/location';

import type { LocationListResponse } from '../../location/types/location';

export function useAppointmentLocations() {
  return useGetAllLocations(
    { page: 0, size: 100 },
    {
      query: {
        select: (response) =>
          (response as unknown as LocationListResponse).data.content,
        staleTime: 5 * 60 * 1000,
      },
    },
  );
}
