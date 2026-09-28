import { keepPreviousData } from '@tanstack/react-query';

import { useGetPatientAppointments } from '../../../sdk/generated/appointment/appointment';
import type { Response } from '../../../sdk/generated/common/types';

import type { PatientAppointmentPage } from '../types/appointment';

type PatientAppointmentsResponse = Omit<Response, 'data'> & {
  data: PatientAppointmentPage;
};

export function usePatientAppointments(page: number, size: number) {
  return useGetPatientAppointments(
    { page, size },
    {
      query: {
        select: (response) => response as unknown as PatientAppointmentsResponse,
        placeholderData: keepPreviousData,
      },
    },
  );
}
