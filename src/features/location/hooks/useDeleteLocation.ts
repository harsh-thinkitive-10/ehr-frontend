import { useMutation } from '@tanstack/react-query';
import { locationService } from '../services/locationService';

export function useDeleteLocation() {
  return useMutation({
    mutationFn: (uuid: string) => locationService.deleteLocation(uuid),
  });
}