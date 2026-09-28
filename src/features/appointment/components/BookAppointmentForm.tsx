import {
    Alert,
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    bookAppointmentSchema,
    type BookAppointmentFormValues,
} from '../schemas/bookAppointmentSchema';
import { useAppointmentProviders } from '../hooks/useAppointmentProviders';
import { useAppointmentPatients } from '../hooks/useAppointmentPatients';
import { useAppointmentLocations } from '../hooks/useAppointmentLocations';
import { useAvailableSlots } from '../hooks/useAvailableSlots';
import { useBookAppointment } from '../hooks/useBookAppointment';

import type { AppointmentProvider } from '../types/appointmentProvider';
import type { AppointmentPatient } from '../types/appointmentPatient';
import type { Location } from '../../location/types/location';

interface BookAppointmentFormProps {
    open: boolean;
    onSuccess: (message: string) => void;
}

export default function BookAppointmentForm({ onSuccess }: BookAppointmentFormProps) {
    const { control, handleSubmit, reset, setValue, setError, clearErrors} = useForm<BookAppointmentFormValues>({
        resolver: zodResolver(bookAppointmentSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            providerId: '',
            patientId: '',
            appointmentDate: '',
            appointmentTime: '',
            comment: '',
            locationId: '',
        },
    });

    const providerId = useWatch({ control, name: 'providerId' });
    const locationId = useWatch({ control, name: 'locationId' });
    const appointmentDate = useWatch({ control, name: 'appointmentDate' });
    const selectedSlot = useWatch({ control, name: 'appointmentTime' });


    const {
        data: providers = [],
        isLoading: providersLoading,
        isError: providersError,
    } = useAppointmentProviders();

    const {
        data: patients = [],
        isLoading: patientsLoading,
        isError: patientsError,
    } = useAppointmentPatients();

    const {
        data: locations = [],
        isLoading: locationsLoading,
        isError: locationsError,
    } = useAppointmentLocations();

    const slotDate = appointmentDate ? `${appointmentDate}T00:00:00Z` : '';

    const {
        data: availableSlots = [],
        isLoading: slotsLoading,
        isError: slotsError,
        refetch: refetchSlots,
    } = useAvailableSlots(providerId, locationId, slotDate);

    const bookAppointment = useBookAppointment();

    const isLoading = providersLoading || patientsLoading || locationsLoading;
    const isSubmitting = bookAppointment.isPending;

    const onSubmit = async (data: BookAppointmentFormValues) => {
        try {
            const response = await bookAppointment.mutateAsync({
                appointmentDate: data.appointmentTime,
                reasonForVisit: data.comment.trim(),
                patientUuid: data.patientId,
                doctorUuid: data.providerId,
                locationUuid: data.locationId,
            });

            reset();
            onSuccess(response?.message ?? 'Appointment created successfully.');
        } catch (error) {
            console.error('Failed to book appointment:', error);
            setValue('appointmentTime', '', { shouldValidate: true });
            await refetchSlots();
            setError('appointmentTime', { type: 'server', message: 'Failed to book appointment. Please try again.' });
        }
    };

    const formatSlotTime = (value: string) =>
        new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'UTC',
        }).format(new Date(value));

    if (isLoading) {
        return (
            <Box sx={{ minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Stack spacing={2.5}>
            {providersError && <Alert severity="error">Failed to load providers.</Alert>}
            {patientsError && <Alert severity="error">Failed to load patients.</Alert>}
            {locationsError && <Alert severity="error">Failed to load locations.</Alert>}

            <Controller
                name="providerId"
                control={control}
                render={({ field, fieldState }) => {
                    const selectedProvider =
                        providers.find((provider: AppointmentProvider) => provider.uuid === field.value) ?? null;

                    return (
                        <Autocomplete
                            options={providers}
                            value={selectedProvider}
                            onChange={(_, value) => {
                                field.onChange(value?.uuid ?? '');
                                setValue('appointmentTime', '');
                            }}
                            isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                            getOptionLabel={(option) => `${option.fullName} — ${option.specialization}`}
                            renderOption={(props, option) => (
                                <Box component="li" {...props} key={option.uuid}>
                                    <Stack spacing={0.25}>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {option.fullName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {option.specialization}
                                        </Typography>
                                    </Stack>
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Provider"
                                    placeholder="Select provider"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    );
                }}
            />

            {/* {errors.appointmentTime?.message && (
                <Typography
                    variant="caption" color="error" sx={{ display: 'block', mt: 0.75, textAlign: 'center' }}>
                    {errors.appointmentTime?.message}
                </Typography>
            )} */}

            <Controller
                name="patientId"
                control={control}
                render={({ field, fieldState }) => {
                    const selectedPatient =
                        patients.find((patient: AppointmentPatient) => patient.uuid === field.value) ?? null;

                    return (
                        <Autocomplete
                            options={patients}
                            value={selectedPatient}
                            onChange={(_, value) => field.onChange(value?.uuid ?? '')}
                            isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                            getOptionLabel={(option) => option.fullName}
                            renderOption={(props, option) => (
                                <Box component="li" {...props} key={option.uuid}>
                                    <Stack spacing={0.25}>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {option.fullName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Age {option.age} • {option.gender} • {option.email}
                                        </Typography>
                                    </Stack>
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Patient"
                                    placeholder="Select patient"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    );
                }}
            />

            <Controller
                name="locationId"
                control={control}
                render={({ field, fieldState }) => {
                    const selectedLocation =
                        locations.find((location: Location) => location.uuid === field.value) ?? null;

                    return (
                        <Autocomplete
                            options={locations}
                            value={selectedLocation}
                            onChange={(_, value) => {
                                field.onChange(value?.uuid ?? '');
                                setValue('appointmentTime', '');
                            }}
                            isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                            getOptionLabel={(option) => `${option.name} — ${option.code}`}
                            renderOption={(props, option) => (
                                <Box component="li" {...props} key={option.uuid}>
                                    <Stack spacing={0.25}>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {option.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {option.code} • {option.billingAddress.city}, {option.billingAddress.state}
                                        </Typography>
                                    </Stack>
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Location"
                                    placeholder="Select location"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    );
                }}
            />

            <Controller
                name="appointmentDate"
                control={control}
                render={({ field, fieldState }) => (
                    <DatePicker
                        value={field.value ? dayjs(field.value) : null}
                        onChange={async (value) => {
                            const date = value ? value.format('YYYY-MM-DD') : '';
                            field.onChange(date);
                            setValue('appointmentTime', '', { shouldValidate: true });
                            clearErrors('appointmentTime');

                            if (date && providerId && locationId) {
                                await refetchSlots();
                            }
                        }}
                        disablePast
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                error: !!fieldState.error,
                                helperText: fieldState.error?.message,
                            },
                        }}
                    />
                )}
            />

            {providerId && locationId && appointmentDate && (
                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Available Time Slots
                    </Typography>

                    {slotsLoading ? (
                        <Box sx={{ py: 3, display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress size={24} />
                        </Box>
                    ) : slotsError ? (
                        <Alert severity="error">Failed to load available slots.</Alert>
                    ) : availableSlots.length === 0 ? (
                        <Alert severity="info">No available slots for this date.</Alert>
                    ) : (
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                            {availableSlots.map((slot) => {
                                const selected = selectedSlot === slot.startTime;

                                return (
                                    <Button
                                        key={slot.startTime}
                                        variant={selected ? 'contained' : 'outlined'}
                                        startIcon={<AccessTimeIcon />}
                                        onClick={() => {
                                            clearErrors('appointmentTime');
                                            setValue('appointmentTime', slot.startTime);
                                        }}
                                        sx={{ minHeight: 44 }}
                                    >
                                        {formatSlotTime(slot.startTime)} - {formatSlotTime(slot.endTime)}
                                    </Button>
                                );
                            })}
                        </Box>
                    )}
                </Box>
            )}

            <Controller
                name="comment"
                control={control}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        fullWidth
                        multiline
                        minRows={4}
                        maxRows={6}
                        label="Comment"
                        placeholder="Add reason for visit or any additional information..."
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message ?? `${field.value?.length ?? 0}/500`}
                        slotProps={{ htmlInput: { maxLength: 500 } }}
                    />
                )}
            />

            <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end', pt: 1 }}>
                <Button
                    type="button"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : <EventAvailableIcon />}
                >
                    {isSubmitting ? 'Booking...' : 'Book Appointment'}
                </Button>
            </Stack>
        </Stack>
    );
}