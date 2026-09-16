import { useMutation } from '@tanstack/react-query';

import { queryClient } from '../../../app/queryClient';

import { doctorProfileKeys } from './useDoctorProfile';

import { doctorProfileService } from '../services/doctorProfileService';

export function useUpdateDoctorProfile() {
  return useMutation({
    mutationFn:
      doctorProfileService.updateProfile,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: doctorProfileKeys.all,
      });
    },
  });
}