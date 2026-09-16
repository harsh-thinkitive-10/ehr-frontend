import { z } from 'zod';

export const doctorProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters'),

  specialization: z
    .string()
    .trim()
    .min(2, 'Specialization is required'),

  phoneNumber: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      'Enter a valid 10-digit phone number',
    ),

  email: z
    .string()
    .trim()
    .email('Enter a valid email address'),

  consultationFee: z
    .number()
    .min(0, 'Consultation fee cannot be negative'),
});

export type DoctorProfileFormData =
  z.infer<typeof doctorProfileSchema>;