import {
  Box,
  Stack,
  Typography,
} from '@mui/material';

import EventIcon from '@mui/icons-material/Event';

interface AppointmentDateTimeProps {
  value: string;
}

export default function AppointmentDateTime({
  value,
}: AppointmentDateTimeProps) {
  const date = new Date(value);

  const formattedDate =
    date.toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      },
    );

  const formattedTime =
    date.toLocaleTimeString(
      'en-IN',
      {
        hour: 'numeric',
        minute: '2-digit',
      },
    );

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: 'center',
      }}
    >
      <EventIcon
        sx={{
          fontSize: 20,
          color: 'text.secondary',
        }}
      />

      <Box>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          {formattedDate}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {formattedTime}
        </Typography>
      </Box>
    </Stack>
  );
}