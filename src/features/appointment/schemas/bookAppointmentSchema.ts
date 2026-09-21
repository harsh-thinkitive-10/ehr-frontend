import { z } from 'zod';

export const bookAppointmentSchema = z.object({
  providerId: z
    .string()
    .min(
      1,
      'Please select a provider',
    ),

  patientId: z
    .string()
    .min(
      1,
      'Please select a patient',
    ),
  locationId: z.string().min(1, 'Location is required'),

  appointmentDate: z
    .string()
    .min(
      1,
      'Please select an appointment date',
    ),

  appointmentTime: z
    .string()
    .min(
      1,
      'Please select an appointment time',
    ),

  comment: z
    .string()
    .trim()
    .min(
      1,
      'Please enter a reason for the appointment',
    )
    .max(
      500,
      'Comment must not exceed 500 characters',
    ),
});

export type BookAppointmentFormValues =
  z.infer<typeof bookAppointmentSchema>;