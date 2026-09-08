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

export default function DashboardPage() {
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
          Good morning, Patient 👋
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
            value={12}
            subtitle="All time"
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
            value={2}
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
            value={4}
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
            value={8}
            subtitle="Available records"
            icon={<DescriptionIcon />}
          />
        </Grid>
      </Grid>
    </AppLayout>
  );
}