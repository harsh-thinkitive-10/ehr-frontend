import { useMutation } from '@tanstack/react-query';

import { doctorService } from '../services/doctorService';

import type {
  RegisterDoctorRequest,
} from '../types/doctor';

export function useRegisterDoctor() {
  return useMutation({
    mutationFn: (
      data: RegisterDoctorRequest,
    ) =>
      doctorService.registerDoctor(
        data,
      ),
  });
}