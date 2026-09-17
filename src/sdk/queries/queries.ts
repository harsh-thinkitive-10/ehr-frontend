// generated with @7nohe/openapi-react-query-codegen@1.4.1

import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AdminControllerService,
  AppointmentControllerService,
  AuthControllerService,
  DoctorControllerService,
  EmailTestControllerService,
  PatientControllerService,
  PrescriptionControllerService,
} from "../requests/services.gen";
import type {
  AdminProfileUpdateRequestDTO,
  AppointmentRequestDTO,
  ChangePasswordRequest,
  DoctorProfileUpdateRequestDTO,
  ForgotPasswordRequest,
  LoginDTO,
  LogoutRequest,
  PatientDTO,
  PrescriptionRequestDTO,
  RefreshTokenRequestDTO,
  RegisterPatient,
  ResetPasswordRequest,
  SetPasswordDTO,
} from "../requests/types.gen";
import * as Common from "./common";
/**
 * @param data The data for the request.
 * @param data.id
 * @returns PatientDTO OK
 * @throws ApiError
 */
export const usePatientControllerServiceGetPatientById = <
  TData = Common.PatientControllerServiceGetPatientByIdDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    id,
  }: {
    id: number;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UsePatientControllerServiceGetPatientByIdKeyFn(
      { id },
      queryKey,
    ),
    queryFn: () => PatientControllerService.getPatientById({ id }) as TData,
    ...options,
  });
/**
 * @returns PatientDTO OK
 * @throws ApiError
 */
export const usePatientControllerServiceGetMyProfile = <
  TData = Common.PatientControllerServiceGetMyProfileDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UsePatientControllerServiceGetMyProfileKeyFn(queryKey),
    queryFn: () => PatientControllerService.getMyProfile() as TData,
    ...options,
  });
/**
 * @returns Response OK
 * @throws ApiError
 */
export const usePatientControllerServiceGet = <
  TData = Common.PatientControllerServiceGetDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UsePatientControllerServiceGetKeyFn(queryKey),
    queryFn: () => PatientControllerService.get() as TData,
    ...options,
  });
/**
 * @returns PatientDashboardDTO OK
 * @throws ApiError
 */
export const usePatientControllerServiceGetDashboard = <
  TData = Common.PatientControllerServiceGetDashboardDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UsePatientControllerServiceGetDashboardKeyFn(queryKey),
    queryFn: () => PatientControllerService.getDashboard() as TData,
    ...options,
  });
/**
 * @returns Response OK
 * @throws ApiError
 */
export const useAdminControllerServiceGetAdminProfile = <
  TData = Common.AdminControllerServiceGetAdminProfileDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseAdminControllerServiceGetAdminProfileKeyFn(queryKey),
    queryFn: () => AdminControllerService.getAdminProfile() as TData,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.uuid
 * @returns Response OK
 * @throws ApiError
 */
