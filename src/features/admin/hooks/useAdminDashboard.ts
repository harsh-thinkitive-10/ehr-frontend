import { useGetAdminDashboard } from '../../../sdk/generated/admin/admin';

import type {
  AdminDashboard,
} from '../types/adminDashboard';

export function useAdminDashboard() {
  return useGetAdminDashboard({
    query: {
      select: (response) =>
        response.data as unknown as AdminDashboard,

      staleTime: 30_000,
    },
  });
}
