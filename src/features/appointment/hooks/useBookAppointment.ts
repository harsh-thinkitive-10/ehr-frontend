import { useMutation } from '@tanstack/react-query';
import { appointmentService } from '../services/appointmentService';
import type { BookAppointmentRequest } from '../types/bookAppointment';

export function useBookAppointment() {
  return useMutation({
    mutationFn: (data: BookAppointmentRequest) =>
      appointmentService.bookAppointment(data),
  });
}