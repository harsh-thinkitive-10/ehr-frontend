import {
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { StatCard } from '../../../component/ui';
import { useDoctorDashboard } from '../../doctor/hooks/useDoctorDashboard';

export default function DoctorDashboard() {
  const {
    data: dashboard,
    isLoading,
    error,
  } = useDoctorDashboard();

  if (isLoading) {
    return (
      <Typography>
        Loading dashboard...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        {error instanceof Error
          ? error.message
          : 'Unable to load your dashboard.'}
      </Typography>
    );
  }

  if (!dashboard) {
    return (
      <Typography>
        Dashboard data not found.
      </Typography>
    );
  }

  return (
    <>
      <Stack spacing={0.5} sx={{ mb: 4 }}>
        <Typography variant="h4">
          Doctor Dashboard
        </Typography>

        <Typography>
          Here's an overview of your appointments and patients.
        </Typography>
      </Stack>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Appointments"
            value={dashboard.totalAppointments}
            subtitle="All appointments"
            icon={<CalendarMonthIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Scheduled"
            value={dashboard.scheduledAppointments}
            subtitle="Scheduled appointments"
            icon={<CalendarMonthIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Completed"
            value={dashboard.completedAppointments}
            subtitle="Completed appointments"
            icon={<CheckCircleIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Patients"
            value={dashboard.totalPatients}
            subtitle="Patients assigned"
            icon={<PeopleIcon />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mt: 0 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Cancelled"
            value={dashboard.cancelledAppointments}
            subtitle="Cancelled appointments"
            icon={<CancelIcon />}
          />
        </Grid>
      </Grid>
    </>
  );
}