export type AppointmentStatus =
  | 'SCHEDULED'
  | 'PENDING'
  | 'CHECK_IN'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW'
  | 'RESCHEDULED'
  | 'CLOSED';

export interface PatientAppointment {
  appointmentDate: string;
  consultationFee: number;
  doctorEmail: string;
  doctorFullName: string;
  doctorPhoneNumber: string;
  doctorSpecialization: string;
  reasonForVisit: string;
  status: AppointmentStatus;
}

export interface PatientAppointmentPage {
  content: PatientAppointment[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}