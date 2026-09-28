import { useMutation } from '@tanstack/react-query';

import { updateAppointmentStatus } from '../../../sdk/generated/appointment/appointment';

import type { AppointmentStatus } from '../types/appointment';

interface UpdateAppointmentStatusVariables {
  uuid: string;
  status: AppointmentStatus;
}

export function useUpdateAppointmentStatus() {
  return useMutation({
    mutationFn: ({ uuid, status }: UpdateAppointmentStatusVariables) =>
      updateAppointmentStatus(uuid, { status }),
  });
}
