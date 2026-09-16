import {
  Alert,
  Box,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { useAdminDashboard } from '../hooks/useAdminDashboard';

import StatCard from '../../../component/ui/stat-card/StatCard';

export default function AdminDashboard() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useAdminDashboard();

  if (isLoading) {
    return (
      <Typography>
        Loading dashboard...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        {error instanceof Error
          ? error.message
          : 'Unable to load admin dashboard.'}
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert severity="info">
        No dashboard data available.
      </Alert>
    );
  }

  return (
    <Box>
      {/* PAGE HEADER */}

      <Stack spacing={0.5} sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#172b4d',
          }}
        >
          Admin Dashboard
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#64748b',
          }}
        >
          Overview of your EHR system.
        </Typography>
      </Stack>

      {/* STATISTICS */}

      <Grid
        container
        spacing={3}
      >
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 4,
          }}
        >
          <StatCard
            title="Total Patients"
            value={data.totalPatients}
            icon={<PeopleIcon />}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 4,
          }}
        >
          <StatCard
            title="Total Doctors"
            value={data.totalDoctors}
            icon={
              <MedicalServicesIcon />
            }
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 4,
          }}
        >
          <StatCard
            title="Total Appointments"
            value={
              data.totalAppointments
            }
            icon={
              <CalendarMonthIcon />
            }
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 4,
          }}
        >
          <StatCard
            title="Scheduled Appointments"
            value={
              data.scheduledAppointments
            }
            icon={<ScheduleIcon />}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 4,
          }}
        >
          <StatCard
            title="Completed Appointments"
            value={
              data.completedAppointments
            }
            icon={
              <CheckCircleIcon />
            }
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 4,
          }}
        >
          <StatCard
            title="Cancelled Appointments"
            value={
              data.cancelledAppointments
            }
            icon={<CancelIcon />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}