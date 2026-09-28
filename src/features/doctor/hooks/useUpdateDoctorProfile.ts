import { useMutation } from '@tanstack/react-query';

import { queryClient } from '../../../sdk/queryClient';
import {
  getGetDoctorProfileQueryKey,
  updateDoctorProfile,
} from '../../../sdk/generated/doctor/doctor';

import type { DoctorProfileFormData } from '../schemas/doctorProfile.schema';

export function useUpdateDoctorProfile() {
  return useMutation({
    mutationFn: async (data: DoctorProfileFormData) => {
      await updateDoctorProfile(data);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getGetDoctorProfileQueryKey(),
      });
    },
  });
}
