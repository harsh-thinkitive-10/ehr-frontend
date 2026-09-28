import { useGetDoctorDashboard } from '../../../sdk/generated/doctor/doctor';

import type { DoctorDashboard } from '../types/doctorDashboard';

export function useDoctorDashboard() {
  return useGetDoctorDashboard({
    query: {
      select: (response) =>
        response.data as unknown as DoctorDashboard,
    },
  });
}
