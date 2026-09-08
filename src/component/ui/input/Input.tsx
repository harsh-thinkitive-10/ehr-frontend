import {
  InputBase,
  FormControl,
  FormHelperText,
  InputLabel,
} from '@mui/material';

import type { InputBaseProps } from '@mui/material/InputBase';

export interface InputProps extends InputBaseProps {
  label?: string;
  helperText?: string;
}

export default function Input({
  label,
  helperText,
  error,
  ...props
}: InputProps) {
  return (
    <FormControl fullWidth error={error}>
      {label && (
        <InputLabel
          shrink
          sx={{
            position: 'static',
            transform: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#1e293b',
            mb: 1,
          }}
        >
          {label}
        </InputLabel>
      )}

      <InputBase
        {...props}
        sx={{
          border: '1px solid',
          borderColor: error
            ? 'error.main'
            : '#d5dce5',
          borderRadius: '10px',
          px: 2,
          py: 1.5,
          fontSize: '0.95rem',
          transition: 'all 0.2s ease',

          '&:hover': {
            borderColor: error
              ? 'error.main'
              : '#94a3b8',
          },

          '&.Mui-focused': {
            borderColor: error
              ? 'error.main'
              : '#1976d2',
            boxShadow: error
              ? '0 0 0 3px rgba(211,47,47,0.08)'
              : '0 0 0 3px rgba(25,118,210,0.08)',
          },

          '& input': {
            padding: 0,
          },

          ...props.sx,
        }}
      />

      {helperText && (
        <FormHelperText sx={{ mx: 0 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}