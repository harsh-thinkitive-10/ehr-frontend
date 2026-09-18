import { useMutation } from '@tanstack/react-query';
import { doctorService } from '../services/doctorService';
import type { UpdateDoctorRequest } from '../types/doctor';

export function useUpdateDoctor() {
  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateDoctorRequest }) =>
      doctorService.updateDoctor(uuid, data),
  });
}