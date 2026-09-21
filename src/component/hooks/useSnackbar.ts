import { useState } from 'react';
import type { AlertColor } from '@mui/material';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (message: string, severity: AlertColor = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const showSuccess = (message: string) => showSnackbar(message, 'success');
  const showError = (message: string) => showSnackbar(message, 'error');
  const showWarning = (message: string) => showSnackbar(message, 'warning');
  const showInfo = (message: string) => showSnackbar(message, 'info');

  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  return { snackbar, showSnackbar, showSuccess, showError, showWarning, showInfo, closeSnackbar };
}