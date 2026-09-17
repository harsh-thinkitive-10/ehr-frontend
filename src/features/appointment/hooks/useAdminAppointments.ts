import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query';

import {
  adminAppointmentKeys,
} from '../../admin/constants/queryKeys';

import {
  adminAppointmentService,
  type AdminAppointmentListParams,
} from '../../admin/services/adminAppointmentService';

export function useAdminAppointments(
  params: AdminAppointmentListParams,
) {
  return useQuery({
    queryKey:
      adminAppointmentKeys.list(
        params.page,
        params.size,
      ),

    queryFn: () =>
      adminAppointmentService.getAppointments(
        params,
      ),

    placeholderData:
      keepPreviousData,
  });
}