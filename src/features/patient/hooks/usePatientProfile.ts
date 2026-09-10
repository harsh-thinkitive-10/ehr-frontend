import { useQuery } from '@tanstack/react-query';

import { patientService } from '../services/patientService';

export function usePatientProfile() {
    return useQuery({
        queryKey: ['patient', 'me'],
        queryFn: patientService.getMyProfile,
    });
}