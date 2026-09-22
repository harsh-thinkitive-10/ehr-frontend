import { Edit, Delete } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import type { Location } from '../types/location';

interface LocationListProps {
  locations: Location[];
  page: number;
  rowsPerPage: number;
  totalRows: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEdit?: (location: Location) => void;
  onDelete?: (location: Location) => void;
}

export default function LocationList({
  locations,
  page,
  rowsPerPage,
  totalRows,
  isLoading = false,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
}: LocationListProps) {
  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>NPI</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography sx={{ py: 3 }}>Loading locations...</Typography>
                </TableCell>
              </TableRow>
            ) : locations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography sx={{ py: 3 }}>No locations found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              locations.map((location) => (
                <TableRow key={location.uuid}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {location.name}
                    </Typography>
                  </TableCell>

                  <TableCell>{location.code}</TableCell>

                  <TableCell>{location.phone}</TableCell>

                  <TableCell>{location.email}</TableCell>

                  <TableCell>{location.npi}</TableCell>

                  <TableCell>
                    <Stack spacing={0.25}>
                      <Typography variant="body2" sx={{ color: 'text.primary' }}>
                        {location.billingAddress.line1}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {location.billingAddress.city}, {location.billingAddress.state}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell align="right">
                    {onEdit && (
                      <IconButton size="small" onClick={() => onEdit(location)}>
                        <Edit fontSize="small" />
                      </IconButton>
                    )}

                    {onDelete && (
                      <IconButton size="small" color="error" onClick={() => onDelete(location)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalRows}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(event) => {
          onRowsPerPageChange(Number(event.target.value));
          onPageChange(0);
        }}
        rowsPerPageOptions={[10, 20, 50]}
      />
    </Paper>
  );
}