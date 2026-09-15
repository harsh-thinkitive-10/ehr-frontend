import { useMutation } from '@tanstack/react-query';

import {
  authService,
  type ForgotPasswordRequest,
} from '../services/authService';

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.requestPasswordReset(data),
  });
}