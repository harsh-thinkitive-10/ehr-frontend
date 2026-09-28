import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

import {
  ManagementPagination,
  ManagementPersonCell,
  ManagementSearch,
  ManagementTable,
  type ManagementColumn,
} from '../../../../component/management';

import PatientFilter from './PatientFilter';
import { usePatients } from '../../hooks/usePatients';
import type { Patient, PatientGender } from '../../types/patient';

interface PatientListProps {
  onEdit?: (patient: Patient) => void;
  onDelete?: (patient: Patient) => void;
  filterOpen?: boolean;
}

type SortDirection = 'asc' | 'desc';

export default function PatientList({
  onEdit,
  onDelete,
  filterOpen = false,
}: PatientListProps) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState<PatientGender | undefined>();
  const [filterAge, setFilterAge] = useState<number | undefined>();
  const [filterSortBy, setFilterSortBy] = useState('fullName');
  const [filterSortDirection, setFilterSortDirection] = useState<SortDirection>('asc');
  const [gender, setGender] = useState<PatientGender | undefined>();
  const [age, setAge] = useState<number | undefined>();
  const [sort, setSort] = useState<string | undefined>();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(0);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isFetching, isError, error, refetch } = usePatients({
    page,
    size: pageSize,
    search: search || undefined,
    gender,
    age,
    sort,
  });

  const patients = data?.data?.content ?? [];
  const totalPatients = data?.data?.totalElements ?? 0;

  const handleApplyFilter = () => {
    setGender(filterGender);
    setAge(filterAge);
    setSort(`${filterSortBy},${filterSortDirection}`);
    setPage(0);
  };

  const handleClearFilters = () => {
    setFilterGender(undefined);
    setFilterAge(undefined);
    setFilterSortBy('fullName');
    setFilterSortDirection('asc');
    setGender(undefined);
    setAge(undefined);
    setSort(undefined);
    setPage(0);
  };

  const columns: ManagementColumn<Patient>[] = [
    {
      key: 'fullName',
      label: 'Patient',
      render: (patient) => <ManagementPersonCell name={patient.fullName} />,
    },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'email', label: 'Email' },
    {
      key: 'isActive',
      label: 'Status',
      render: (patient) => (patient.isActive ? 'Active' : 'Inactive'),
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
        {error instanceof Error ? error.message : 'Failed to load patients.'}
      </Alert>
    );
  }

  return (
    <Stack >
      <Paper sx={{ p: 2 }}>
        <ManagementSearch
          value={searchInput}
          placeholder="Search patients..."
          onChange={setSearchInput}
          onSearch={() => {
            setSearch(searchInput.trim());
            setPage(0);
          }}
          showFilter={false}
        />
      </Paper>

      {filterOpen && (
        <PatientFilter
          gender={filterGender}
          age={filterAge}
          sortBy={filterSortBy}
          sortDirection={filterSortDirection}
          onGenderChange={setFilterGender}
          onAgeChange={setFilterAge}
          onSortByChange={setFilterSortBy}
          onSortDirectionChange={setFilterSortDirection}
          onClear={handleClearFilters}
          onApply={handleApplyFilter}
        />
      )}

      {isFetching && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">
            Updating patients...
          </Typography>
        </Box>
      )}

      {patients.length === 0 ? (
        <Paper sx={{ py: 8, px: 3, textAlign: 'center' }}>
          <PeopleIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            No patients found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try changing your search or filters.
          </Typography>
        </Paper>
      ) : (
        <>
          <ManagementTable
            columns={columns}
            rows={patients}
            getRowId={(patient) => patient.uuid}
            onEdit={onEdit}
            onDelete={onDelete}
            emptyMessage="No patients found."
            minWidth={1000}
          />

          <ManagementPagination
            page={page}
            rowsPerPage={pageSize}
            totalRows={totalPatients}
            rowsPerPageOptions={[10, 20, 50, 100]}
            onPageChange={setPage}
            onRowsPerPageChange={(size) => {
              setPageSize(size);
              setPage(0);
            }}
          />
        </>
      )}
    </Stack>
  );
}