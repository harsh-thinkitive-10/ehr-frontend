import {
  Stack,
  Typography,
} from '@mui/material';

interface ProfileFieldProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export default function ProfileField({
  label,
  value,
  icon,
}: ProfileFieldProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: 'center',
      }}
    >
      {icon}

      <Stack spacing={0.25}>
        <Typography variant="body2">
          {label}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
          }}
        >
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
}