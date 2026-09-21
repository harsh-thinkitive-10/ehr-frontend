import type { ChangeEvent } from 'react';

import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  clearable?: boolean;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  size = 'small',
  fullWidth = true,
  clearable = true,
}: SearchInputProps) {
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      size={size}
      fullWidth={fullWidth}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                fontSize="small"
                color="action"
              />
            </InputAdornment>
          ),

          endAdornment:
            clearable && value ? (
              <InputAdornment position="end">
                <Tooltip title="Clear search">
                  <IconButton
                    size="small"
                    onClick={handleClear}
                    edge="end"
                    aria-label="Clear search"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ) : undefined,
        },
      }}
    />
  );
}