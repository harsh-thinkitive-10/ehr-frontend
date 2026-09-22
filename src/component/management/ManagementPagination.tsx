import { Stack, TablePagination } from '@mui/material';

interface ManagementPaginationProps {
  page: number;
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

export default function ManagementPagination({
  page,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
}: ManagementPaginationProps) {
  return (
    <Stack sx={{ alignItems: 'flex-end' }}>
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
    </Stack>
  );
}