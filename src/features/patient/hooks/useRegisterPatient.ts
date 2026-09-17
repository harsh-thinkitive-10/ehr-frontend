import { useMutation } from '@tanstack/react-query';

import { patientService } from '../services/patientService';

import type {
  RegisterPatientRequest,
} from '../types/patient';

export function useRegisterPatient() {
  return useMutation({
    mutationFn: (
      data: RegisterPatientRequest,
    ) =>
      patientService.registerPatient(data),
  });
}