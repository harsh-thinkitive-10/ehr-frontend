import { useMutation } from '@tanstack/react-query';

import { updatePatient } from '../../../sdk/generated/patient/patient';
import type { PatientDTO } from '../../../sdk/generated/common/types';

export function useUpdatePatient() {
  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: PatientDTO }) =>
      updatePatient(uuid, data),
  });
}
