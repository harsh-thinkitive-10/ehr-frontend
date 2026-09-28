import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../../../sdk/apiClient';
import {
    getGetMyProfileQueryKey,
    getGetPatientDashboardQueryKey,
} from '../../../sdk/generated/patient/patient';

import type { Patient } from '../types/patient.types';

export interface UpdatePatientProfileRequest {
    fullName: string;
    age: number;
    gender: string;
    phoneNumber: string;
    email: string;
}

// PATCH /v1/patient/me is not in api-spec.json, so there is no generated
// operation for it yet. Replace with the generated one once the backend
// documents it.
const updateMyProfile = (data: UpdatePatientProfileRequest) =>
    apiClient<Patient>({
        url: '/v1/patient/me',
        method: 'PATCH',
        data,
    });

export function useUpdatePatientProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            data: UpdatePatientProfileRequest,
        ) =>
            updateMyProfile(data),

        onSuccess: (
            updatedPatient: Patient,
        ) => {
            queryClient.setQueryData(
                getGetMyProfileQueryKey(),
                updatedPatient,
            );

            queryClient.invalidateQueries({
                queryKey: getGetPatientDashboardQueryKey(),
            });
        },
    });
}
