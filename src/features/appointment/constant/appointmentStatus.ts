import type { AppointmentStatus } from '../types/appointment';

export interface AppointmentStatusOption {
  value: AppointmentStatus;
  label: string;
}

export const appointmentStatusOptions: AppointmentStatusOption[] = [
  {
    value: 'SCHEDULED',
    label: 'Scheduled',
  },
  {
    value: 'PENDING',
    label: 'Pending',
  },
  {
    value: 'CHECK_IN',
    label: 'Check In',
  },
  {
    value: 'COMPLETED',
    label: 'Completed',
  },
  {
    value: 'CANCELLED',
    label: 'Cancelled',
  },
  {
    value: 'NO_SHOW',
    label: 'No Show',
  },
  {
    value: 'RESCHEDULED',
    label: 'Rescheduled',
  },
  {
    value: 'CLOSED',
    label: 'Closed',
  },
];

export function getAppointmentStatusLabel(
  status: AppointmentStatus,
): string {
  return (
    appointmentStatusOptions.find(
      (option) =>
        option.value === status,
    )?.label ??
    status.replaceAll('_', ' ')
  );
}

export function getAppointmentStatusColor(
  status: AppointmentStatus,
):
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'default' {
  switch (status) {
    case 'SCHEDULED':
      return 'primary';

    case 'PENDING':
      return 'warning';

    case 'CHECK_IN':
      return 'warning';

    case 'COMPLETED':
      return 'success';

    case 'CANCELLED':
      return 'error';

    case 'NO_SHOW':
      return 'error';

    case 'RESCHEDULED':
      return 'warning';

    case 'CLOSED':
      return 'default';

    default:
      return 'default';
  }
}