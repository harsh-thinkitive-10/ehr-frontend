import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from '@mui/material';

import {
    Controller,
    useForm,
} from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
    patientProfileSchema,
} from '../../schemas/patientProfile.schema';

import type {
    PatientProfileFormData,
} from '../../schemas/patientProfile.schema';

import type { Patient } from '../../types/patient.types';

const GENDER_OPTIONS = [
    {
        value: 'MALE',
        label: 'Male',
    },
    {
        value: 'FEMALE',
        label: 'Female',
    },
    {
        value: 'OTHER',
        label: 'Other',
    },
    {
        value: 'PREFER_NOT_TO_SAY',
        label: 'Prefer not to say',
    },
];

interface ProfileFormProps {
    patient: Patient;
    onCancel: () => void;
    onSave: (
        data: PatientProfileFormData,
    ) => Promise<void>;
    isSaving: boolean;
}

export default function ProfileForm({
    patient,
    onCancel,
    onSave,
    isSaving,
}: ProfileFormProps) {
    const {
        register,
        control,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<PatientProfileFormData>({
        resolver: zodResolver(
            patientProfileSchema,
        ),
        defaultValues: {
            fullName: patient.fullName,
            age: patient.age?.toString() ?? '',
            gender: patient.gender ?? '',
            phoneNumber: patient.phoneNumber,
            email: patient.email,
        },
    });

    return (
        <form noValidate onSubmit={handleSubmit(onSave)}>
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    label="Full Name"
                    {...register('fullName')}
                    error={Boolean(errors.fullName)}
                    helperText={
                        errors.fullName?.message
                    }
                    disabled={isSaving}
                />

                <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    {...register('age')}
                    error={Boolean(errors.age)}
                    helperText={
                        errors.age?.message
                    }
                    disabled={isSaving}
                    slotProps={{
                        htmlInput: {
                            step: 1,
                            min: 1,
                        },
                    }}
                />

                <Controller
                    name="gender"
                    control={control}
                    render={({
                        field,
                        fieldState,
                    }) => (
                        <FormControl
                            fullWidth
                            error={
                                Boolean(
                                    fieldState.error,
                                )
                            }
                            disabled={isSaving}
                        >
                            <InputLabel>
                                Gender
                            </InputLabel>

                            <Select
                                {...field}
                                label="Gender"
                            >
                                {GENDER_OPTIONS.map(
                                    (option) => (
                                        <MenuItem
                                            key={
                                                option.value
                                            }
                                            value={
                                                option.value
                                            }
                                        >
                                            {
                                                option.label
                                            }
                                        </MenuItem>
                                    ),
                                )}
                            </Select>

                            <FormHelperText>
                                {
                                    fieldState.error
                                        ?.message
                                }
                            </FormHelperText>
                        </FormControl>
                    )}
                />

                <TextField
                    fullWidth
                    label="Phone Number"
                    {...register('phoneNumber')}
                    error={Boolean(errors.phoneNumber)}
                    helperText={
                        errors.phoneNumber?.message
                    }
                    disabled={isSaving}
                />

                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={Boolean(errors.email)}
                    helperText={
                        errors.email?.message
                    }
                    disabled={isSaving}
                />

                <Stack
                    direction="row"
                    spacing={1.5}
                >
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={onCancel}
                        disabled={isSaving}
                        sx={{
                            flex: 1,
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSaving}
                        sx={{
                            flex: 1,
                        }}
                        startIcon={
                            isSaving ? (
                                <CircularProgress
                                    size={20}
                                    color="inherit"
                                />
                            ) : undefined
                        }
                    >
                        {isSaving
                            ? 'Saving...'
                            : 'Save'}
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
}