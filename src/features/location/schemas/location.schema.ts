import { z } from 'zod';

export const locationSchema = z.object({
  code: z.string().trim().min(1, 'Location code is required'),
  name: z.string().trim().min(1, 'Location name is required'),
  phone: z.string().trim().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  email: z.string().trim().email('Enter a valid email address'),
  npi: z.string().trim().min(1, 'NPI is required'),
  line1: z.string().trim().min(1, 'Address line 1 is required'),
  line2: z.string().trim(),
  city: z.string().trim().min(1, 'City is required'),
  state: z.string().trim().min(1, 'State is required'),
  country: z.string().trim().min(1, 'Country is required'),
  zipcode: z.string().trim().min(1, 'Zipcode is required'),
});

export type LocationFormValues = z.infer<typeof locationSchema>;