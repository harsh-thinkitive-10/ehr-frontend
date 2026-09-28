import { useMutation } from '@tanstack/react-query';

import { updateLocation } from '../../../sdk/generated/location/location';
import type { LocationDTO } from '../../../sdk/generated/common/types';

import type { UpdateLocationRequest } from '../types/location';

interface UpdateLocationVariables {
  uuid: string;
  data: UpdateLocationRequest;
}

export function useUpdateLocation() {
  return useMutation({
    // The API accepts `taxEntity: null`, which the spec cannot express.
    mutationFn: ({ uuid, data }: UpdateLocationVariables) =>
      updateLocation(uuid, data as LocationDTO),
  });
}
