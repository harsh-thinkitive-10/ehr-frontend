import {
  Chip,
} from '@mui/material';

import type {
  AppointmentStatus,
} from '../types/appointment';

import {
  getAppointmentStatusColor,
  getAppointmentStatusLabel,
} from '../constant/appointmentStatus';

interface AppointmentStatusChipProps {
  status: AppointmentStatus;
}

export default function AppointmentStatusChip({
  status,
}: AppointmentStatusChipProps) {
  return (
    <Chip
      label={getAppointmentStatusLabel(
        status,
      )}
      color={getAppointmentStatusColor(
        status,
      )}
      size="small"
      sx={{
        fontWeight: 600,
      }}
    />
  );
}