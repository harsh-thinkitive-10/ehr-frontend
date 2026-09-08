export interface PatientDashboard {
  patient: {
    fullName: string;
  };

  appointments: {
    upcoming: number;
    completed: number;
  };

  prescriptions: {
    active: number;
  };

  medicalRecords: {
    total: number | null;
  };

  labReports: {
    available: number | null;
  };

  nextAppointment: {
    date: string | null;
    time: string | null;
    doctorName: string | null;
    specialization: string | null;
  };
}