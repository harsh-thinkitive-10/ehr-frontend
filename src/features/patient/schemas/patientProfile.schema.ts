import { z } from 'zod';

export const patientProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required.'),

  age: z
    .string()
    .trim()
    .min(1, 'Age is required.')
    .refine(
      (value) => {
        const age = Number(value);

        return (
          Number.isInteger(age) &&
          age > 0
        );
      },
      {
        message: 'Please enter a valid age.',
      },
    ),

  gender: z
    .string()
    .trim()
    .min(1, 'Gender is required.'),

  phoneNumber: z
    .string()
    .trim()
    .min(1, 'Phone number is required.'),

  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.'),
});

export type PatientProfileFormData =
  z.infer<typeof patientProfileSchema>;