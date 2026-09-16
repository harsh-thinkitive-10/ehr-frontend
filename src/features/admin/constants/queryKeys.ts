export const adminKeys = {
  all: ['admin'] as const,

  dashboard: () =>
    [
      ...adminKeys.all,
      'dashboard',
    ] as const,

  appointments: () =>
    [
      ...adminKeys.all,
      'appointments',
    ] as const,
};

export const adminAppointmentKeys = {
  all: [
    'admin-appointments',
  ] as const,

  list: (
    page: number,
    size: number,
  ) =>
    [
      ...adminAppointmentKeys.all,
      'list',
      page,
      size,
    ] as const,
};