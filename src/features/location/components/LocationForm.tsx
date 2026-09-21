import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';

import { locationSchema, type LocationFormValues } from '../schemas/location.schema';

interface LocationFormProps {
  initialValues?: Partial<LocationFormValues>;
  loading?: boolean;
  errorMessage?: string | null;
  onCancel: () => void;
  onSubmit: (values: LocationFormValues) => void | Promise<void>;
}

const defaultValues: LocationFormValues = {
  code: '',
  name: '',
  phone: '',
  email: '',
  npi: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  country: 'India',
  zipcode: '',
};

export default function LocationForm({ initialValues, loading = false, errorMessage, onCancel, onSubmit }: LocationFormProps) {
  const { control, handleSubmit, reset } = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: { ...defaultValues, ...initialValues },
  });

  useEffect(() => {
    reset({ ...defaultValues, ...initialValues });
  }, [initialValues, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Location Information
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            name="code"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} fullWidth label="Location Code" placeholder="LOC001" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />

          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} fullWidth label="Location Name" placeholder="Main Clinic" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} fullWidth label="Phone" placeholder="9876543210" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} fullWidth label="Email" placeholder="mainclinic@example.com" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />
        </Stack>

        <Controller
          name="npi"
          control={control}
          render={({ field, fieldState }) => (
            <TextField {...field} fullWidth label="NPI" placeholder="1234567890" error={!!fieldState.error} helperText={fieldState.error?.message} />
          )}
        />

        <Divider />

        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Billing Address
        </Typography>

        <Controller
          name="line1"
          control={control}
          render={({ field, fieldState }) => (
            <TextField {...field} fullWidth label="Address Line 1" placeholder="123 MG Road" error={!!fieldState.error} helperText={fieldState.error?.message} />
          )}
        />

        <Controller
          name="line2"
          control={control}
          render={({ field, fieldState }) => (
            <TextField {...field} fullWidth label="Address Line 2" placeholder="Near City Center" error={!!fieldState.error} helperText={fieldState.error?.message} />
          )}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} fullWidth label="City" placeholder="Solapur" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} fullWidth label="State" placeholder="Maharashtra" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            name="country"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} fullWidth label="Country" placeholder="India" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />

          <Controller
            name="zipcode"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} fullWidth label="Zipcode" placeholder="413001" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />
        </Stack>
      </Stack>

      <Divider sx={{ mt: 3 }} />

      <Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Saving...' : 'Add Location'}
        </Button>
      </Stack>
    </Box>
  );
}