import {
  Controller,
  useForm,
} from 'react-hook-form';

import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  doctorSchema,
  type DoctorFormValues,
} from '../../schemas/doctor.schema';

import type {
  RegisterDoctorRequest,
} from '../../types/doctor';

interface DoctorFormProps {
  loading?: boolean;
  errorMessage?: string | null;

  onSubmit: (
    values: RegisterDoctorRequest,
  ) => Promise<void>;
}

export default function DoctorForm({
  loading = false,
  errorMessage,
  onSubmit,
}: DoctorFormProps) {
  const {
    control,
    handleSubmit,
  } = useForm<DoctorFormValues>({
    resolver:
      zodResolver(doctorSchema),

    defaultValues: {
      firstName: '',
      lastName: '',
      specialization: '',
      phoneNumber: '',
      email: '',
      consultationFee: 0,
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={2.5}>
        {errorMessage && (
          <Alert severity="error">
            {errorMessage}
          </Alert>
        )}

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={2}
        >
          <Controller
            name="firstName"
            control={control}
            render={({
              field,
              fieldState,
            }) => (
              <TextField
                {...field}
                label="First Name"
                fullWidth
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

          <Controller
            name="lastName"
            control={control}
            render={({
              field,
              fieldState,
            }) => (
              <TextField
                {...field}
                label="Last Name"
                fullWidth
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
        </Stack>

        <Controller
          name="specialization"
          control={control}
          render={({
            field,
            fieldState,
          }) => (
            <TextField
              {...field}
              label="Specialization"
              fullWidth
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

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={2}
        >
          <Controller
            name="phoneNumber"
            control={control}
            render={({
              field,
              fieldState,
            }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                inputMode="numeric"
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

          <Controller
            name="email"
            control={control}
            render={({
              field,
              fieldState,
            }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
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
        </Stack>

        <Controller
          name="consultationFee"
          control={control}
          render={({
            field,
            fieldState,
          }) => (
            <TextField
              label="Consultation Fee"
              type="number"
              fullWidth
              value={
                field.value ?? ''
              }
              onChange={(event) => {
                const value =
                  event.target.value;

                field.onChange(
                  value === ''
                    ? 0
                    : Number(value),
                );
              }}
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: 0.01,
                },
              }}
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

        <Box
          sx={{
            display: 'flex',
            justifyContent:
              'flex-end',
            pt: 1,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading
              ? 'Adding Doctor...'
              : 'Add Doctor'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}