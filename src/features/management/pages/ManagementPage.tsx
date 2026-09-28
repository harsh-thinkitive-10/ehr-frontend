import { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Stack, Tab, Tabs, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import { useQueryClient } from '@tanstack/react-query';

import DoctorList from '../../doctor/component/doctor/DoctorList';
import DoctorForm from '../../doctor/component/doctor/DoctorForm';
import { useRegisterDoctor } from '../../doctor/hooks/useRegisterDoctor';
import { doctorKeys } from '../../doctor/hooks/useDoctors';
import { useDeleteDoctor } from '../../doctor/hooks/useDeleteDoctor';
import { useUpdateDoctor } from '../../doctor/hooks/useUpdateDoctor';
import type { Doctor } from '../../doctor/types/doctor';
import type { RegisterDoctor } from '../../../sdk/generated/common/types';
import type { DoctorFormValues } from '../../doctor/schemas/doctor.schema';

import LocationManagementPage from '../../location/pages/LocationManagementPage';
import { ManagementHeader } from '../../../component/management';

export default function ManagementPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState(0);
  const [addDoctorOpen, setAddDoctorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deleteDoctor, setDeleteDoctor] = useState<Doctor | null>(null);
  const [editDoctor, setEditDoctor] = useState<Doctor | null>(null);

  const registerDoctor = useRegisterDoctor();
  const deleteDoctorMutation = useDeleteDoctor();
  const updateDoctor = useUpdateDoctor();

  const handleRegisterDoctor = async (values: RegisterDoctor) => {
    try {
      setErrorMessage(null);
      await registerDoctor.mutateAsync(values);
      await queryClient.invalidateQueries({ queryKey: doctorKeys.all });
      setAddDoctorOpen(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to add doctor.');
    }
  };

  const handleDeleteDoctor = async () => {
    if (!deleteDoctor) return;

    try {
      await deleteDoctorMutation.mutateAsync(deleteDoctor.uuid);
      await queryClient.invalidateQueries({ queryKey: doctorKeys.all });
      setDeleteDoctor(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete doctor.');
    }
  };

  const handleUpdateDoctor = async (values: DoctorFormValues) => {
    if (!editDoctor) return;

    try {
      setErrorMessage(null);

      await updateDoctor.mutateAsync({
        uuid: editDoctor.uuid,
        data: {
          fullName: `${values.firstName} ${values.lastName}`.trim(),
          specialization: values.specialization,
          phoneNumber: values.phoneNumber,
          email: values.email,
          consultationFee: values.consultationFee,
        },
      });

      await queryClient.invalidateQueries({ queryKey: doctorKeys.all });
      setEditDoctor(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update doctor.');
    }
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
        <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} sx={{ minHeight: 48, '& .MuiTab-root': { minHeight: 48, minWidth: 150, textTransform: 'none', fontWeight: 600 } }}>
          <Tab icon={<MedicalServicesOutlinedIcon />} iconPosition="start" label="Providers" />
          <Tab icon={<LocationOnOutlinedIcon />} iconPosition="start" label="Locations" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Box sx={{ mt: 1, bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 2, p: { xs: 1, md: 2 } }}>
          <ManagementHeader
            title="Providers"
            description="View and manage all healthcare providers"
            buttonLabel="Add Doctor"
            onAdd={() => {
              setErrorMessage(null);
              setAddDoctorOpen(true);
            }}
          />

          <DoctorList onEdit={setEditDoctor} onDelete={setDeleteDoctor} />
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ mt: 1, bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 2, p: { xs: 1, md: 2 } }}>
          <LocationManagementPage />
        </Box>
      )}

      <Dialog
        open={addDoctorOpen}
        onClose={() => {
          if (!registerDoctor.isPending) {
            setErrorMessage(null);
            setAddDoctorOpen(false);
          }
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Add Doctor</DialogTitle>
        <DialogContent dividers>
          <DoctorForm
            loading={registerDoctor.isPending}
            errorMessage={errorMessage}
            onCancel={() => setAddDoctorOpen(false)}
            onSubmit={handleRegisterDoctor}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editDoctor}
        onClose={() => !updateDoctor.isPending && setEditDoctor(null)}
        fullWidth
        maxWidth="md"
      >
        <Box sx={{ px: 3.5, py: 2.5, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Box sx={{ width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'primary.light', color: 'primary.main' }}>
                <MedicalServicesOutlinedIcon sx={{ fontSize: 30 }} />
              </Box>

              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Edit Doctor
                </Typography>
                <Typography color="text.secondary">
                  Update healthcare provider information
                </Typography>
              </Box>
            </Stack>

            <Button
              onClick={() => setEditDoctor(null)}
              sx={{ minWidth: 40, width: 40, height: 40, p: 0, color: 'text.secondary', fontSize: 28 }}
            >
              ×
            </Button>
          </Stack>
        </Box>

        <DialogContent sx={{ px: 3.5, py: 3.5 }}>
          {editDoctor && (
            <DoctorForm
              mode="edit"
              initialValues={{
                firstName: editDoctor.fullName.split(' ').slice(0, -1).join(' ') || editDoctor.fullName,
                lastName: editDoctor.fullName.split(' ').slice(-1).join(''),
                specialization: editDoctor.specialization,
                phoneNumber: editDoctor.phoneNumber,
                email: editDoctor.email,
                consultationFee: editDoctor.consultationFee,
              }}
              loading={updateDoctor.isPending}
              errorMessage={errorMessage}
              onCancel={() => setEditDoctor(null)}
              onSubmit={handleUpdateDoctor}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!deleteDoctor}
        onClose={() => !deleteDoctorMutation.isPending && setDeleteDoctor(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Doctor</DialogTitle>
        <DialogContent dividers>
          <Typography>
            Are you sure you want to delete {deleteDoctor?.fullName}?
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={() => setDeleteDoctor(null)}>Cancel</Button>
            <Button color="error" variant="contained" onClick={handleDeleteDoctor}>
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}