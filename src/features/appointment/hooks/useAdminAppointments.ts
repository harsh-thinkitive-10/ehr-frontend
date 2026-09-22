import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { adminAppointmentKeys } from '../../admin/constants/queryKeys';
import { appointmentService, type AppointmentListParams } from '../services/appointmentService';

export function useAdminAppointments(params: AppointmentListParams) {
  return useQuery({
    queryKey: adminAppointmentKeys.list(params.page, params.size),
    queryFn: () => appointmentService.getAdminAppointments(params.page, params.size),
    placeholderData: keepPreviousData,
  });
}