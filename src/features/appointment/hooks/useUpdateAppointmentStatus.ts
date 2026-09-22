import { useMutation } from '@tanstack/react-query';
import { appointmentService } from '../services/appointmentService';
import type { AppointmentStatus } from '../types/appointment';

interface UpdateAppointmentStatusVariables {
  uuid: string;
  status: AppointmentStatus;
}

export function useUpdateAppointmentStatus() {
  return useMutation({
    mutationFn: ({ uuid, status }: UpdateAppointmentStatusVariables) =>
      appointmentService.updateAppointmentStatus(uuid, status),
  });
}