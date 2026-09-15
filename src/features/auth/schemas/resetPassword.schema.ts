import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'New password is required.')
      .min(8, 'New password must be at least 8 characters.'),

    confirmPassword: z
      .string()
      .min(1, 'Please confirm your new password.'),
  })
  .refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
    },
  );

export type ResetPasswordFormData =
  z.infer<typeof resetPasswordSchema>;