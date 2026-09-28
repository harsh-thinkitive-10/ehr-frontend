import { useMutation } from '@tanstack/react-query';

import { changePassword } from '../../../sdk/generated/auth/auth';
import type { ChangePasswordRequest } from '../../../sdk/generated/common/types';

export function useChangePassword() {
  return useMutation({
    mutationFn: async (
      data: ChangePasswordRequest,
    ) => {
      await changePassword(data);
    },
  });
}
