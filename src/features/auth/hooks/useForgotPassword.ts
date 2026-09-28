import { useMutation } from '@tanstack/react-query';

import { forgotPassword } from '../../../sdk/generated/auth/auth';
import type { ForgotPasswordRequest } from '../../../sdk/generated/common/types';

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      forgotPassword(data),
  });
}
