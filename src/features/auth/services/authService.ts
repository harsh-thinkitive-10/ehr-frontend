import { apiClient } from '../../../services/api/apiClient';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      '/v1/auth/login',
      data,
    );

    return response.data;
  },

  async changePassword(
    data: ChangePasswordRequest,
  ): Promise<void> {
    await apiClient.patch(
      '/v1/auth/change-password',
      data,
    );
  },
};