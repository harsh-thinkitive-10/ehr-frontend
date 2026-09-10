import {
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MedicationIcon from '@mui/icons-material/Medication';
import DescriptionIcon from '@mui/icons-material/Description';

import {
  StatCard,
} from '../../../component/ui';

import AppLayout from '../../../layouts/AppLayout/AppLayout';

import { usePatientDashboard } from '../../patient/hooks/usePatientDashboard';

export default function DashboardPage() {
  const {
    data: dashboard,
    isLoading: loading,
    error,
  } = usePatientDashboard();

  if (loading) {
    return (
      <AppLayout>
        <Typography>
          Loading dashboard...
        </Typography>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <Typography color="error">
          {error instanceof Error
            ? error.message
            : 'Unable to load your dashboard.'}
        </Typography>
      </AppLayout>
    );
  }

  if (!dashboard) {
    return (
      <AppLayout>
        <Typography>
          Dashboard data not found.
        </Typography>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Page Header */}

      <Stack
        spacing={0.5}
        sx={{
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#172b4d',
          }}
        >
          Good morning, {dashboard.patient.fullName} 👋
        </Typography>

        <Typography
          sx={{
            fontSize: '0.95rem',
            color: '#64748b',
          }}
        >
          Here's an overview of your health information.
        </Typography>
      </Stack>

      {/* Statistics */}

      <Grid
        container
        spacing={2.5}
      >
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <StatCard
            title="Total Visits"
            value={dashboard.appointments.completed}
            subtitle="Completed appointments"
            icon={<MedicalServicesIcon />}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <StatCard
            title="Appointments"
            value={dashboard.appointments.upcoming}
            subtitle="Upcoming"
            icon={<CalendarMonthIcon />}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <StatCard
            title="Medications"
            value={dashboard.prescriptions.active}
            subtitle="Active prescriptions"
            icon={<MedicationIcon />}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <StatCard
            title="Medical Records"
            value={dashboard.medicalRecords.total ?? '—'}
            subtitle="Available records"
            icon={<DescriptionIcon />}
          />
        </Grid>
      </Grid>
    </AppLayout>
  );
}