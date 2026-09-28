import { Delete, Edit } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import type { ReactNode } from 'react';

export interface ManagementColumn<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
}

interface ManagementTableProps<T> {
  columns: ManagementColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  emptyMessage?: string;
  minWidth?: number;
}

export default function ManagementTable<T>({
  columns,
  rows,
  getRowId,
  onEdit,
  onDelete,
  emptyMessage = 'No records found',
  minWidth,
}: ManagementTableProps<T>) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}

            {(onEdit || onDelete) && <TableCell align="right">Actions</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                <Typography variant="body2" sx={{ py: 3 }}>
                  {emptyMessage}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={getRowId(row)} hover>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(row)
                      : String(row[column.key as keyof T] ?? '')}
                  </TableCell>
                ))}

                {(onEdit || onDelete) && (
                  <TableCell align="right">
                    {onEdit && (
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => onEdit(row)}>
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}

                    {onDelete && (
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error" onClick={() => onDelete(row)}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}