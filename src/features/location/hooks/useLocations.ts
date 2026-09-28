import { keepPreviousData } from '@tanstack/react-query';

import {
  getGetAllLocationsQueryKey,
  useGetAllLocations,
} from '../../../sdk/generated/location/location';

import type { LocationListResponse } from '../types/location';

export interface LocationListParams {
  page: number;
  size: number;
}

export const locationKeys = {
  all: getGetAllLocationsQueryKey(),
};

export function useLocations(params: LocationListParams) {
  return useGetAllLocations(params, {
    query: {
      select: (response) => response as unknown as LocationListResponse,
      placeholderData: keepPreviousData,
    },
  });
}
