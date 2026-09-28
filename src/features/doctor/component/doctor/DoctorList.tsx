import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import {
  ManagementPagination,
  ManagementPersonCell,
  ManagementSearch,
  ManagementTable,
  type ManagementColumn,
} from '../../../../component/management';

import { useDoctors } from '../../hooks/useDoctors';
import type { Doctor } from '../../types/doctor';

interface DoctorListProps {
  onEdit?: (doctor: Doctor) => void;
  onDelete?: (doctor: Doctor) => void;
}

export default function DoctorList({ onEdit, onDelete }: DoctorListProps) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [specialization, setSpecialization] = useState('');
  const [sortBy, setSortBy] = useState('fullName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { data, isLoading, isFetching, isError, error, refetch } = useDoctors({
    page,
    size: pageSize,
    search: search.trim() || undefined,
    specialization: specialization || undefined,
    sort: `${sortBy},${sortOrder}`,
  });

  const doctors = data?.data?.content ?? [];
  const totalDoctors = data?.data?.totalElements ?? 0;

  const handleSearchSubmit = () => {
    setSearch(searchInput.trim());
    setPage(0);
  };

  const clearFilters = () => {
    setSpecialization('');
    setSortBy('fullName');
    setSortOrder('asc');
    setPage(0);
  };

  const columns: ManagementColumn<Doctor>[] = [
    {
      key: 'fullName',
      label: 'Doctor',
      render: (doctor) => <ManagementPersonCell name={doctor.fullName} />,
    },
    {
      key: 'specialization',
      label: 'Specialization',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
    },
    {
      key: 'consultationFee',
      label: 'Consultation Fee',
      render: (doctor) => `₹${doctor.consultationFee.toFixed(2)}`,
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (doctor) => (doctor.isActive ? 'Active' : 'Inactive'),
    },
  ];

  if (isLoading) {
    return (
      <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert
        severity="error"
        action={
          <Box
            component="button"
            type="button"
            onClick={() => refetch()}
            sx={{
              border: 0,
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Retry
          </Box>
        }
      >
        {error instanceof Error ? error.message : 'Failed to load doctors.'}
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      <Paper sx={{ p: 2 }}>
        <ManagementSearch
          value={searchInput}
          placeholder="Search doctors..."
          onChange={setSearchInput}
          onSearch={handleSearchSubmit}
          onFilter={() => setFilterOpen((value) => !value)}
        />
      </Paper>

      {filterOpen && (
        <Paper sx={{ p: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Specialization</InputLabel>
              <Select
                value={specialization}
                label="Specialization"
                onChange={(event) => {
                  setSpecialization(event.target.value);
                  setPage(0);
                }}
              >
                <MenuItem value="">All Specializations</MenuItem>
                <MenuItem value="Cardiologist">Cardiologist</MenuItem>
                <MenuItem value="General Physician">General Physician</MenuItem>
                <MenuItem value="Dermatologist">Dermatologist</MenuItem>
                <MenuItem value="Neurologist">Neurologist</MenuItem>
                <MenuItem value="Orthopedic">Orthopedic</MenuItem>
                <MenuItem value="Pediatrician">Pediatrician</MenuItem>
                <MenuItem value="Gynecologist">Gynecologist</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(event) => {
                  setSortBy(event.target.value);
                  setPage(0);
                }}
              >
                <MenuItem value="fullName">Name</MenuItem>
                <MenuItem value="specialization">Specialization</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="consultationFee">Consultation Fee</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Order</InputLabel>
              <Select
                value={sortOrder}
                label="Order"
                onChange={(event) => {
                  setSortOrder(event.target.value as 'asc' | 'desc');
                  setPage(0);
                }}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>

            <Button variant="text" onClick={clearFilters}>
              Clear
            </Button>
          </Stack>
        </Paper>
      )}

      {isFetching && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">
            Updating doctors...
          </Typography>
        </Box>
      )}

      <ManagementTable
        columns={columns}
        rows={doctors}
        getRowId={(doctor) => doctor.uuid}
        onEdit={onEdit}
        onDelete={onDelete}
        emptyMessage="No doctors found. Try changing your search or filters."
        minWidth={950}
      />

      <ManagementPagination
        page={page}
        rowsPerPage={pageSize}
        totalRows={totalDoctors}
        onPageChange={setPage}
        onRowsPerPageChange={(size) => {
          setPageSize(size);
          setPage(0);
        }}
      />
    </Stack>
  );
}