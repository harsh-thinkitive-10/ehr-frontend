import { Alert, Snackbar } from '@mui/material';
import type { AlertColor } from '@mui/material';

interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose: () => void;
  autoHideDuration?: number;
}

export default function AppSnackbar({
  open,
  message,
  severity = 'success',
  onClose,
  autoHideDuration = 4000,
}: AppSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ minWidth: 320 }}>
        {message}
      </Alert>
    </Snackbar>
  );
}