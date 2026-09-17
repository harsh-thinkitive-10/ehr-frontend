export type PatientGender =
  | 'MALE'
  | 'FEMALE'
  | 'OTHER';

export interface Patient {
  uuid: string;
  fullName: string;
  age: number;
  gender: PatientGender;
  phoneNumber: string;
  email: string;
}

export interface PatientPage {
  content: Patient[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface PatientListResponse {
  code: string;
  data: PatientPage;
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
  data: Patient;
  message: string;
}