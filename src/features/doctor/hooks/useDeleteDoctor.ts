import { useMutation } from '@tanstack/react-query';

import { deleteDoctor } from '../../../sdk/generated/doctor/doctor';

export function useDeleteDoctor() {
  return useMutation({
    mutationFn: (uuid: string) => deleteDoctor(uuid),
  });
}
