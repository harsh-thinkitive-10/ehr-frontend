import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query';

import { patientService } from '../services/patientService';

import type {
  PatientListParams,
} from '../types/patient';

export const patientKeys = {
  all: ['patients'] as const,

  list: (
    params: PatientListParams,
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
    queryKey:
      patientKeys.list(params),

    queryFn: () =>
      patientService.getPatients(
        params,
      ),

    placeholderData:
      keepPreviousData,

    staleTime: 30 * 1000,
  });
}