import { useMutation } from '@tanstack/react-query';

import { resetPassword } from '../../../sdk/generated/auth/auth';
import type { ResetPasswordRequest } from '../../../sdk/generated/common/types';

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) =>
      resetPassword(data),
  });
}
