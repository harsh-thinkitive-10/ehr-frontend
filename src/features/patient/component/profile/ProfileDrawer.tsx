import { useState } from 'react';

import {
  Alert,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import { usePatientProfile } from '../../hooks/usePatientProfile';
import { useUpdatePatientProfile } from '../../hooks/useUpdatePatientProfile';

import type {
  PatientProfileFormData,
} from '../../schemas/patientProfile.schema';

import ProfileSummary from './ProfileSummary';
import ProfileView from './ProfileView';
import ProfileForm from './ProfileForm';

import ProfileDrawerLayout from '../../../../component/ui/profile/ProfileDrawer';

interface PatientProfileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function PatientProfileDrawer({
  open,
  onClose,
}: PatientProfileDrawerProps) {
  const {
    data: patient,
    isLoading: loading,
    error,
  } = usePatientProfile();

  const {
    mutateAsync: updateProfile,
    isPending: isSaving,
    error: updateError,
    reset: resetUpdate,
  } = useUpdatePatientProfile();

  const [isEditing, setIsEditing] =
    useState(false);

  const [saveSuccess, setSaveSuccess] =
    useState('');

  const handleSave = async (
    data: PatientProfileFormData,
  ) => {
    try {
      setSaveSuccess('');

      await updateProfile({
        fullName: data.fullName.trim(),
        age: Number(data.age),
        gender: data.gender.trim(),
        phoneNumber: data.phoneNumber.trim(),
        email: data.email.trim(),
      });

      setSaveSuccess(
        'Profile updated successfully.',
      );

      setIsEditing(false);
    } catch {
      // Error is displayed using updateError.
    }
  };

  return (
    <ProfileDrawerLayout
      open={open}
      onClose={onClose}
    >
      {loading && (
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

      {patient && (
        <Stack spacing={3}>
          <ProfileSummary
            patient={patient}
          />

          <Divider />

          {saveSuccess && (
            <Alert severity="success">
              {saveSuccess}
            </Alert>
          )}

          {updateError && (
            <Alert severity="error">
              Unable to update your profile.
            </Alert>
          )}

          {!isEditing ? (
            <ProfileView
              patient={patient}
              onEdit={() => {
                resetUpdate();
                setSaveSuccess('');
                setIsEditing(true);
              }}
              onClose={onClose}
            />
          ) : (
            <ProfileForm
              patient={patient}
              onCancel={() =>
                setIsEditing(false)
              }
              onSave={handleSave}
              isSaving={isSaving}
            />
          )}
        </Stack>
      )}
    </ProfileDrawerLayout>
  );
}