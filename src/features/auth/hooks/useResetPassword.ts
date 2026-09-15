import { useMutation } from '@tanstack/react-query';

import {
  authService,
  type ResetPasswordRequest,
} from '../services/authService';

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) =>
      authService.resetPassword(data),
  });
}