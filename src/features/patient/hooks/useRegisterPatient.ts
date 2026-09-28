import { useMutation } from '@tanstack/react-query';

import { registerNewPatient } from '../../../sdk/generated/patient/patient';
import type { RegisterPatient } from '../../../sdk/generated/common/types';

export function useRegisterPatient() {
  return useMutation({
    mutationFn: (
      data: RegisterPatient,
    ) =>
      registerNewPatient(data),
  });
}
