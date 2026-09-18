import { useMutation } from '@tanstack/react-query';
import { patientService } from '../services/patientService';

export function useUpdatePatient() {
  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: Parameters<typeof patientService.updatePatient>[1] }) =>
      patientService.updatePatient(uuid, data),
  });
}