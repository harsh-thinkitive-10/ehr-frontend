import { useState } from 'react';

import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import ProfileDrawerLayout from '../../../../component/ui/profile/ProfileDrawer';
import ProfileField from '../../../../component/ui/profile/ProfileField';

import { useDoctorProfile } from '../../hooks/useDoctorProfile';
import { useUpdateDoctorProfile } from '../../hooks/useUpdateDoctorProfile';

import type { DoctorProfileFormData } from '../../schemas/doctorProfile.schema';

import DoctorProfileForm from './ProfileForm';

interface DoctorProfileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function DoctorProfileDrawer({
  open,
  onClose,
}: DoctorProfileDrawerProps) {
  const {
    data: doctor,
    isLoading,
    error,
  } = useDoctorProfile();

  const {
    mutateAsync: updateProfile,
    isPending: isSaving,
    error: updateError,
    reset: resetUpdate,
  } = useUpdateDoctorProfile();

  const [isEditing, setIsEditing] =
    useState(false);

  const [saveSuccess, setSaveSuccess] =
    useState('');

  const avatarLetter =
    doctor?.fullName
      ?.charAt(0)
      .toUpperCase() ?? 'D';

  const handleSave = async (
    data: DoctorProfileFormData,
  ) => {
    try {
      setSaveSuccess('');
      resetUpdate();

      await updateProfile({
        fullName: data.fullName.trim(),
        specialization:
          data.specialization.trim(),
        phoneNumber:
          data.phoneNumber.trim(),
        email: data.email.trim(),
        consultationFee:
          data.consultationFee,
      });

      setSaveSuccess(
        'Profile updated successfully.',
      );

      setIsEditing(false);
    } catch {
      // Error is displayed using updateError.
    }
  };

  const handleEdit = () => {
    resetUpdate();
    setSaveSuccess('');
    setIsEditing(true);
  };

  const handleCancel = () => {
    resetUpdate();
    setSaveSuccess('');
    setIsEditing(false);
  };

  return (
    <ProfileDrawerLayout
      open={open}
      onClose={onClose}
    >
      {isLoading && (
        <Typography>
          Loading...
        </Typography>
      )}

      {error && (
        <Alert severity="error">
          {error instanceof Error
            ? error.message
            : 'Unable to load your profile.'}
        </Alert>
      )}

      {doctor && (
        <Stack spacing={3}>
          {!isEditing ? (
            <>
              {/* Profile Header */}

              <Stack
                spacing={1}
                sx={{
                  alignItems: 'center',
                  textAlign: 'center',
                  pt: 1,
                }}
              >
                <Avatar
                  sx={{
                    width: 90,
                    height: 90,
                    backgroundColor:
                      'primary.main',
                    fontSize: '2rem',
                    fontWeight: 600,
                  }}
                >
                  {avatarLetter}
                </Avatar>

                <Stack spacing={0.25}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: 'text.primary',
                    }}
                  >
                    {doctor.fullName}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color:
                        'text.secondary',
                    }}
                  >
                    Doctor Account
                  </Typography>
                </Stack>
              </Stack>

              <Divider />

              {/* Success Message */}

              {saveSuccess && (
                <Alert severity="success">
                  {saveSuccess}
                </Alert>
              )}

              {/* Profile Information */}

              <Stack spacing={3}>
                <ProfileField
                  icon={
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          'center',
                        backgroundColor:
                          'primary.light',
                        color:
                          'primary.main',
                        flexShrink: 0,
                      }}
                    >
                      <PersonIcon />
                    </Box>
                  }
                  label="Full Name"
                  value={doctor.fullName}
                />

                <ProfileField
                  icon={
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          'center',
                        backgroundColor:
                          'primary.light',
                        color:
                          'primary.main',
                        flexShrink: 0,
                      }}
                    >
                      <LocalHospitalIcon />
                    </Box>
                  }
                  label="Specialization"
                  value={
                    doctor.specialization
                  }
                />

                <ProfileField
                  icon={
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          'center',
                        backgroundColor:
                          'primary.light',
                        color:
                          'primary.main',
                        flexShrink: 0,
                      }}
                    >
                      <PhoneIcon />
                    </Box>
                  }
                  label="Phone Number"
                  value={
                    doctor.phoneNumber
                  }
                />

                <ProfileField
                  icon={
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          'center',
                        backgroundColor:
                          'primary.light',
                        color:
                          'primary.main',
                        flexShrink: 0,
                      }}
                    >
                      <EmailIcon />
                    </Box>
                  }
                  label="Email"
                  value={doctor.email}
                />

                <ProfileField
                  icon={
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          'center',
                        backgroundColor:
                          'primary.light',
                        color:
                          'primary.main',
                        flexShrink: 0,
                      }}
                    >
                      <CurrencyRupeeIcon />
                    </Box>
                  }
                  label="Consultation Fee"
                  value={`₹${doctor.consultationFee}`}
                />
              </Stack>

              {/* Actions */}

              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  pt: 0.5,
                }}
              >
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<CloseIcon />}
                  onClick={onClose}
                  sx={{
                    minHeight: 52,
                    fontWeight: 600,
                  }}
                >
                  Close
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  sx={{
                    minHeight: 52,
                    fontWeight: 600,
                  }}
                >
                  Edit Profile
                </Button>
              </Stack>
            </>
          ) : (
            <DoctorProfileForm
              doctor={doctor}
              onCancel={handleCancel}
              onSave={handleSave}
              isSaving={isSaving}
            />
          )}

          {/* Update Error */}

          {updateError && (
            <Alert severity="error">
              {updateError instanceof Error
                ? updateError.message
                : 'Unable to update your profile.'}
            </Alert>
          )}
        </Stack>
      )}
    </ProfileDrawerLayout>
  );
}