import { useQuery } from '@tanstack/react-query';

import {
  adminKeys,
} from '../constants/queryKeys';

import {
  adminDashboardService,
} from '../services/adminDashboardService';

export function useAdminDashboard() {
  return useQuery({
    queryKey:
      adminKeys.dashboard(),

    queryFn: () =>
      adminDashboardService.getDashboard(),

    staleTime: 30_000,
  });
}