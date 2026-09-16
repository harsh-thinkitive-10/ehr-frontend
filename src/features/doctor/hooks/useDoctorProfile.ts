import { useQuery } from '@tanstack/react-query';
import { doctorProfileService } from '../services/doctorProfileService';

export const doctorProfileKeys = {
  all: ['doctor-profile'] as const,
};

export function useDoctorProfile() {
  return useQuery({
    queryKey: doctorProfileKeys.all,
    queryFn: doctorProfileService.getProfile,
  });
}