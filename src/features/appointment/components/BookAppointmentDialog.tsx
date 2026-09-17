import { useState } from 'react';

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import {
  Controller,
  useForm,
} from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  bookAppointmentSchema,
  type BookAppointmentFormValues,
} from '../schemas/bookAppointmentSchema';

import { useAppointmentProviders } from '../hooks/useAppointmentProviders';
import { useAppointmentPatients } from '../hooks/useAppointmentPatients';
import { useBookAppointment } from '../hooks/useBookAppointment';

import type { AppointmentProvider } from '../types/appointmentProvider';
import type { AppointmentPatient } from '../types/appointmentPatient';

interface BookAppointmentDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function BookAppointmentDialog({
  open,
  onClose,
}: BookAppointmentDialogProps) {
  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<BookAppointmentFormValues>({
    resolver: zodResolver(
      bookAppointmentSchema,
    ),
    defaultValues: {
      providerId: '',
      patientId: '',
      appointmentDate: '',
      appointmentTime: '',
      comment: '',
    },
  });

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

  const bookAppointment =
    useBookAppointment();

  const isLoading =
    providersLoading || patientsLoading;

  const isSubmitting =
    bookAppointment.isPending;

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    setSuccessMessage(null);
    bookAppointment.reset();
    reset();
    onClose();
  };

  const onSubmit = async (
    data: BookAppointmentFormValues,
  ) => {
    setSuccessMessage(null);

    const appointmentDate =
      new Date(
        `${data.appointmentDate}T${data.appointmentTime}`,
      ).toISOString();

    try {
      const response =
        await bookAppointment.mutateAsync({
          appointmentDate,
          reasonForVisit:
            data.comment.trim(),
          status: 'SCHEDULED',
          patientUuid: data.patientId,
          doctorUuid: data.providerId,
        });

      setSuccessMessage(
        response?.message ??
          'Appointment created successfully.',
      );

      reset();
    } catch (error) {
      console.error(
        'Failed to book appointment',
        error,
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent:
              'space-between',
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.light',
                color: 'primary.main',
              }}
            >
              <EventAvailableIcon />
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                }}
              >
                Book Appointment
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Schedule a new patient
                appointment
              </Typography>
            </Box>
          </Stack>

          <Button
            onClick={handleClose}
            disabled={isSubmitting}
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
              p: 0,
              color: 'text.secondary',
              borderRadius: 2,
            }}
            aria-label="Close"
          >
            <CloseIcon />
          </Button>
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent
        sx={{
          px: 3,
          py: 3,
        }}
      >
        {successMessage ? (
          <Stack
            spacing={3}
            sx={{
              py: 5,
              alignItems: 'center',
            }}
          >
            <EventAvailableIcon
              sx={{
                fontSize: 64,
                color: 'success.main',
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              Appointment booked
              successfully
            </Typography>

            
          </Stack>
        ) : isLoading ? (
          <Box
            sx={{
              minHeight: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={2.5}>
            {providersError && (
              <Alert severity="error">
                Failed to load providers.
              </Alert>
            )}

            {patientsError && (
              <Alert severity="error">
                Failed to load patients.
              </Alert>
            )}

            {bookAppointment.isError && (
              <Alert severity="error">
                Failed to book appointment.
                Please try again.
              </Alert>
            )}

            {/* Provider */}

            <Controller
              name="providerId"
              control={control}
              render={({
                field,
                fieldState,
              }) => {
                const selectedProvider =
                  providers?.find(
                    (
                      provider: AppointmentProvider,
                    ) =>
                      provider.uuid ===
                      field.value,
                  ) ?? null;
                  

                return (
                  <Autocomplete
                    options={providers}
                    value={selectedProvider}
                    onChange={(
                      _,
                      value,
                    ) => {
                      field.onChange(
                        value?.uuid ?? '',
                      );
                    }}
                    isOptionEqualToValue={(
                      option,
                      value,
                    ) =>
                      option.uuid ===
                      value.uuid
                    }
                    getOptionLabel={(
                      option,
                    ) =>
                      `${option.fullName} — ${option.specialization}`
                    }
                    renderOption={(
                      props,
                      option,
                    ) => (
                      <Box
                        component="li"
                        {...props}
                        key={option.uuid}
                      >
                        <Stack spacing={0.25}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                            }}
                          >
                            {
                              option.fullName
                            }
                          </Typography>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {
                              option.specialization
                            }{' '}
                            • ₹
                            {
                              option.consultationFee
                            }
                          </Typography>
                        </Stack>
                      </Box>
                    )}
                    renderInput={(
                      params,
                    ) => (
                      <TextField
                        {...params}
                        label="Provider"
                        placeholder="Select provider"
                        error={
                          !!fieldState.error
                        }
                        helperText={
                          fieldState.error
                            ?.message
                        }
                      />
                    )}
                  />
                );
              }}
            />

            {/* Patient */}

            <Controller
              name="patientId"
              control={control}
              render={({
                field,
                fieldState,
              }) => {
                const selectedPatient =
                  patients.find(
                    (
                      patient: AppointmentPatient,
                    ) =>
                      patient.uuid ===
                      field.value,
                  ) ?? null;

                return (
                  <Autocomplete
                    options={patients}
                    value={selectedPatient}
                    onChange={(
                      _,
                      value,
                    ) => {
                      field.onChange(
                        value?.uuid ?? '',
                      );
                    }}
                    isOptionEqualToValue={(
                      option,
                      value,
                    ) =>
                      option.uuid ===
                      value.uuid
                    }
                    getOptionLabel={(
                      option,
                    ) =>
                      option.fullName
                    }
                    renderOption={(
                      props,
                      option,
                    ) => (
                      <Box
                        component="li"
                        {...props}
                        key={option.uuid}
                      >
                        <Stack spacing={0.25}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                            }}
                          >
                            {
                              option.fullName
                            }
                          </Typography>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            Age {option.age}{' '}
                            • {option.gender}{' '}
                            • {option.email}
                          </Typography>
                        </Stack>
                      </Box>
                    )}
                    renderInput={(
                      params,
                    ) => (
                      <TextField
                        {...params}
                        label="Patient"
                        placeholder="Select patient"
                        error={
                          !!fieldState.error
                        }
                        helperText={
                          fieldState.error
                            ?.message
                        }
                      />
                    )}
                  />
                );
              }}
            />

            {/* Date */}

            <Controller
              name="appointmentDate"
              control={control}
              render={({
                field,
                fieldState,
              }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="date"
                  label="Appointment Date"
                  error={
                    !!fieldState.error
                  }
                  helperText={
                    fieldState.error
                      ?.message
                  }
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                    input: {
                      startAdornment: (
                        <CalendarMonthIcon
                          sx={{
                            mr: 1,
                            color:
                              'text.secondary',
                          }}
                        />
                      ),
                    },
                  }}
                />
              )}
            />

            {/* Time */}

            <Controller
              name="appointmentTime"
              control={control}
              render={({
                field,
                fieldState,
              }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="time"
                  label="Appointment Time"
                  error={
                    !!fieldState.error
                  }
                  helperText={
                    fieldState.error
                      ?.message
                  }
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              )}
            />

            {/* Comment */}

            <Controller
              name="comment"
              control={control}
              render={({
                field,
                fieldState,
              }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={6}
                  label="Comment"
                  placeholder="Add reason for visit or any additional information..."
                  error={
                    !!fieldState.error
                  }
                  helperText={
                    fieldState.error
                      ?.message ??
                    `${field.value?.length ?? 0}/500`
                  }
                  slotProps={{
                    htmlInput: {
                      maxLength: 500,
                    },
                  }}
                />
              )}
            />
          </Stack>
        )}
      </DialogContent>

      <Divider />

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          gap: 1,
        }}
      >
        {successMessage ? (
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              minWidth: 140,
            }}
          >
            Done
          </Button>
        ) : (
          <>
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={isSubmitting}
              sx={{
                minWidth: 110,
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit(
                onSubmit,
              )}
              disabled={isSubmitting}
              startIcon={
                isSubmitting ? (
                  <CircularProgress
                    size={18}
                    color="inherit"
                  />
                ) : (
                  <EventAvailableIcon />
                )
              }
              sx={{
                minWidth: 160,
              }}
            >
              {isSubmitting
                ? 'Booking...'
                : 'Book Appointment'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}