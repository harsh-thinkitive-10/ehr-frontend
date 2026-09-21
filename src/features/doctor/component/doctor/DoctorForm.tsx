import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, InputAdornment, Stack, TextField } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { doctorSchema, type DoctorFormValues } from '../../schemas/doctor.schema';

interface DoctorFormProps {
  mode?: 'create' | 'edit';
  initialValues?: Partial<DoctorFormValues>;
  loading?: boolean;
  errorMessage?: string | null;
  onSubmit: (values: DoctorFormValues) => Promise<void>;
  onCancel?: () => void;
}

export default function DoctorForm({ mode = 'create', initialValues, loading = false, errorMessage, onSubmit, onCancel }: DoctorFormProps) {
  const { control, handleSubmit, reset } = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: { firstName: '', lastName: '', specialization: '', phoneNumber: '', email: '', consultationFee: 0, ...initialValues },
  });

  useEffect(() => { if (initialValues) reset({ ...initialValues }); }, [initialValues, reset]);

  const edit = mode === 'edit';
  const common = { fullWidth: true, size: 'medium' as const };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller name="firstName" control={control} render={({ field, fieldState }) => <TextField {...field} {...common} label="First Name *" placeholder="Enter first name" error={!!fieldState.error} helperText={fieldState.error?.message} />} />
          <Controller name="lastName" control={control} render={({ field, fieldState }) => <TextField {...field} {...common} label="Last Name *" placeholder="Enter last name" error={!!fieldState.error} helperText={fieldState.error?.message} />} />
        </Stack>

        <Controller name="specialization" control={control} render={({ field, fieldState }) => <TextField {...field} {...common} label="Specialization *" placeholder="Enter specialization (e.g., Cardiologist)" error={!!fieldState.error} helperText={fieldState.error?.message} />} />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller name="phoneNumber" control={control} render={({ field, fieldState }) => <TextField {...field} {...common} label="Phone Number *" placeholder="Enter phone number" inputMode="numeric" error={!!fieldState.error} helperText={fieldState.error?.message} slotProps={{ input: { startAdornment: <InputAdornment position="start"><PhoneOutlinedIcon /></InputAdornment> } }} />} />
          <Controller name="email" control={control} render={({ field, fieldState }) => <TextField {...field} {...common} label="Email *" type="email" placeholder="Enter email address" error={!!fieldState.error} helperText={fieldState.error?.message} slotProps={{ input: { startAdornment: <InputAdornment position="start"><EmailOutlinedIcon /></InputAdornment> } }} />} />
        </Stack>

        <Controller name="consultationFee" control={control} render={({ field, fieldState }) => <TextField {...common} label="Consultation Fee *" type="number" placeholder="Enter consultation fee" value={field.value ?? ''} onChange={e => field.onChange(e.target.value === '' ? 0 : Number(e.target.value))} error={!!fieldState.error} helperText={fieldState.error?.message} slotProps={{ input: { startAdornment: <InputAdornment position="start"><CurrencyRupeeOutlinedIcon /></InputAdornment> }, htmlInput: { min: 0, step: 0.01 } }} />} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 1 }}>
          <Button type="button" variant="outlined" onClick={onCancel} disabled={loading} sx={{ minWidth: 136, minHeight: 52, borderRadius: 3, fontWeight: 600 }}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading} startIcon={<PersonAddOutlinedIcon />} sx={{ minWidth: 180, minHeight: 52, borderRadius: 3, fontWeight: 600, boxShadow: 'none' }}>
            {loading ? (edit ? 'Updating Doctor...' : 'Adding Doctor...') : (edit ? 'Update Doctor' : 'Add Doctor')}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}