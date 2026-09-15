import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'Username is required.'),
});

export type ForgotPasswordFormData =
  z.infer<typeof forgotPasswordSchema>;