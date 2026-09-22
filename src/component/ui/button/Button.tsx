import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <MuiButton
      variant="contained"
      fullWidth
      {...props}
      sx={{
        minHeight: 52,
        borderRadius: 1,
        fontSize: '0.8125rem',
        ...props.sx,

        ':hover': {
          boxShadow: 'none',
        }, 
      }}
    >
      {children}
    </MuiButton>
  );
}