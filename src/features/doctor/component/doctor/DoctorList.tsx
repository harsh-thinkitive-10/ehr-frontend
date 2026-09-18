import { useState, type ChangeEvent } from 'react';
import { Alert, Avatar, Box, Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchInput from '../../../../component/search-input/SearchInput';
import { useDoctors } from '../../hooks/useDoctors';
import type { Doctor } from '../../types/doctor';

interface DoctorListProps {
  onEdit?: (doctor: Doctor) => void;
  onDelete?: (doctor: Doctor) => void;
}

function getInitials(fullName: string): string {
  return fullName.trim().split(/\s+/).slice(0, 2).map(name => name.charAt(0).toUpperCase()).join('');
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


  const handlePageChange = (_event: unknown, nextPage: number) => setPage(nextPage);

  const handlePageSizeChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPageSize(Number(event.target.value));
    setPage(0);
  };

  const clearFilters = () => {
    setSpecialization('');
    setSortBy('fullName');
    setSortOrder('asc');
    setPage(0);
  };

  if (isLoading) return <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;

  if (isError) return (
    <Alert severity="error" action={<Box component="button" type="button" onClick={() => refetch()} sx={{ border: 0, background: 'transparent', color: 'inherit', cursor: 'pointer', fontWeight: 600 }}>Retry</Box>}>
      {error instanceof Error ? error.message : 'Failed to load doctors.'}
    </Alert>
  );

  return (
    <Stack spacing={2}>
      <Paper sx={{ p: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ alignItems: { sm: 'center' } }}>
          <Box sx={{ flex: 1 }}>
            <SearchInput value={searchInput} onChange={setSearchInput} placeholder="Search doctors..." />
          </Box>
          <Button variant="contained" onClick={handleSearchSubmit}>Search</Button>
          <Button variant="outlined" startIcon={<FilterListIcon />} onClick={() => setFilterOpen(value => !value)}>Filter</Button>
        </Stack>
      </Paper>

      {filterOpen && (
        <Paper sx={{ p: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Specialization</InputLabel>
              <Select value={specialization} label="Specialization" onChange={e => { setSpecialization(e.target.value); setPage(0); }}>
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
              <Select value={sortBy} label="Sort By" onChange={e => { setSortBy(e.target.value); setPage(0); }}>
                <MenuItem value="fullName">Name</MenuItem>
                <MenuItem value="specialization">Specialization</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="consultationFee">Consultation Fee</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Order</InputLabel>
              <Select value={sortOrder} label="Order" onChange={e => { setSortOrder(e.target.value as 'asc' | 'desc'); setPage(0); }}>
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>

            <Button variant="text" onClick={clearFilters}>Clear</Button>
          </Stack>
        </Paper>
      )}

      {isFetching && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">Updating doctors...</Typography>
        </Box>
      )}

      {doctors.length === 0 ? (
        <Paper sx={{ py: 8, px: 3, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>No doctors found</Typography>
          <Typography variant="body2" color="text.secondary">Try changing your search or filters.</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 950 }} aria-label="Doctor management table">
            <TableHead>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Consultation Fee</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {doctors.map(doctor => (
                <TableRow key={doctor.uuid} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                      <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.light', color: 'primary.dark', fontSize: '0.85rem', fontWeight: 600 }}>
                        {getInitials(doctor.fullName)}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>{doctor.fullName}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.phoneNumber}</TableCell>
                  <TableCell>₹{doctor.consultationFee.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                      <Tooltip title="Edit doctor">
                        <IconButton size="small" aria-label={`Edit ${doctor.fullName}`} onClick={() => onEdit?.(doctor)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete doctor">
                        <IconButton size="small" color="error" aria-label={`Delete ${doctor.fullName}`} onClick={() => onDelete?.(doctor)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={totalDoctors}
            page={page}
            rowsPerPage={pageSize}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handlePageSizeChange}
            rowsPerPageOptions={[10, 20, 50]}
            labelRowsPerPage="Show"
          />
        </TableContainer>
      )}
    </Stack>
  );
}