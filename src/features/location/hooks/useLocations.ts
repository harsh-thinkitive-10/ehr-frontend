import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { locationService, type LocationListParams } from '../services/locationService';

export const locationKeys = {
  all: ['locations'] as const,
  list: (page: number, size: number) => [...locationKeys.all, 'list', page, size] as const,
};

export function useLocations(params: LocationListParams) {
  return useQuery({
    queryKey: locationKeys.list(params.page, params.size),
    queryFn: () => locationService.getLocations(params),
    placeholderData: keepPreviousData,
  });
}