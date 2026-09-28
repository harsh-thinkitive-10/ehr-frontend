import { useMutation } from '@tanstack/react-query';

import { createNewAppointment } from '../../../sdk/generated/appointment/appointment';
import type { AppointmentRequestDTO } from '../../../sdk/generated/common/types';

export function useBookAppointment() {
  return useMutation({
    mutationFn: (data: AppointmentRequestDTO) =>
      createNewAppointment(data),
  });
}
