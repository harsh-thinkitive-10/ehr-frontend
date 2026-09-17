export interface Doctor {
  uuid: string;
  fullName: string;
  specialization: string;
  phoneNumber: string;
  email: string;
  consultationFee: number;
}

export interface DoctorPage {
  content: Doctor[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface DoctorListResponse {
  code: string;
  data: DoctorPage;
  message: string;
}