import { useState } from 'react';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

      console.log('Login successful:', response);

      // Store access token and update authentication state
      login(response.access_token);

      // Navigate to dashboard
      navigate('/dashboard', {
        replace: true,
      });
    } catch (error) {
      console.error('LOGIN ERROR:', error);

      if (axios.isAxiosError(error)) {
        console.error(
          'STATUS:',
          error.response?.status,
        );

        console.error(
          'DATA:',
          error.response?.data,
        );

        console.error(
          'URL:',
          error.config?.url,
        );

        if (error.response?.status === 401) {
          setApiError(
            'Invalid username or password.',
          );
        } else if (error.response?.status === 403) {
          setApiError(
            'You are not allowed to access this account.',
          );
        } else if (error.response) {
          setApiError(
            error.response.data?.message ??
              `Login failed (${error.response.status}).`,
          );
        } else if (error.request) {
          setApiError(
            'Cannot connect to the server.',
          );
        } else {
          setApiError(
            'Something went wrong. Please try again.',
          );
        }
      } else {
        console.error(
          'UNKNOWN ERROR:',
          error,
        );

        setApiError(
          'Something went wrong. Please try again.',
        );
      }
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