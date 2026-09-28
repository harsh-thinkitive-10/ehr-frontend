import { useGetMyProfile } from '../../../sdk/generated/patient/patient';

import type { Patient } from '../types/patient.types';

export function usePatientProfile() {
    return useGetMyProfile({
        query: {
            select: (profile) => profile as Patient,
        },
    });
}
