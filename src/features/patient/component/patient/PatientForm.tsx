import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';

import {
  Controller,
  useForm,
} from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '../../../../component/ui/input/Input';
import Button from '../../../../component/ui/button/Button';

import type {
  RegisterPatientRequest,
} from '../../types/patient';

const patientFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(
      2,
      'First name must be at least 2 characters.',
    ),

  lastName: z
    .string()
    .trim()
    .min(
      2,
      'Last name must be at least 2 characters.',
    ),

  age: z
    .number()
    .int('Age must be a whole number.')
    .min(
      1,
      'Age must be at least 1.',
    )
    .max(
      150,
      'Please enter a valid age.',
    ),

  gender: z.enum([
    'MALE',
    'FEMALE',
    'OTHER',
  ]),

  phoneNumber: z
    .string()
    .trim()
    .regex(
      /^[0-9]{10}$/,
      'Phone number must contain exactly 10 digits.',
    ),

  email: z
    .string()
    .trim()
    .email(
      'Please enter a valid email address.',
    ),
});

type PatientFormValues =
  z.infer<typeof patientFormSchema>;

interface PatientFormProps {
  mode?: 'create' | 'edit';

  initialValues?: Partial<PatientFormValues>;

  loading?: boolean;

  onSubmit: (
    values: RegisterPatientRequest,
  ) => void | Promise<void>;

  onCancel?: () => void;
}

const defaultValues: PatientFormValues = {
  firstName: '',
  lastName: '',
  age: 0,
  gender: 'MALE',
  phoneNumber: '',
  email: '',
};

export default function PatientForm({
  mode = 'create',
  initialValues,
  loading = false,
  onSubmit,
  onCancel,
}: PatientFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(
      patientFormSchema,
    ),
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
  });

  const handleFormSubmit = (
    values: PatientFormValues,
  ) => {
    onSubmit(values);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(
        handleFormSubmit,
      )}
      noValidate
    >
      <Stack spacing={3}>
        {/* FIRST NAME + LAST NAME */}

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={2}
        >
          <Input
            label="First Name"
            placeholder="Enter first name"
            {...register('firstName')}
            error={Boolean(
              errors.firstName,
            )}
            helperText={
              errors.firstName?.message
            }
          />

          <Input
            label="Last Name"
            placeholder="Enter last name"
            {...register('lastName')}
            error={Boolean(
              errors.lastName,
            )}
            helperText={
              errors.lastName?.message
            }
          />
        </Stack>

        {/* AGE + GENDER */}

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={2}
        >
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <Input
                label="Age"
                type="number"
                placeholder="Enter age"
                value={
                  field.value === 0
                    ? ''
                    : field.value
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
                error={Boolean(
                  errors.age,
                )}
                helperText={
                  errors.age?.message
                }
              />
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={Boolean(
                  errors.gender,
                )}
              >
                <InputLabel>
                  Gender
                </InputLabel>

                <Select
                  {...field}
                  label="Gender"
                  sx={{
                    borderRadius: 1.25,
                  }}
                >
                  <MenuItem value="MALE">
                    Male
                  </MenuItem>

                  <MenuItem value="FEMALE">
                    Female
                  </MenuItem>

                  <MenuItem value="OTHER">
                    Other
                  </MenuItem>
                </Select>

                {errors.gender?.message && (
                  <FormHelperText>
                    {errors.gender.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Stack>

        {/* PHONE + EMAIL */}

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={2}
        >
          <Input
            label="Phone Number"
            placeholder="Enter 10-digit phone number"
            inputMode="numeric"
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
            placeholder="Enter email address"
            {...register('email')}
            error={Boolean(
              errors.email,
            )}
            helperText={
              errors.email?.message
            }
          />
        </Stack>

        {/* ACTIONS */}

        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          {onCancel && (
            <Button
              type="button"
              variant="outlined"
              onClick={onCancel}
              disabled={loading}
              sx={{
                width: 'auto',
                minWidth: 120,
              }}
            >
              Cancel
            </Button>
          )}

          <Button
            type="submit"
            disabled={loading}
            sx={{
              width: 'auto',
              minWidth: 160,
            }}
          >
            {mode === 'edit'
              ? 'Update Patient'
              : 'Register Patient'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}