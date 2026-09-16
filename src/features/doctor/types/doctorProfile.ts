export interface DoctorProfile {
  uuid: string;
  fullName: string;
  specialization: string;
  phoneNumber: string;
  email: string;
  consultationFee: number;
}

export interface DoctorProfileResponse {
  code: string;
  data: DoctorProfile;
  message: string;
}