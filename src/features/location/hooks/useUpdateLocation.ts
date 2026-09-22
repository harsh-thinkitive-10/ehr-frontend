import { useMutation } from '@tanstack/react-query';
import { locationService } from '../services/locationService';
import type { UpdateLocationRequest } from '../types/location';

interface UpdateLocationVariables {
  uuid: string;
  data: UpdateLocationRequest;
}

export function useUpdateLocation() {
  return useMutation({
    mutationFn: ({ uuid, data }: UpdateLocationVariables) =>
      locationService.updateLocation(uuid, data),
  });
}