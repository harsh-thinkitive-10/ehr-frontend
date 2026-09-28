import { useGetDoctorProfile } from '../../../sdk/generated/doctor/doctor';

import type { DoctorProfile } from '../types/doctorProfile';

export function useDoctorProfile() {
  return useGetDoctorProfile({
    query: {
      select: (response) =>
        response.data as unknown as DoctorProfile,
    },
  });
}
