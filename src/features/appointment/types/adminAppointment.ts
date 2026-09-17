import type { AppointmentStatus } from './appointment';

export interface AdminAppointment {
  appointmentDate: string;
  consultationFee: number;
  reasonForVisit: string;

  status: AppointmentStatus;

  patientFullName: string;
  patientAge: number;
  patientGender: string;
  patientEmail: string;
  patientPhoneNumber: string;

  doctorFullName: string;
  doctorEmail: string;
  doctorPhoneNumber: string;
  doctorSpecialization: string;
}

export interface AdminAppointmentPage {
  content: AdminAppointment[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}