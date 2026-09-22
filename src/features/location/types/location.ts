export interface BillingAddress {
  uuid?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface Location {
  uuid: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  npi: string;
  billingAddress: BillingAddress;
  taxEntity: unknown | null;
}

export interface LocationPage {
  content: Location[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface LocationListResponse {
  code: string;
  data: LocationPage;
  message: string;
}

export interface CreateLocationRequest {
  code: string;
  name: string;
  phone: string;
  email: string;
  npi: string;
  billingAddress: Omit<BillingAddress, 'uuid'>;
  taxEntity: unknown | null;
}

export interface UpdateLocationRequest {
  code: string;
  name: string;
  phone: string;
  email: string;
  npi: string;
  billingAddress: Omit<BillingAddress, 'uuid'>;
  taxEntity: unknown | null;
}