import { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';

import DoctorList from '../../doctor/component/doctor/DoctorList';
import DoctorForm from '../../doctor/component/doctor/DoctorForm';

import { useRegisterDoctor } from '../../doctor/hooks/useRegisterDoctor';
import { doctorKeys } from '../../doctor/hooks/useDoctors';

import { useQueryClient } from '@tanstack/react-query';

import type {
  RegisterDoctorRequest,
} from '../../doctor/types/doctor';

export default function ManagementPage() {
  const queryClient =
    useQueryClient();

  const [activeTab, setActiveTab] =
    useState(0);

  const [addDoctorOpen, setAddDoctorOpen] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const registerDoctor =
    useRegisterDoctor();

  const handleRegisterDoctor =
    async (
      values: RegisterDoctorRequest,
    ) => {
      try {
        setErrorMessage(null);

        await registerDoctor.mutateAsync(
          values,
        );

        await queryClient.invalidateQueries({
          queryKey: doctorKeys.all,
        });

        setAddDoctorOpen(false);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Failed to add doctor.',
        );
      }
    };

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: number,
  ) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      {/* <Stack
        spacing={0.5}
        sx={{
          mb: 2,
        }}
      >
        <Typography variant="h5">
          Management
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Manage providers, locations and
          other master data
        </Typography>
      </Stack> */}

      {/* =====================================================
          MANAGEMENT TABS
          ===================================================== */}

      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mb: 1,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            minHeight: 48,

            '& .MuiTab-root': {
              minHeight: 48,
              minWidth: 150,
              textTransform: 'none',
              fontWeight: 600,
            },
          }}
        >
          <Tab
            icon={
              <MedicalServicesOutlinedIcon />
            }
            iconPosition="start"
            label="Providers"
          />

          <Tab
            icon={
              <LocationOnOutlinedIcon />
            }
            iconPosition="start"
            label="Locations"
          />
        </Tabs>
      </Box>

      {/* =====================================================
          PROVIDERS
          ===================================================== */}

      {activeTab === 0 && (
        <Box
          sx={{
            mt: 1,
            backgroundColor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
            p: {
              xs: 2,
              md: 3,
            },
          }}
        >
          {/* Provider header */}

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
              justifyContent:
                'space-between',
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  mb: 0.5,
                }}
              >
                Providers
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                View and manage all
                healthcare providers
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setErrorMessage(null);
                setAddDoctorOpen(true);
              }}
            >
              Add Doctor
            </Button>
          </Stack>

          {/* Doctor list */}

          <DoctorList />
        </Box>
      )}

      {/* =====================================================
          LOCATIONS
          ===================================================== */}

      {activeTab === 1 && (
        <Box
          sx={{
            mt: 1,
            minHeight: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              'background.paper',
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <Stack
            spacing={1}
            sx={{
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <LocationOnOutlinedIcon
              sx={{
                fontSize: 40,
                color: 'text.secondary',
              }}
            />

            <Typography variant="h6">
              Locations
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Location management will be
              added next.
            </Typography>
          </Stack>
        </Box>
      )}

      {/* =====================================================
          ADD DOCTOR DIALOG
          ===================================================== */}

      <Dialog
        open={addDoctorOpen}
        onClose={() => {
          if (
            !registerDoctor.isPending
          ) {
            setErrorMessage(null);
            setAddDoctorOpen(false);
          }
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Add Doctor
        </DialogTitle>

        <DialogContent dividers>
          <DoctorForm
            loading={
              registerDoctor.isPending
            }
            errorMessage={
              errorMessage
            }
            onSubmit={
              handleRegisterDoctor
            }
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}