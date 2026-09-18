import { useMutation } from '@tanstack/react-query';
import { patientService } from '../services/patientService';

export function useDeletePatient() {
  return useMutation({
    mutationFn: (uuid: string) => patientService.deletePatient(uuid),
  });
}