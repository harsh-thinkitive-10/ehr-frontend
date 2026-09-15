import {
  Alert,
  Box,
  Stack,
  Typography,
} from '@mui/material';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import {
  Controller,
  useForm,
} from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input, Button } from '../../../component/ui';

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from '../schemas/resetPassword.schema';

import { useResetPassword } from '../hooks/useResetPassword';

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const resetPasswordMutation =
    useResetPassword();

  const token = searchParams.get('token');


  const {
    control,
    handleSubmit,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (
    data: ResetPasswordFormData,
  ) => {
    if (!token) {
      return;
    }

    await resetPasswordMutation.mutateAsync({
      token,
      newPassword: data.newPassword,
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 440,
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
              color="text.primary"
              gutterBottom
            >
              Reset Password
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Enter your new password below.
            </Typography>
          </Box>

          {!token && (
            <Alert severity="error">
              Invalid or missing password reset token.
            </Alert>
          )}

          {resetPasswordMutation.isError && (
            <Alert severity="error">
              Unable to reset your password. Please try
              again.
            </Alert>
          )}

          {resetPasswordMutation.isSuccess ? (
            <Stack spacing={2}>
              <Alert severity="success">
                {resetPasswordMutation.data.message}
              </Alert>

              <Button
                type="button"
                onClick={() =>
                  navigate('/login', {
                    replace: true,
                  })
                }
              >
                Back to Login
              </Button>
            </Stack>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <Stack spacing={2.5}>
                <Controller
                  name="newPassword"
                  control={control}
                  render={({
                    field,
                    fieldState,
                  }) => (
                    <Input
                      {...field}
                      label="New Password"
                      placeholder="Enter new password"
                      type="password"
                      autoComplete="new-password"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error?.message
                      }
                    />
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({
                    field,
                    fieldState,
                  }) => (
                    <Input
                      {...field}
                      label="Confirm Password"
                      placeholder="Confirm new password"
                      type="password"
                      autoComplete="new-password"
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
                    !token ||
                    resetPasswordMutation.isPending
                  }
                >
                  {resetPasswordMutation.isPending
                    ? 'Resetting...'
                    : 'Reset Password'}
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
          )}
        </Stack>
      </Box>
    </Box>
  );
}