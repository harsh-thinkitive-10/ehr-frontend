import { Box, CircularProgress, Stack, Typography } from '@mui/material';

import {
  ManagementPagination,
  ManagementTable,
  type ManagementColumn,
} from '../../../component/management';

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
  const columns: ManagementColumn<Location>[] = [
    {
      key: 'name',
      label: 'Location',
      render: (location) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {location.name}
        </Typography>
      ),
    },
    { key: 'code', label: 'Code' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'npi', label: 'NPI' },
    {
      key: 'billingAddress',
      label: 'Address',
      render: (location) => (
        <Stack spacing={0.25}>
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {location.billingAddress.line1}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location.billingAddress.city}, {location.billingAddress.state}
          </Typography>
        </Stack>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      <ManagementTable
        columns={columns}
        rows={locations}
        getRowId={(location) => location.uuid}
        onEdit={onEdit}
        onDelete={onDelete}
        emptyMessage="No locations found."
        minWidth={1000}
      />

      <ManagementPagination
        page={page}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        rowsPerPageOptions={[10, 20, 50]}
        onPageChange={onPageChange}
        onRowsPerPageChange={(size) => {
          onRowsPerPageChange(size);
          onPageChange(0);
        }}
      />
    </Stack>
  );
}