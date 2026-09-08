import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
}

export default function Button({
  children,
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      variant="contained"
      fullWidth
      {...props}
      sx={{
        minHeight: 52,
        borderRadius: '10px',
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: 600,
        boxShadow: 'none',

        '&:hover': {
          boxShadow: 'none',
        },

        ...props.sx,
      }}
    >
      {children}
    </MuiButton>
  );
}