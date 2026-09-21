import { z } from 'zod';

export const patientFormSchema = z.object({
  firstName: z.string().trim().min(2, 'First name must be at least 2 characters.'),
  lastName: z.string().trim().min(2, 'Last name must be at least 2 characters.'),
  age: z.number().int('Age must be a whole number.').min(1, 'Age must be at least 1.').max(150, 'Please enter a valid age.'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  phoneNumber: z.string().trim().regex(/^[0-9]{10}$/, 'Phone number must contain exactly 10 digits.'),
  email: z.string().trim().email('Please enter a valid email address.'),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;