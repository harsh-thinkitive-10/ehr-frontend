import { useState } from 'react';

import {
    Alert,
    Box,
    Divider,
    Drawer,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { usePatientProfile } from '../../hooks/usePatientProfile';
import { useUpdatePatientProfile } from '../../hooks/useUpdatePatientProfile';

import type {
    PatientProfileFormData,
} from '../../schemas/patientProfile.schema';

import ProfileSummary from './ProfileSummary';
import ProfileView from './ProfileView';
import ProfileForm from './ProfileForm';

interface ProfileDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function ProfileDrawer({
    open,
    onClose,
}: ProfileDrawerProps) {
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
        } catch (error) {
            console.error(
                'Failed to update patient profile:',
                error,
            );
        }
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 400,
                },
            }}
        >
            {/* Header */}

            <Box
                sx={{
                    px: 3,
                    py: 1,
                }}
            >
                <Stack
                    direction="row"
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: '#172b4d',
                        }}
                    >
                        My Profile
                    </Typography>

                    <IconButton
                        onClick={onClose}
                        aria-label="Close profile"
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </Box>

            <Divider />

            <Box
                sx={{
                    px: 3,
                    py: 3,
                }}
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
            </Box>
        </Drawer>
    );
}