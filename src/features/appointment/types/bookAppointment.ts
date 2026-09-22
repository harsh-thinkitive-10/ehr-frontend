import type { AppointmentStatus } from './appointment';

export interface BookAppointmentRequest {
  appointmentDate: string;
  reasonForVisit: string;
  status: AppointmentStatus;
  patientUuid: string;
  doctorUuid: string;
  locationUuid: string;
}

