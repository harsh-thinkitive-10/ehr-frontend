import type { ReactNode } from 'react';

import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import { usePatientProfile } from '../hooks/usePatientProfile';

export default function PatientProfilePage() {

  const {
    patient,
    loading,
    error,
  } = usePatientProfile();

  if (loading) {
    return (
      <Stack
        sx={{
          minHeight: 300,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  if (!patient) {
    return (
      <Alert severity="info">
        Patient profile not found.
      </Alert>
    );
  }

  return (
    <Stack spacing={3}>
      {/* Page Header */}
      <Stack spacing={0.5}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#1e293b',
          }}
        >
          My Profile
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#64748b',
          }}
        >
          View your personal information
        </Typography>
      </Stack>

      {/* Profile Summary */}
      <Card
        elevation={0}
        sx={{
          border: '1px solid #e5e7eb',
          borderRadius: '10px',
          backgroundColor: '#fff',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                width: 72,
                height: 72,
                backgroundColor: '#e8f1ff',
                color: '#1976d2',
              }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>

            <Stack spacing={0.5}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#1e293b',
                }}
              >
                {patient.fullName}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: '#64748b',
                }}
              >
                Patient
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card
        elevation={0}
        sx={{
          border: '1px solid #e5e7eb',
          borderRadius: '10px',
          backgroundColor: '#fff',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: '#1e293b',
            }}
          >
            Personal Information
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
              },
              gap: 3,
            }}
          >
            <ProfileField
              icon={<PersonIcon />}
              label="Full Name"
              value={patient.fullName}
            />

            <ProfileField
              icon={<CakeIcon />}
              label="Age"
              value={`${patient.age} years`}
            />

            <ProfileField
              icon={<WcIcon />}
              label="Gender"
              value={patient.gender}
            />

            <ProfileField
              icon={<PhoneIcon />}
              label="Phone Number"
              value={patient.phoneNumber}
            />

            <ProfileField
              icon={<EmailIcon />}
              label="Email"
              value={patient.email}
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}

interface ProfileFieldProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function ProfileField({
  icon,
  label,
  value,
}: ProfileFieldProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: 'center',
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          backgroundColor: '#e8f1ff',
          color: '#1976d2',
        }}
      >
        {icon}
      </Box>

      <Stack
        spacing={0.25}
        sx={{
          minWidth: 0,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#64748b',
          }}
        >
          {label}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: '#1e293b',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
}