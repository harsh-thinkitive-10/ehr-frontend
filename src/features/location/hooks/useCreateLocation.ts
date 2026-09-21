import { useMutation } from '@tanstack/react-query';
import { locationService } from '../services/locationService';
import type { CreateLocationRequest } from '../types/location';

export function useCreateLocation() {
  return useMutation({
    mutationFn: (data: CreateLocationRequest) => locationService.createLocation(data),
  });
}