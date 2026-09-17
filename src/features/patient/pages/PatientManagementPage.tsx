import { useState } from 'react';

import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  Button as MuiButton,
  Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { useQueryClient } from '@tanstack/react-query';

import PatientForm from '../component/patient/PatientForm';
import PatientList from '../component/patient/PatientList';

import { useRegisterPatient } from '../hooks/useRegisterPatient';
import { patientKeys } from '../hooks/usePatients';

import type {
  RegisterPatientRequest,
} from '../types/patient';

export default function PatientManagementPage() {
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const registerPatient =
    useRegisterPatient();

  const handleRegister = async (
    values: RegisterPatientRequest,
  ) => {
    try {
      const response =
        await registerPatient.mutateAsync(
          values,
        );

      await queryClient.invalidateQueries({
        queryKey: patientKeys.all,
      });

      setDialogOpen(false);

      setSuccessMessage(
        response.message ??
          'Patient registered successfully.',
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Failed to register patient.',
      );
    }
  };

  return (
    <Box>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
        sx={{
          mb: 3,
          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ mb: 0.5 }}
          >
            Patient Management
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Register and manage patients.
          </Typography>
        </Box>

        <MuiButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Register Patient
        </MuiButton>
      </Stack>

      <PatientList />

      <Dialog
        open={dialogOpen}
        onClose={() => {
          if (!registerPatient.isPending) {
            setDialogOpen(false);
          }
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Register Patient
        </DialogTitle>

        <DialogContent dividers>
          <PatientForm
            loading={registerPatient.isPending}
            onSubmit={handleRegister}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={successMessage !== null}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage(null)}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessMessage(null)}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorMessage !== null}
        autoHideDuration={5000}
        onClose={() => setErrorMessage(null)}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setErrorMessage(null)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}