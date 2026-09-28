import { FilterList, Search } from '@mui/icons-material';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';

interface ManagementSearchProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onFilter?: () => void;
  showFilter?: boolean;
}

export default function ManagementSearch({
  value,
  placeholder,
  onChange,
  onSearch,
  onFilter,
  showFilter = true,
}: ManagementSearchProps) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      <TextField
        fullWidth
        size="small"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onSearch();
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <Button variant="contained" onClick={onSearch}>
        Search
      </Button>

      {showFilter && onFilter && (
        <Button variant="outlined" startIcon={<FilterList />} onClick={onFilter}>
          Filter
        </Button>
      )}
    </Stack>
  );
}