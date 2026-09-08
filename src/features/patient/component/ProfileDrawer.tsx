import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    Drawer,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';

import { usePatientProfile } from '../hooks/usePatientProfile';
import { patientService } from '../services/patientService';

import {
    patientProfileSchema,
} from '../schemas/patientProfile.schema';

import type {
    PatientProfileFormData,
} from '../schemas/patientProfile.schema';


interface ProfileDrawerProps {
    open: boolean;
    onClose: () => void;
}

interface ProfileFieldProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

// Fixed set of gender options for the edit form.
// Adjust this list to match whatever your backend/schema accepts.
const GENDER_OPTIONS = [
    'Male',
    'Female',
    'Other',
    'Prefer not to say',
];

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
            }}
        >
            <Box
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    backgroundColor: '#eff6ff',
                    color: '#1976d2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                {icon}
            </Box>

            <Box>
                <Typography
                    sx={{
                        fontSize: '0.75rem',
                        color: '#64748b',
                        mb: 0.25,
                    }}
                >
                    {label}
                </Typography>

                <Typography
                    sx={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#172b4d',
                    }}
                >
                    {value}
                </Typography>
            </Box>
        </Stack>
    );
}

export default function ProfileDrawer({
    open,
    onClose,
}: ProfileDrawerProps) {
    const {
        patient,
        loading,
        error,
        setPatient,
    } = usePatientProfile();
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<PatientProfileFormData>({
        resolver: zodResolver(patientProfileSchema),
        defaultValues: {
            fullName: '',
            age: '',
            gender: '',
            phoneNumber: '',
            email: '',
        },
    });
    
    console.log(errors);
    console.log('isSubmitting:', isSubmitting);
    console.log(watch('fullName'), watch('age'), watch('gender'), watch('phoneNumber'), watch('email'));
    
    const [isEditing, setIsEditing] =
        useState(false);


    const [saveError, setSaveError] =
        useState('');

    const [saveSuccess, setSaveSuccess] =
        useState('');

    useEffect(() => {
        if (!patient) {
            return;
        }

        reset({
            fullName: patient.fullName,
            age: patient.age?.toString() ?? '',
            gender: patient.gender ?? '',
            phoneNumber: patient.phoneNumber,
            email: patient.email,
        });
    }, [patient, reset]);

    const handleEdit = () => {
        console.log('EDIT CLICKED');
        if (!patient) {
            return;
        }

        reset({
            fullName: patient.fullName,
            age: patient.age?.toString() ?? '',
            gender: patient.gender ?? '',
            phoneNumber: patient.phoneNumber,
            email: patient.email,
        });

        setSaveError('');
        setSaveSuccess('');
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (!patient) {
            return;
        }

        if (
            !window.confirm(
                'Discard your unsaved changes?',
            )
        ) {
            return;
        }

        reset({
            fullName: patient.fullName,
            age: patient.age?.toString() ?? '',
            gender: patient.gender ?? '',
            phoneNumber: patient.phoneNumber,
            email: patient.email,
        });

        setSaveError('');
        setSaveSuccess('');
        setIsEditing(false);
    };

    const handleClose = () => {
        if (isSubmitting) {
            return;
        }

        if (
            isEditing &&
            !window.confirm(
                'You have unsaved changes. Close anyway?',
            )
        ) {
            return;
        }

        setIsEditing(false);
        setSaveError('');
        setSaveSuccess('');

        onClose();
    };


    const handleSave = async (
        data: PatientProfileFormData,
    ) => {
        console.log('🔥 HANDLE SAVE CALLED', data);
        try {
            setSaveError('');
            setSaveSuccess('');

            const updatedPatient =
                await patientService.updateMyProfile({
                    fullName: data.fullName.trim(),
                    age: Number(data.age),
                    gender: data.gender.trim(),
                    phoneNumber: data.phoneNumber.trim(),
                    email: data.email.trim(),
                });

            setPatient(updatedPatient);

            setSaveSuccess(
                'Profile updated successfully.',
            );

            setIsEditing(false);
        } catch (error) {
            console.error(
                'Failed to update patient profile:',
                error,
            );

            setSaveError(
                'Unable to update your profile.',
            );
        }
    };

    const avatarInitial = patient?.fullName
        ?.trim()
        .charAt(0)
        .toUpperCase() || '?';

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            slotProps={{
                paper: {
                    sx: {
                        width: {
                            xs: '100%',
                            sm: 430,
                        },
                        maxWidth: '100%',
                    },
                },
            }}
        >
            {/* Header */}

            <Box
                sx={{
                    px: 3,
                    py: 2.5,
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
                        onClick={handleClose}
                        disabled={isSubmitting}
                        aria-label="Close profile"
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </Box>

            <Divider />

            {/* Content */}
            <form onSubmit={(event) => {
                console.log('🔥 FORM SUBMITTED');
                void handleSubmit(handleSave)(event);
            }}>
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        px: 3,
                        py: 3,
                    }}
                >
                    {loading && (
                        <Stack
                            sx={{
                                minHeight: 300,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <CircularProgress />
                        </Stack>
                    )}

                    {!loading && error && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )}

                    {!loading && patient && (
                        <Stack spacing={3}>
                            {/* Profile summary */}

                            <Stack
                                spacing={1.5}
                                sx={{
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 72,
                                        height: 72,
                                        backgroundColor: '#1976d2',
                                        fontSize: '1.5rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    {avatarInitial}
                                </Avatar>

                                <Box
                                    sx={{
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '1.1rem',
                                            fontWeight: 700,
                                            color: '#172b4d',
                                        }}
                                    >
                                        {patient.fullName}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: '0.85rem',
                                            color: '#64748b',
                                        }}
                                    >
                                        Patient Account
                                    </Typography>
                                </Box>
                            </Stack>

                            <Divider />

                            {saveSuccess && (
                                <Alert severity="success">
                                    {saveSuccess}
                                </Alert>
                            )}

                            {saveError && (
                                <Alert severity="error">
                                    {saveError}
                                </Alert>
                            )}

                            {/* Full Name */}

                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    {...register('fullName')}
                                    error={Boolean(errors.fullName)}
                                    helperText={errors.fullName?.message}
                                    disabled={isSubmitting}
                                />
                            ) : (
                                <ProfileField
                                    icon={<PersonOutlinedIcon />}
                                    label="Full Name"
                                    value={patient.fullName}
                                />
                            )}

                            {/* Age */}

                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    label="Age"
                                    type="number"
                                    {...register('age')}
                                    error={Boolean(errors.age)}
                                    helperText={errors.age?.message}
                                    disabled={isSubmitting}
                                />
                            ) : (
                                <ProfileField
                                    icon={<CakeOutlinedIcon />}
                                    label="Age"
                                    value={
                                        patient.age != null
                                            ? String(patient.age)
                                            : '—'
                                    }
                                />
                            )}

                            {/* Gender */}

                            {isEditing ? (
                                <FormControl
                                    fullWidth
                                    error={Boolean(errors.gender)}
                                    disabled={isSubmitting}
                                >
                                    <InputLabel id="gender-select-label">
                                        Gender
                                    </InputLabel>
                                    <Select
                                        labelId="gender-select-label"
                                        label="Gender"
                                        {...register('gender')}
                                        value={watch('gender')}
                                        onChange={(event) => {
                                            setValue(
                                                'gender',
                                                event.target.value,
                                                {
                                                    shouldDirty: true,
                                                    shouldValidate: true,
                                                },
                                            );
                                        }}
                                    >
                                        {GENDER_OPTIONS.map((option) => (
                                            <MenuItem
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                    {errors.gender?.message && (
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: '#d32f2f',
                                                mt: 0.5,
                                                ml: 1.75,
                                            }}
                                        >
                                            {errors.gender.message}
                                        </Typography>
                                    )}
                                </FormControl>
                            ) : (
                                <ProfileField
                                    icon={<WcOutlinedIcon />}
                                    label="Gender"
                                    value={patient.gender || '—'}
                                />
                            )}

                            {/* Phone */}

                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    {...register('phoneNumber')}
                                    error={Boolean(errors.phoneNumber)}
                                    helperText={errors.phoneNumber?.message}
                                    disabled={isSubmitting}
                                />
                            ) : (
                                <ProfileField
                                    icon={<PhoneOutlinedIcon />}
                                    label="Phone Number"
                                    value={patient.phoneNumber}
                                />
                            )}

                            {/* Email */}

                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    {...register('email')}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                    disabled={isSubmitting}
                                />
                            ) : (
                                <ProfileField
                                    icon={<EmailOutlinedIcon />}
                                    label="Email"
                                    value={patient.email}
                                />
                            )}
                        </Stack>
                    )}
                </Box>

                {/* Footer */}

                {!loading && patient && (
                    <>
                        <Divider />

                        <Box
                            sx={{
                                px: 3,
                                py: 2,
                            }}
                        >
                            {!isEditing ? (
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                    sx={{
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleClose();
                                        }}
                                    >
                                        Close
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="contained"
                                        startIcon={
                                            <EditOutlinedIcon />
                                        }
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleEdit();
                                        }}
                                    >
                                        Edit Profile
                                    </Button>
                                </Stack>
                            ) : (
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                    sx={{
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        onClick={handleCancel}
                                        disabled={isSubmitting}

                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={isSubmitting}
                                        startIcon={
                                            isSubmitting ? (
                                                <CircularProgress
                                                    size={18}
                                                    color="inherit"
                                                />
                                            ) : undefined
                                        }
                                    >
                                        {isSubmitting ? 'Saving...' : 'Save'}
                                    </Button>
                                </Stack>
                            )}
                        </Box>
                    </>
                )}
            </form>
        </Drawer>
    );
}