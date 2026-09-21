import { apiClient } from '../../../services/api/apiClient';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthTokenData {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface LoginResponse {
  code: string;
  data: AuthTokenData;
  message: string;
}

export interface RefreshResponse {
  code: string;
  data: AuthTokenData;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  username: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      '/v1/auth/login',
      data,
    );

    return response.data;
  },

  async refresh(): Promise<RefreshResponse> {
    const response = await apiClient.post<RefreshResponse>(
      '/v1/auth/refresh',
    );

    return response.data;
  },

  async logout(): Promise<LogoutResponse> {
    const response = await apiClient.post<LogoutResponse>(
      '/v1/auth/logout',
    );

    return response.data;
  },

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await apiClient.patch(
      '/v1/auth/change-password',
      data,
    );
  },

  async requestPasswordReset(
    data: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> {
    const response = await apiClient.post<ForgotPasswordResponse>(
      '/v1/auth/forgot-password',
      data,
    );

    return response.data;
  },

  async resetPassword(
    data: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> {
    const response = await apiClient.post<ResetPasswordResponse>(
      '/v1/auth/reset-password',
      data,
    );

    return response.data;
  },
};