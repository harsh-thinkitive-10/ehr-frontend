import { keepPreviousData } from '@tanstack/react-query';

import {
  getGetAllPatientsQueryKey,
  useGetAllPatients,
} from '../../../sdk/generated/patient/patient';
import type { GetAllPatientsParams } from '../../../sdk/generated/common/types';

import type {
  PatientListParams,
  PatientListResponse,
} from '../types/patient';

export const patientKeys = {
  all: getGetAllPatientsQueryKey(),
};

function toQueryParams(
  params: PatientListParams,
): GetAllPatientsParams {
  const search = params.search?.trim();

  return {
    page: params.page ?? 0,
    size: params.size ?? 10,
    ...(search ? { search } : {}),
    ...(params.gender ? { gender: params.gender } : {}),
    ...(params.age !== undefined ? { age: params.age } : {}),
    ...(params.sort ? { sort: [params.sort] } : {}),
  };
}

export function usePatients(
  params: PatientListParams = {},
) {
  return useGetAllPatients(toQueryParams(params), {
    query: {
      select: (response) =>
        response as unknown as PatientListResponse,

      placeholderData:
        keepPreviousData,

      staleTime: 30 * 1000,
    },
  });
}
