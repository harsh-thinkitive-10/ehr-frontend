import { useQuery } from '@tanstack/react-query';
import { doctorDashboardService } from '../services/doctorDashboardService';

export const doctorDashboardKeys = {
  all: ['doctor-dashboard'] as const,
};

export function useDoctorDashboard() {
  return useQuery({
    queryKey: doctorDashboardKeys.all,
    queryFn: doctorDashboardService.getDashboard,
  });
}