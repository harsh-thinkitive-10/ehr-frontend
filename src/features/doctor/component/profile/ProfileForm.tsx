import { useEffect } from 'react';

import {
  Stack,
  Typography,
} from '@mui/material';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../../../../component/ui/button/Button';
import Input from '../../../../component/ui/input/Input';

import {
  doctorProfileSchema,
  type DoctorProfileFormData,
} from '../../schemas/doctorProfile.schema';

import type { DoctorProfile } from '../../types/doctorProfile';

interface DoctorProfileFormProps {
  doctor: DoctorProfile;
  onCancel: () => void;
  onSave: (
    data: DoctorProfileFormData,
  ) => Promise<void>;
  isSaving: boolean;
}

export default function DoctorProfileForm({
  doctor,
  onCancel,
  onSave,
  isSaving,
}: DoctorProfileFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<DoctorProfileFormData>({
    resolver: zodResolver(
      doctorProfileSchema,
    ),
    defaultValues: {
      fullName: doctor.fullName,
      specialization: doctor.specialization,
      phoneNumber: doctor.phoneNumber,
      email: doctor.email,
      consultationFee: doctor.consultationFee,
    },
  });

  useEffect(() => {
    reset({
      fullName: doctor.fullName,
      specialization: doctor.specialization,
      phoneNumber: doctor.phoneNumber,
      email: doctor.email,
      consultationFee: doctor.consultationFee,
    });
  }, [doctor, reset]);

  return (
    <Stack
      component="form"
      spacing={2.5}
      onSubmit={handleSubmit(onSave)}
      noValidate
    >
      <Stack spacing={0.5}>
        <Typography variant="h6">
          Edit Profile
        </Typography>

        <Typography variant="body2">
          Update your professional information.
        </Typography>
      </Stack>

      <Input
        label="Full Name"
        {...register('fullName')}
        error={Boolean(errors.fullName)}
        helperText={
          errors.fullName?.message
        }
      />

      <Input
        label="Specialization"
        {...register('specialization')}
        error={Boolean(
          errors.specialization,
        )}
        helperText={
          errors.specialization?.message
        }
      />

      <Input
        label="Phone Number"
        type="tel"
        {...register('phoneNumber')}
        error={Boolean(
          errors.phoneNumber,
        )}
        helperText={
          errors.phoneNumber?.message
        }
      />

      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={Boolean(errors.email)}
        helperText={
          errors.email?.message
        }
      />

      <Input
        label="Consultation Fee"
        type="number"
        slotProps={{
          input: {
            min: 0,
          },
        }}
        {...register(
          'consultationFee',
          {
            valueAsNumber: true,
          },
        )}
        error={Boolean(
          errors.consultationFee,
        )}
        helperText={
          errors.consultationFee?.message
        }
      />

      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          pt: 1,
        }}
      >
        <Button
          type="button"
          variant="outlined"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSaving}
        >
          {isSaving
            ? 'Saving...'
            : 'Save Changes'}
        </Button>
      </Stack>
    </Stack>
  );
}