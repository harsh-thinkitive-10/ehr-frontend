import { useQuery } from '@tanstack/react-query';

import { patientService } from '../services/patientService';

export function usePatientDashboard() {
    return useQuery({
        queryKey: ['patient', 'dashboard'],
        queryFn: patientService.getDashboard,
    });
}