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
  isActive: boolean;
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

export interface PatientListParams {
  page?: number;
  size?: number;
  search?: string;
  gender?: PatientGender;
  age?: number;
  sort?: string;
}