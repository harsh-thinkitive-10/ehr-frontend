import { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import { ui } from '../../../app/theme';
import BookAppointmentForm from '../components/BookAppointmentForm';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface BookAppointmentDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function BookAppointmentDialog({ open, onClose }: BookAppointmentDialogProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleClose = () => {
    if (successMessage) setSuccessMessage(null);
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ px: 3, py: 2 }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box sx={{ width: 42, height: 42, borderRadius: ui.borderRadius.xlarge, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'primary.light', color: 'primary.main' }}>
              <EventAvailableIcon />
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Book Appointment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Schedule a new patient appointment
              </Typography>
            </Box>
          </Stack>

          <Button
            onClick={handleClose}
            sx={{ minWidth: 40, width: 40, height: 40, p: 0, color: 'text.secondary', borderRadius: ui.borderRadius.xlarge }}
            aria-label="Close"
          >
            <CloseIcon />
          </Button>
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ px: 3, py: 3 }}>
        {successMessage ? (
          <Stack spacing={3} sx={{ py: 5, alignItems: 'center' }}>
            <EventAvailableIcon sx={{ fontSize: 64, color: 'success.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }}>
              {successMessage}
            </Typography>
            <Button variant="contained" onClick={handleClose} sx={{ minWidth: 120 }}>
              Done
            </Button>
          </Stack>
        ) : (
          <BookAppointmentForm open={open} onSuccess={setSuccessMessage}  />
        )}
      </DialogContent>
    </Dialog>
    </LocalizationProvider>
  );
}