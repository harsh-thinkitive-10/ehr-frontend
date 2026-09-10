import { useMutation } from '@tanstack/react-query';

import {
  authService,
  type ChangePasswordRequest,
} from '../services/authService';

export function useChangePassword() {
  return useMutation({
    mutationFn: (
      data: ChangePasswordRequest,
    ) => authService.changePassword(data),
  });
}