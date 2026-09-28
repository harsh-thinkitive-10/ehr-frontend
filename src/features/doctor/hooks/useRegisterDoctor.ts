import { useMutation } from '@tanstack/react-query';

import { registerNewDoctor } from '../../../sdk/generated/doctor/doctor';
import type { RegisterDoctor } from '../../../sdk/generated/common/types';

export function useRegisterDoctor() {
  return useMutation({
    mutationFn: (
      data: RegisterDoctor,
    ) =>
      registerNewDoctor(
        data,
      ),
  });
}
