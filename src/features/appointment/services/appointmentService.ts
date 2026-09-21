import { apiClient } from '../../../services/api/apiClient';

import type { PatientAppointmentPage } from '../types/appointment';
import type { AdminAppointmentPage } from '../types/adminAppointment';
import type { AppointmentProvider, AppointmentProviderResponse } from '../types/appointmentProvider';
import type { DoctorAppointmentPage, DoctorAppointmentResponse } from '../types/doctorAppointment';
import type { BookAppointmentRequest } from '../types/bookAppointment';
import type { AppointmentPatient } from '../types/appointmentPatient';
import type { AppointmentStatus } from '../types/appointment';

interface ApiResponse<T> {
  code: string;
  data: T;
  message: string;
}

export interface AppointmentListParams {
  page: number;
  size: number;
}

export interface DoctorAppointmentListParams {
  page: number;
  size: number;
}

export const appointmentService = {
  async getPatientAppointments(page: number, size: number): Promise<ApiResponse<PatientAppointmentPage>> {
    const response = await apiClient.get<ApiResponse<PatientAppointmentPage>>('/v1/appointment/patient', {
      params: { page, size },
    });
    return response.data;
  },

  async getAdminAppointments(page: number, size: number): Promise<AdminAppointmentPage> {
    const response = await apiClient.get<ApiResponse<AdminAppointmentPage>>('/v1/appointment/admin', {
      params: { page, size },
    });
    return response.data.data;
  },

  async getDoctorAppointments(params: DoctorAppointmentListParams): Promise<DoctorAppointmentPage> {
    const response = await apiClient.get<DoctorAppointmentResponse>('/v1/appointment/doctor', { params });
    return response.data.data;
  },

  async getProviders(): Promise<AppointmentProvider[]> {
    const response = await apiClient.get<AppointmentProviderResponse>('/v1/doctor');
    return response.data.data.content;
  },

  async getPatients(): Promise<AppointmentPatient[]> {
    const response = await apiClient.get<ApiResponse<{ content: AppointmentPatient[] }>>('/v1/patient/patients');
    return response.data.data.content;
  },

  async bookAppointment(data: BookAppointmentRequest) {
    const response = await apiClient.post('/v1/appointment', data);
    return response.data;
  },
  async updateAppointmentStatus(uuid: string, status: AppointmentStatus) {
    const response = await apiClient.patch<ApiResponse<null>>(
      `/v1/appointment/${uuid}/status`,
      null,
      { params: { status } },
    );
    return response.data;
  },
};