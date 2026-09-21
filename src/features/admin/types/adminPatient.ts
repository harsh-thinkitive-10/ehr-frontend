export type PatientGender =
  | 'MALE'
  | 'FEMALE'
  | 'OTHER';

export interface AdminPatient {
  uuid: string;
  fullName: string;
  age: number;
  gender: PatientGender;
  phoneNumber: string;
  email: string;
}

export interface PatientListResponse {
  code: string;
  data: AdminPatient[];
  message: string;
}

export interface RegisterPatientRequest {
  firstName: string;
  lastName: string;
  age: number;
  gender: PatientGender;
  phoneNumber: string;
  email: string;
}

export interface RegisterPatientResponse {
  code: string;
  data: AdminPatient;
  message: string;
}