import { useQuery } from '@tanstack/react-query';

import {
  doctorService,
  type DoctorListParams,
} from '../services/doctorService';

export const doctorKeys = {
  all: ['doctors'] as const,

  list: (
    params: DoctorListParams,
  ) =>
    [
      ...doctorKeys.all,
      'list',
      params,
    ] as const,
};

export function useDoctors(
  params: DoctorListParams,
) {
  return useQuery({
    queryKey:
      doctorKeys.list(params),

    queryFn: () =>
      doctorService.getDoctors(
        params,
      ),

    staleTime: 5 * 60 * 1000,
  });
}