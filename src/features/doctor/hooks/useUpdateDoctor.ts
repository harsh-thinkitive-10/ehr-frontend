import { useMutation } from '@tanstack/react-query';

import { updateDoctor } from '../../../sdk/generated/doctor/doctor';
import type { DoctorDTO } from '../../../sdk/generated/common/types';

export function useUpdateDoctor() {
  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: DoctorDTO }) =>
      updateDoctor(uuid, data),
  });
}
