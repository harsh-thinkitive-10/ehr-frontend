import { useState } from 'react';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { Typography } from '@mui/material';

import { Input, Button } from '../../../component/ui';

import {
  loginSchema,
  type LoginFormData,
} from '../schemas/auth.schema';

import { authService } from '../services/authService';
import { useAuth } from '../context';

export default function LoginForm() {
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError('');

    try {
      const response = await authService.login(data);

      // Store access token and update authentication state
      login(response);

      // Navigate to dashboard
      navigate('/dashboard', {
        replace: true,
      });
    } catch {
      setApiError(
          'Something went wrong. Please try again.',
        );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Stack spacing={2}>
        <Input
          label="Username"
          placeholder="Enter username"
          type="text"
          autoComplete="username"
          error={!!errors.username}
          helperText={errors.username?.message}
          {...register('username')}
        />

        <Input
          label="Password"
          placeholder="Enter password"
          type="password"
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password')}
        />

        {apiError && (
          <div role="alert">
            {apiError}
          </div>
        )}

        <Typography
          component={Link}
          to="/forgot-password"
          variant="body2"
          sx={{
            alignSelf: 'flex-end',
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 600,
          }}
        >
          Forgot Password?
        </Typography>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Logging in...'
            : 'Login'}
        </Button>
      </Stack>
    </form>
  );
}