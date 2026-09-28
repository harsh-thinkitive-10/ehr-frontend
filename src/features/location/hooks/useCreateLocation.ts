import { useMutation } from '@tanstack/react-query';

import { createLocation } from '../../../sdk/generated/location/location';
import type { LocationDTO } from '../../../sdk/generated/common/types';

import type { CreateLocationRequest } from '../types/location';

export function useCreateLocation() {
  return useMutation({
    // The API accepts `taxEntity: null`, which the spec cannot express.
    mutationFn: (data: CreateLocationRequest) => createLocation(data as LocationDTO),
  });
}
