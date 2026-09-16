export type DoctorAppointmentStatus =
  | 'SCHEDULED'
  | 'COMPLETED'
  | 'PENDING'
  | 'CHECK_IN'
  | 'CANCELLED'
  | 'NO_SHOW'
  | 'RESCHEDULED'
  | 'CLOSED';

export interface DoctorAppointment {
  appointmentDate: string;
  patientAge: number;
  patientEmail: string;
  patientFullName: string;
  patientGender: string;
  patientPhoneNumber: string;
  reasonForVisit: string;
  status: DoctorAppointmentStatus;
}

export interface DoctorAppointmentPage {
  content: DoctorAppointment[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface DoctorAppointmentResponse {
  code: string;
  data: DoctorAppointmentPage;
  message: string;
}