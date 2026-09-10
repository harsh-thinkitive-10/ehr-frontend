import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patientService } from '../services/patientService';

import type { Patient } from '../types/patient.types';
import type { UpdatePatientProfileRequest } from '../services/patientService';

export function useUpdatePatientProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            data: UpdatePatientProfileRequest,
        ) =>
            patientService.updateMyProfile(data),

        onSuccess: (
            updatedPatient: Patient,
        ) => {
            queryClient.setQueryData(
                ['patient', 'me'],
                updatedPatient,
            );

            queryClient.invalidateQueries({
                queryKey: ['patient', 'dashboard'],
            });
        },
    });
}