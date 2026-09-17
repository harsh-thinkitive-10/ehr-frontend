import { useQuery } from '@tanstack/react-query';

import {
  patientService,
  type PatientListParams,
} from '../services/patientService';

export const patientKeys = {
  all: ['patients'] as const,

  list: (
    params: PatientListParams = {},
  ) =>
    [
      ...patientKeys.all,
      'list',
      params,
    ] as const,
};

export function usePatients(
  params: PatientListParams = {},
) {
  return useQuery({
    queryKey: patientKeys.list(params),

    queryFn: () =>
      patientService.getPatients(
        params,
      ),

    staleTime: 5 * 60 * 1000,
  });
}