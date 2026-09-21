import { useState } from 'react';
import {
  Alert, Box, Dialog, DialogContent, DialogTitle, Snackbar, Stack,
  Button as MuiButton, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useQueryClient } from '@tanstack/react-query';

import PatientForm from '../component/patient/PatientForm';
import PatientList from '../component/patient/PatientList';
import { useRegisterPatient } from '../hooks/useRegisterPatient';
import { useDeletePatient } from '../hooks/useDeletePatient';
import { patientKeys } from '../hooks/usePatients';
import type { Patient, RegisterPatientRequest } from '../types/patient';

export default function PatientManagementPage() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [deletePatient, setDeletePatient] = useState<Patient | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const registerPatient = useRegisterPatient();
  const deletePatientMutation = useDeletePatient();

  const handleRegister = async (values: RegisterPatientRequest) => {
    try {
      const response = await registerPatient.mutateAsync(values);
      await queryClient.invalidateQueries({ queryKey: patientKeys.all });
      setDialogOpen(false);
      setSuccessMessage(response.message ?? 'Patient registered successfully.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to register patient.');
    }
  };

  const handleDelete = async () => {
    if (!deletePatient) return;

    try {
      await deletePatientMutation.mutateAsync(deletePatient.uuid);
      await queryClient.invalidateQueries({ queryKey: patientKeys.all });
      setDeletePatient(null);
      setSuccessMessage('Patient deleted successfully.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete patient.');
    }
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}
        sx={{ mb: 3, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" sx={{ mb: 0.5 }}>Patient Management</Typography>
          <Typography variant="body2" color="text.secondary">Register and manage patients.</Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <MuiButton
            variant={filterOpen ? 'contained' : 'outlined'}
            startIcon={<FilterListIcon />}
            onClick={() => setFilterOpen(previous => !previous)}
          >
            Apply Filter
          </MuiButton>

          <MuiButton variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
            Register Patient
          </MuiButton>
        </Stack>
      </Stack>

      <PatientList
        filterOpen={filterOpen}
        onDelete={setDeletePatient}
      />

      <Dialog
        open={dialogOpen}
        onClose={() => !registerPatient.isPending && setDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Register Patient</DialogTitle>
        <DialogContent dividers>
          <PatientForm loading={registerPatient.isPending} onSubmit={handleRegister} onCancel={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!deletePatient}
        onClose={() => !deletePatientMutation.isPending && setDeletePatient(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Patient</DialogTitle>
        <DialogContent dividers>
          <Typography>
            Are you sure you want to delete {deletePatient?.fullName}?
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 3, justifyContent: 'flex-end' }}>
            <MuiButton
              onClick={() => setDeletePatient(null)}
              disabled={deletePatientMutation.isPending}
            >
              Cancel
            </MuiButton>

            <MuiButton
              color="error"
              variant="contained"
              onClick={handleDelete}
              disabled={deletePatientMutation.isPending}
            >
              {deletePatientMutation.isPending ? 'Deleting...' : 'Delete'}
            </MuiButton>
          </Stack>
        </DialogContent>
      </Dialog>

      <Snackbar open={!!successMessage} autoHideDuration={4000} onClose={() => setSuccessMessage(null)}>
        <Alert severity="success" variant="filled" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar open={!!errorMessage} autoHideDuration={5000} onClose={() => setErrorMessage(null)}>
        <Alert severity="error" variant="filled" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}