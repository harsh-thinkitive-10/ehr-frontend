import { z } from 'zod';

export const doctorSchema =
    z.object({
        firstName: z.string().trim()
            .min(1,'First name is required',),

        lastName: z.string().trim().min(1,'Last name is required',),

        specialization: z.string().trim().min(1,'Specialization is required',),

        phoneNumber: z
            .string()
            .trim()
            .regex(
                /^\d{10}$/,
                'Phone number must contain 10 digits',
            ),

        email: z.email(
            'Enter a valid email address',
        ),

        consultationFee: z
            .number()
            .min(
                0,
                'Consultation fee cannot be negative',
            ),
    });

export type DoctorFormValues =
    z.infer<typeof doctorSchema>;