export const usePrescriptionControllerServiceGetPrescriptionByUuid = <
  TData =
    Common.PrescriptionControllerServiceGetPrescriptionByUuidDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    uuid,
  }: {
    uuid: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UsePrescriptionControllerServiceGetPrescriptionByUuidKeyFn(
      { uuid },
      queryKey,
    ),
    queryFn: () =>
      PrescriptionControllerService.getPrescriptionByUuid({ uuid }) as TData,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.appointmentUuid
 * @returns Response OK
 * @throws ApiError
 */
export const usePrescriptionControllerServiceGetPrescriptionByAppointmentUuid =
  <
    TData =
      Common.PrescriptionControllerServiceGetPrescriptionByAppointmentUuidDefaultResponse,
    TError = unknown,
    TQueryKey extends Array<unknown> = unknown[],
  >(
    {
      appointmentUuid,
    }: {
      appointmentUuid: string;
    },
    queryKey?: TQueryKey,
    options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
  ) =>
    useQuery<TData, TError>({
      queryKey:
        Common.UsePrescriptionControllerServiceGetPrescriptionByAppointmentUuidKeyFn(
          { appointmentUuid },
          queryKey,
        ),
      queryFn: () =>
        PrescriptionControllerService.getPrescriptionByAppointmentUuid({
          appointmentUuid,
        }) as TData,
      ...options,
    });
/**
 * @param data The data for the request.
 * @param data.page Zero-based page index (0..N)
 * @param data.size The size of the page to be returned
 * @param data.sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
 * @returns Response OK
 * @throws ApiError
 */
export const useAppointmentControllerServiceGetPatientAppointments = <
  TData =
    Common.AppointmentControllerServiceGetPatientAppointmentsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    page,
    size,
    sort,
  }: {
    page?: number;
    size?: number;
    sort?: string[];
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseAppointmentControllerServiceGetPatientAppointmentsKeyFn(
      { page, size, sort },
      queryKey,
    ),
    queryFn: () =>
      AppointmentControllerService.getPatientAppointments({
        page,
        size,
        sort,
      }) as TData,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.page Zero-based page index (0..N)
 * @param data.size The size of the page to be returned
 * @param data.sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
 * @returns Response OK
 * @throws ApiError
 */
export const useAppointmentControllerServiceGetDoctorAppointments = <
  TData =
    Common.AppointmentControllerServiceGetDoctorAppointmentsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    page,
    size,
    sort,
  }: {
    page?: number;
    size?: number;
    sort?: string[];
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseAppointmentControllerServiceGetDoctorAppointmentsKeyFn(
      { page, size, sort },
      queryKey,
    ),
    queryFn: () =>
      AppointmentControllerService.getDoctorAppointments({
        page,
        size,
        sort,
      }) as TData,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.page Zero-based page index (0..N)
 * @param data.size The size of the page to be returned
 * @param data.sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
 * @returns Response OK
 * @throws ApiError
 */
export const useAppointmentControllerServiceGetAllAppointments = <
  TData = Common.AppointmentControllerServiceGetAllAppointmentsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    page,
    size,
    sort,
  }: {
    page?: number;
    size?: number;
    sort?: string[];
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseAppointmentControllerServiceGetAllAppointmentsKeyFn(
      { page, size, sort },
      queryKey,
    ),
    queryFn: () =>
      AppointmentControllerService.getAllAppointments({
        page,
        size,
        sort,
      }) as TData,
    ...options,
  });
/**
 * @returns Response OK
 * @throws ApiError
 */
export const useDoctorControllerServiceGetDoctorProfile = <
  TData = Common.DoctorControllerServiceGetDoctorProfileDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseDoctorControllerServiceGetDoctorProfileKeyFn(queryKey),
    queryFn: () => DoctorControllerService.getDoctorProfile() as TData,
    ...options,
  });
/**
 * @returns Response OK
 * @throws ApiError
 */
export const useDoctorControllerServiceGetAllDoctors = <
  TData = Common.DoctorControllerServiceGetAllDoctorsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseDoctorControllerServiceGetAllDoctorsKeyFn(queryKey),
    queryFn: () => DoctorControllerService.getAllDoctors() as TData,
    ...options,
  });
/**
 * @returns Response OK
 * @throws ApiError
 */
export const useDoctorControllerServiceGetDoctorDashboard = <
  TData = Common.DoctorControllerServiceGetDoctorDashboardDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseDoctorControllerServiceGetDoctorDashboardKeyFn(queryKey),
    queryFn: () => DoctorControllerService.getDoctorDashboard() as TData,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns PatientDTO OK
 * @throws ApiError
 */
