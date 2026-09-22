import type { AppointmentStatus } from './appointment';

export interface AdminAppointment {
  uuid: string;
  appointmentDate: string;
  consultationFee: number;
  reasonForVisit: string;
  status: AppointmentStatus;

  patientUuid: string;
  patientFullName: string;
  patientAge: number;
  patientGender: string;
  patientEmail: string;
  patientPhoneNumber: string;

  doctorUuid: string;
  doctorFullName: string;
  doctorEmail: string;
  doctorPhoneNumber: string;
  doctorSpecialization: string;

  locationUuid: string | null;
  locationName: string | null;
  locationCode: string | null;
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