import { useMutation } from '@tanstack/react-query';

import {
  bookAppointmentService,
} from '../services/bookAppointmentService';

import type {
  BookAppointmentRequest,
} from '../types/bookAppointment';

export function useBookAppointment() {
  return useMutation({
    mutationFn: (
      data: BookAppointmentRequest,
    ) =>
      bookAppointmentService.bookAppointment(
        data,
      ),
  });
}