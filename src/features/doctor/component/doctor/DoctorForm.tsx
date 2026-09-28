import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, InputAdornment, Stack } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

import Input from '../../../../component/ui/input/Input';
import { doctorSchema, type DoctorFormValues } from '../../schemas/doctor.schema';

interface DoctorFormProps {
  mode?: 'create' | 'edit';
  initialValues?: Partial<DoctorFormValues>;
  loading?: boolean;
  errorMessage?: string | null;
  onSubmit: (values: DoctorFormValues) => Promise<void>;
  onCancel?: () => void;
}

export default function DoctorForm({
  mode = 'create',
  initialValues,
  loading = false,
  errorMessage,
  onSubmit,
  onCancel,
}: DoctorFormProps) {
  const { control, handleSubmit, reset } = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      specialization: '',
      phoneNumber: '',
      email: '',
      consultationFee: 0,
      ...initialValues,
    },
  });

  useEffect(() => {
    if (initialValues) reset({ ...initialValues });
  }, [initialValues, reset]);

  const edit = mode === 'edit';

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            name="firstName"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="First Name *"
                placeholder="Enter first name"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Last Name *"
                placeholder="Enter last name"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Stack>

        <Controller
          name="specialization"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Specialization *"
              placeholder="Enter specialization (e.g., Cardiologist)"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Phone Number *"
                placeholder="Enter phone number"
                inputMode="numeric"
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneOutlinedIcon />
                  </InputAdornment>
                }
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Email *"
                type="email"
                placeholder="Enter email address"
                startAdornment={
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                }
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Stack>

        <Controller
          name="consultationFee"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Consultation Fee *"
              type="number"
              placeholder="Enter consultation fee"
              value={field.value ?? ''}
              onChange={(event) =>
                field.onChange(event.target.value === '' ? 0 : Number(event.target.value))
              }
              startAdornment={
                <InputAdornment position="start">
                  <CurrencyRupeeOutlinedIcon />
                </InputAdornment>
              }
              inputProps={{ min: 0, step: 0.01 }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 1 }}>
          <Button type="button" variant="outlined" onClick={onCancel} disabled={loading} size="large">
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={<PersonAddOutlinedIcon />}
            size="large"
          >
            {loading
              ? edit
                ? 'Updating Doctor...'
                : 'Adding Doctor...'
              : edit
                ? 'Update Doctor'
                : 'Add Doctor'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}