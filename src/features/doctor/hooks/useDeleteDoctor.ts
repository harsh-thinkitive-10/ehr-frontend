import { useMutation } from '@tanstack/react-query';
import { doctorService } from '../services/doctorService';

export function useDeleteDoctor() {
  return useMutation({
    mutationFn: (uuid: string) => doctorService.deleteDoctor(uuid),
  });
}