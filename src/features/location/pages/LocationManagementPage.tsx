import { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import LocationList from '../components/LocationList';
import LocationForm from '../components/LocationForm';
import { useLocations, locationKeys } from '../hooks/useLocations';
import { useCreateLocation } from '../hooks/useCreateLocation';
import type { LocationFormValues } from '../schemas/location.schema';
import { useUpdateLocation } from '../hooks/useUpdateLocation';
import type { Location } from '../types/location';
import { useDeleteLocation } from '../hooks/useDeleteLocation';

import {
  ManagementHeader,
  ManagementSearch,
} from '../../../component/management';

export default function LocationManagementPage() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [searchInput, setSearchInput] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editLocation, setEditLocation] = useState<Location | null>(null);
  const [deleteLocation, setDeleteLocation] = useState<Location | null>(null);

  const createLocation = useCreateLocation();
  const updateLocation = useUpdateLocation();
  const deleteLocationMutation = useDeleteLocation();

  const { data, isLoading, isError } = useLocations({
    page,
    size: rowsPerPage,
  });

  const locations = data?.data.content ?? [];

  const handleSearch = () => {
    setPage(0);
  };

  const handleCreateLocation = async (values: LocationFormValues) => {
    try {
      setErrorMessage(null);

      await createLocation.mutateAsync({
        code: values.code,
        name: values.name,
        phone: values.phone,
        email: values.email,
        npi: values.npi,
        billingAddress: {
          line1: values.line1,
          line2: values.line2,
          city: values.city,
          state: values.state,
          country: values.country,
          zipcode: values.zipcode,
        },
        taxEntity: null,
      });

      await queryClient.invalidateQueries({ queryKey: locationKeys.all });
      setAddOpen(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to add location.');
    }
  };

  const handleUpdateLocation = async (values: LocationFormValues) => {
    if (!editLocation) return;

    try {
      setErrorMessage(null);

      await updateLocation.mutateAsync({
        uuid: editLocation.uuid,
        data: {
          code: values.code,
          name: values.name,
          phone: values.phone,
          email: values.email,
          npi: values.npi,
          billingAddress: {
            line1: values.line1,
            line2: values.line2,
            city: values.city,
            state: values.state,
            country: values.country,
            zipcode: values.zipcode,
          },
          taxEntity: editLocation.taxEntity,
        },
      });

      await queryClient.invalidateQueries({ queryKey: locationKeys.all });
      setEditLocation(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update location.');
    }
  };

  const handleDeleteLocation = async () => {
    if (!deleteLocation) return;

    try {
      setErrorMessage(null);

      await deleteLocationMutation.mutateAsync(deleteLocation.uuid);
      await queryClient.invalidateQueries({ queryKey: locationKeys.all });
      setDeleteLocation(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete location.');
    }
  };

  return (
    <>
      <ManagementHeader
        title="Locations"
        description="View and manage all healthcare locations"
        buttonLabel="Add Location"
        onAdd={() => {
          setErrorMessage(null);
          setAddOpen(true);
        }}
      />

      <Stack spacing={2}>
        <ManagementSearch
          value={searchInput}
          placeholder="Search locations..."
          onChange={setSearchInput}
          onSearch={handleSearch}
          showFilter={false}
        />

        {isError ? (
          <Typography color="error">
            Failed to load locations.
          </Typography>
        ) : (
          <LocationList
            locations={locations}
            page={page}
            rowsPerPage={rowsPerPage}
            totalRows={data?.data.totalElements ?? 0}
            isLoading={isLoading}
            onPageChange={setPage}
            onRowsPerPageChange={(size) => {
              setRowsPerPage(size);
              setPage(0);
            }}
            onEdit={setEditLocation}
            onDelete={setDeleteLocation}
          />
        )}
      </Stack>

      <Dialog
        open={addOpen}
        onClose={() => !createLocation.isPending && setAddOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Add Location</DialogTitle>

        <DialogContent dividers>
          <LocationForm
            mode="create"
            loading={createLocation.isPending}
            errorMessage={errorMessage}
            onCancel={() => setAddOpen(false)}
            onSubmit={handleCreateLocation}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editLocation}
        onClose={() => !updateLocation.isPending && setEditLocation(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Edit Location</DialogTitle>

        <DialogContent dividers>
          {editLocation && (
            <LocationForm
              mode="edit"
              initialValues={{
                code: editLocation.code,
                name: editLocation.name,
                phone: editLocation.phone,
                email: editLocation.email,
                npi: editLocation.npi,
                line1: editLocation.billingAddress.line1,
                line2: editLocation.billingAddress.line2 ?? '',
                city: editLocation.billingAddress.city,
                state: editLocation.billingAddress.state,
                country: editLocation.billingAddress.country,
                zipcode: editLocation.billingAddress.zipcode,
              }}
              loading={updateLocation.isPending}
              errorMessage={errorMessage}
              onCancel={() => setEditLocation(null)}
              onSubmit={handleUpdateLocation}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!deleteLocation}
        onClose={() => !deleteLocationMutation.isPending && setDeleteLocation(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Location</DialogTitle>

        <DialogContent dividers>
          <Typography>
            Are you sure you want to delete {deleteLocation?.name}?
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 3 }}>
            <Button
              onClick={() => setDeleteLocation(null)}
              disabled={deleteLocationMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              color="error"
              variant="contained"
              onClick={handleDeleteLocation}
              disabled={deleteLocationMutation.isPending}
            >
              {deleteLocationMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}