export const usePatientControllerServiceRegisterNewPatient = <
  TData = Common.PatientControllerServiceRegisterNewPatientMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: RegisterPatient;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: RegisterPatient;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      PatientControllerService.registerNewPatient({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.email
 * @returns string OK
 * @throws ApiError
 */
export const useEmailTestControllerServiceTestEmail = <
  TData = Common.EmailTestControllerServiceTestEmailMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        email: string;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      email: string;
    },
    TContext
  >({
    mutationFn: ({ email }) =>
      EmailTestControllerService.testEmail({
        email,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns Response OK
 * @throws ApiError
 */
export const usePrescriptionControllerServiceCreatePrescription = <
  TData = Common.PrescriptionControllerServiceCreatePrescriptionMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: PrescriptionRequestDTO;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: PrescriptionRequestDTO;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      PrescriptionControllerService.createPrescription({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.patientId
 * @param data.requestBody
 * @returns unknown OK
 * @throws ApiError
 */
export const useAuthControllerServiceSetPassword = <
  TData = Common.AuthControllerServiceSetPasswordMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        patientId: number;
        requestBody: SetPasswordDTO;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      patientId: number;
      requestBody: SetPasswordDTO;
    },
    TContext
  >({
    mutationFn: ({ patientId, requestBody }) =>
      AuthControllerService.setPassword({
        patientId,
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns ResetPasswordResponse OK
 * @throws ApiError
 */
export const useAuthControllerServiceResetPassword = <
  TData = Common.AuthControllerServiceResetPasswordMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ResetPasswordRequest;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ResetPasswordRequest;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      AuthControllerService.resetPassword({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns RefreshTokenResponseDTO OK
 * @throws ApiError
 */
export const useAuthControllerServiceRefresh = <
  TData = Common.AuthControllerServiceRefreshMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: RefreshTokenRequestDTO;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: RefreshTokenRequestDTO;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      AuthControllerService.refresh({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns LogoutResponse OK
 * @throws ApiError
 */
export const useAuthControllerServiceLogout = <
  TData = Common.AuthControllerServiceLogoutMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: LogoutRequest;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: LogoutRequest;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      AuthControllerService.logout({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns LoginResponseDTO OK
 * @throws ApiError
 */
export const useAuthControllerServiceLogin = <
  TData = Common.AuthControllerServiceLoginMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: LoginDTO;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: LoginDTO;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      AuthControllerService.login({ requestBody }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns ForgotPasswordResponse OK
 * @throws ApiError
 */
export const useAuthControllerServiceForgotPassword = <
  TData = Common.AuthControllerServiceForgotPasswordMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ForgotPasswordRequest;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ForgotPasswordRequest;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      AuthControllerService.forgotPassword({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns Response OK
 * @throws ApiError
 */
export const useAppointmentControllerServiceCreateNewAppointment = <
  TData = Common.AppointmentControllerServiceCreateNewAppointmentMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: AppointmentRequestDTO;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: AppointmentRequestDTO;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      AppointmentControllerService.createNewAppointment({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.id
 * @param data.requestBody
 * @returns string OK
 * @throws ApiError
 */
export const usePatientControllerServiceChangePatient = <
  TData = Common.PatientControllerServiceChangePatientMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        id: number;
        requestBody: PatientDTO;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      id: number;
      requestBody: PatientDTO;
    },
    TContext
  >({
    mutationFn: ({ id, requestBody }) =>
      PatientControllerService.changePatient({
        id,
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns Response OK
 * @throws ApiError
 */
export const useAdminControllerServiceUpdateAdminProfile = <
  TData = Common.AdminControllerServiceUpdateAdminProfileMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: AdminProfileUpdateRequestDTO;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: AdminProfileUpdateRequestDTO;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      AdminControllerService.updateAdminProfile({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns PatientDTO OK
 * @throws ApiError
 */
export const usePatientControllerServiceUpdatePatient = <
  TData = Common.PatientControllerServiceUpdatePatientMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: PatientDTO;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: PatientDTO;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      PatientControllerService.updatePatient({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns ChangePasswordResponseDTO OK
 * @throws ApiError
 */
export const useAuthControllerServiceChangePassword = <
  TData = Common.AuthControllerServiceChangePasswordMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ChangePasswordRequest;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ChangePasswordRequest;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      AuthControllerService.changePassword({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.requestBody
 * @returns Response OK
 * @throws ApiError
 */
export const useDoctorControllerServiceUpdateDoctorProfile = <
  TData = Common.DoctorControllerServiceUpdateDoctorProfileMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: DoctorProfileUpdateRequestDTO;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: DoctorProfileUpdateRequestDTO;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      DoctorControllerService.updateDoctorProfile({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.id
 * @returns unknown OK
 * @throws ApiError
 */
export const usePatientControllerServiceDeletePatient = <
  TData = Common.PatientControllerServiceDeletePatientMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        id: number;
      },
      TContext
    >,
    "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      id: number;
    },
    TContext
  >({
    mutationFn: ({ id }) =>
      PatientControllerService.deletePatient({
        id,
      }) as unknown as Promise<TData>,
    ...options,
  });
