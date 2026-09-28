import { useMutation } from '@tanstack/react-query';

import { deleteLocation } from '../../../sdk/generated/location/location';

export function useDeleteLocation() {
  return useMutation({
    mutationFn: (uuid: string) => deleteLocation(uuid),
  });
}
