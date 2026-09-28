import { useGetAvailableSlots } from '../../../sdk/generated/appointment/appointment';

import type { AppointmentSlot } from '../types/appointmentSlot';

export function useAvailableSlots(doctorUuid: string, locationUuid: string, date: string) {
    return useGetAvailableSlots(
        { doctorUuid, locationUuid, date },
        {
            query: {
                select: (response) => response.data as unknown as AppointmentSlot[],
                enabled: !!doctorUuid && !!locationUuid && !!date,
                staleTime: 0,
            },
        },
    );
}
