export interface AppointmentProvider {
  uuid: string;
  fullName: string;
  specialization: string;
  phoneNumber: string;
  email: string;
  consultationFee: number;
}

export interface AppointmentProviderPage {
  content: AppointmentProvider[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface AppointmentProviderResponse {
  code: string;
  data: AppointmentProviderPage;
  message: string;
}