import { useMutation } from '@tanstack/react-query';

import { deletePatient } from '../../../sdk/generated/patient/patient';

export function useDeletePatient() {
  return useMutation({
    mutationFn: (uuid: string) => deletePatient(uuid),
  });
}
