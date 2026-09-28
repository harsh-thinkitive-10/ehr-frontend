import { useGetPatientDashboard } from '../../../sdk/generated/patient/patient';

import type { PatientDashboard } from '../types/dashboard.types';

export function usePatientDashboard() {
    return useGetPatientDashboard({
        query: {
            select: (dashboard) =>
                dashboard as unknown as PatientDashboard,
        },
    });
}
