import { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import DoctorList from '../../doctor/component/doctor/DoctorList';

export default function ManagementPage() {
  const [addDoctorOpen, setAddDoctorOpen] =
    useState(false);

  return (
    <Box>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

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
            sx={{
              mb: 0.5,
            }}
          >
            Management
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Manage doctors, providers and
            locations.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            setAddDoctorOpen(true)
          }
        >
          Add Doctor
        </Button>
      </Stack>

      {/* =====================================================
          DOCTORS
          ===================================================== */}

      <Stack spacing={2}>
        <Typography variant="h6">
          Doctors
        </Typography>

        <DoctorList />
      </Stack>

      {/* =====================================================
          ADD DOCTOR
          ===================================================== */}

      <Dialog
        open={addDoctorOpen}
        onClose={() =>
          setAddDoctorOpen(false)
        }
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Add Doctor
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Doctor registration form will be
              added here.
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}