export type AppointmentStatus =
  | 'SCHEDULED'
  | 'COMPLETED'
  | 'PENDING'
  | 'CHECK_IN'
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

export interface AppointmentPage {
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

export interface AppointmentListResponse {
  code: string;
  data: AppointmentPage;
  message: string;
}