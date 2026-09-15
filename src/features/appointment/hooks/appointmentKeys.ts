export const appointmentKeys = {
  all: ['appointments'] as const,

  patient: (page: number, size: number) =>
    [...appointmentKeys.all, 'patient', page, size] as const,
};