export const appointmentKeys = {
  all: ['appointments'] as const,

  doctor: (page: number, size: number) =>
    [
      'appointments',
      'doctor',
      {
        page,
        size,
      },
    ] as const,
};