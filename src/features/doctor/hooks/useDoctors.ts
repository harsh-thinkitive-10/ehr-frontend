import {
  getGetAllDoctorsQueryKey,
  useGetAllDoctors,
} from '../../../sdk/generated/doctor/doctor';

import type { DoctorListResponse } from '../types/doctor';

export interface DoctorListParams {
  page: number;
  size: number;
  sort?: string;
  search?: string;
  specialization?: string;
}

export const doctorKeys = {
  all: getGetAllDoctorsQueryKey(),
};

export function useDoctors(
  params: DoctorListParams,
) {
  const { sort, ...rest } = params;

  return useGetAllDoctors(
    { ...rest, ...(sort ? { sort: [sort] } : {}) },
    {
      query: {
        select: (response) =>
          response as unknown as DoctorListResponse,

        staleTime: 5 * 60 * 1000,
      },
    },
  );
}
