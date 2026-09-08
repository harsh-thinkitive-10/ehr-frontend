import { useEffect, useState } from 'react';

import {
  Alert,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import { patientService } from '../services/patientService';

import type { Patient } from '../types/patient.types';

export default function PatientProfilePage() {
  const [patient, setPatient] =
    useState<Patient | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError('');

        const data =
          await patientService.getMyProfile();

        setPatient(data);
      } catch (error) {
        console.error(
          'Failed to load patient profile:',
          error,
        );

        setError(
          'Unable to load your profile.',
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return <CircularProgress />;
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
    <Stack spacing={2}>
      <Typography variant="h4">
        My Profile
      </Typography>

      <Typography>
        Name: {patient.fullName}
      </Typography>

      <Typography>
        Age: {patient.age}
      </Typography>

      <Typography>
        Gender: {patient.gender}
      </Typography>

      <Typography>
        Phone: {patient.phoneNumber}
      </Typography>

      <Typography>
        Email: {patient.email}
      </Typography>
    </Stack>
  );
}