import {
  Alert,
  Box,
  Stack,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';

import {
  Controller,
  useForm,
} from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../../../../component/ui/button/Button';
import Input from '../../../../component/ui/input/Input';

import { useForgotPassword } from '../../hooks/useForgotPassword';

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from '../../schemas/forgotPassword.schema';

export default function ForgotPasswordForm() {
  const forgotPasswordMutation =
    useForgotPassword();

  const {
    control,
    handleSubmit,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = async (
    data: ForgotPasswordFormData,
  ) => {
    await forgotPasswordMutation.mutateAsync(data);
  };

  return (
    <Stack spacing={3}>
      {forgotPasswordMutation.isSuccess && (
        <Alert severity="success">
          {forgotPasswordMutation.data.message}
        </Alert>
      )}

      {forgotPasswordMutation.isError && (
        <Alert severity="error">
          Unable to process your request. Please try again.
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Stack spacing={2.5}>
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Username"
                placeholder="Enter your username"
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message
                }
              />
            )}
          />

          <Button
            type="submit"
            disabled={
              forgotPasswordMutation.isPending
            }
          >
            {forgotPasswordMutation.isPending
              ? 'Sending...'
              : 'Send Reset Link'}
          </Button>

          <Typography
            component={Link}
            to="/login"
            variant="body2"
            sx={{
              textAlign: 'center',
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 600,
            }}
          >
            ← Back to Login
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}