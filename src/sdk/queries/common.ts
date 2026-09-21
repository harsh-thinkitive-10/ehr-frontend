// generated with @7nohe/openapi-react-query-codegen@1.4.1

import type { UseQueryResult } from "@tanstack/react-query";
import type {
  AdminControllerService,
  AppointmentControllerService,
  AuthControllerService,
  DoctorControllerService,
  EmailTestControllerService,
  PatientControllerService,
  PrescriptionControllerService,
} from "../requests/services.gen";
export type PatientControllerServiceGetPatientByIdDefaultResponse = Awaited<
  ReturnType<typeof PatientControllerService.getPatientById>
>;
export type PatientControllerServiceGetPatientByIdQueryResult<
  TData = PatientControllerServiceGetPatientByIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientControllerServiceGetPatientByIdKey =
  "PatientControllerServiceGetPatientById";
export const UsePatientControllerServiceGetPatientByIdKeyFn = (
  {
    id,
  }: {
    id: number;
  },
  queryKey?: Array<unknown>,
) => [usePatientControllerServiceGetPatientByIdKey, ...(queryKey ?? [{ id }])];
export type PatientControllerServiceGetMyProfileDefaultResponse = Awaited<
  ReturnType<typeof PatientControllerService.getMyProfile>
>;
export type PatientControllerServiceGetMyProfileQueryResult<
  TData = PatientControllerServiceGetMyProfileDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientControllerServiceGetMyProfileKey =
  "PatientControllerServiceGetMyProfile";
export const UsePatientControllerServiceGetMyProfileKeyFn = (
  queryKey?: Array<unknown>,
) => [usePatientControllerServiceGetMyProfileKey, ...(queryKey ?? [])];
export type PatientControllerServiceGetDefaultResponse = Awaited<
  ReturnType<typeof PatientControllerService.get>
>;
export type PatientControllerServiceGetQueryResult<
  TData = PatientControllerServiceGetDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientControllerServiceGetKey = "PatientControllerServiceGet";
export const UsePatientControllerServiceGetKeyFn = (
  queryKey?: Array<unknown>,
) => [usePatientControllerServiceGetKey, ...(queryKey ?? [])];
export type PatientControllerServiceGetDashboardDefaultResponse = Awaited<
  ReturnType<typeof PatientControllerService.getDashboard>
>;
export type PatientControllerServiceGetDashboardQueryResult<
  TData = PatientControllerServiceGetDashboardDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePatientControllerServiceGetDashboardKey =
  "PatientControllerServiceGetDashboard";
export const UsePatientControllerServiceGetDashboardKeyFn = (
  queryKey?: Array<unknown>,
) => [usePatientControllerServiceGetDashboardKey, ...(queryKey ?? [])];
export type AdminControllerServiceGetAdminProfileDefaultResponse = Awaited<
  ReturnType<typeof AdminControllerService.getAdminProfile>
>;
export type AdminControllerServiceGetAdminProfileQueryResult<
  TData = AdminControllerServiceGetAdminProfileDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useAdminControllerServiceGetAdminProfileKey =
  "AdminControllerServiceGetAdminProfile";
export const UseAdminControllerServiceGetAdminProfileKeyFn = (
  queryKey?: Array<unknown>,
) => [useAdminControllerServiceGetAdminProfileKey, ...(queryKey ?? [])];
export type PrescriptionControllerServiceGetPrescriptionByUuidDefaultResponse =
  Awaited<
    ReturnType<typeof PrescriptionControllerService.getPrescriptionByUuid>
  >;
export type PrescriptionControllerServiceGetPrescriptionByUuidQueryResult<
  TData = PrescriptionControllerServiceGetPrescriptionByUuidDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePrescriptionControllerServiceGetPrescriptionByUuidKey =
  "PrescriptionControllerServiceGetPrescriptionByUuid";
export const UsePrescriptionControllerServiceGetPrescriptionByUuidKeyFn = (
  {
    uuid,
  }: {
    uuid: string;
  },
  queryKey?: Array<unknown>,
) => [
  usePrescriptionControllerServiceGetPrescriptionByUuidKey,
  ...(queryKey ?? [{ uuid }]),
];
export type PrescriptionControllerServiceGetPrescriptionByAppointmentUuidDefaultResponse =
  Awaited<
    ReturnType<
      typeof PrescriptionControllerService.getPrescriptionByAppointmentUuid
    >
  >;
export type PrescriptionControllerServiceGetPrescriptionByAppointmentUuidQueryResult<
  TData =
    PrescriptionControllerServiceGetPrescriptionByAppointmentUuidDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const usePrescriptionControllerServiceGetPrescriptionByAppointmentUuidKey =
  "PrescriptionControllerServiceGetPrescriptionByAppointmentUuid";
export const UsePrescriptionControllerServiceGetPrescriptionByAppointmentUuidKeyFn =
  (
    {
      appointmentUuid,
    }: {
      appointmentUuid: string;
    },
    queryKey?: Array<unknown>,
  ) => [
    usePrescriptionControllerServiceGetPrescriptionByAppointmentUuidKey,
    ...(queryKey ?? [{ appointmentUuid }]),
  ];
export type AppointmentControllerServiceGetPatientAppointmentsDefaultResponse =
  Awaited<
    ReturnType<typeof AppointmentControllerService.getPatientAppointments>
  >;
export type AppointmentControllerServiceGetPatientAppointmentsQueryResult<
  TData = AppointmentControllerServiceGetPatientAppointmentsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useAppointmentControllerServiceGetPatientAppointmentsKey =
  "AppointmentControllerServiceGetPatientAppointments";
export const UseAppointmentControllerServiceGetPatientAppointmentsKeyFn = (
  {
    page,
    size,
    sort,
  }: {
    page?: number;
    size?: number;
    sort?: string[];
  } = {},
  queryKey?: Array<unknown>,
) => [
  useAppointmentControllerServiceGetPatientAppointmentsKey,
  ...(queryKey ?? [{ page, size, sort }]),
];
export type AppointmentControllerServiceGetDoctorAppointmentsDefaultResponse =
  Awaited<
    ReturnType<typeof AppointmentControllerService.getDoctorAppointments>
  >;
export type AppointmentControllerServiceGetDoctorAppointmentsQueryResult<
  TData = AppointmentControllerServiceGetDoctorAppointmentsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useAppointmentControllerServiceGetDoctorAppointmentsKey =
  "AppointmentControllerServiceGetDoctorAppointments";
export const UseAppointmentControllerServiceGetDoctorAppointmentsKeyFn = (
  {
    page,
    size,
    sort,
  }: {
    page?: number;
    size?: number;
    sort?: string[];
  } = {},
  queryKey?: Array<unknown>,
) => [
  useAppointmentControllerServiceGetDoctorAppointmentsKey,
  ...(queryKey ?? [{ page, size, sort }]),
];
export type AppointmentControllerServiceGetAllAppointmentsDefaultResponse =
  Awaited<ReturnType<typeof AppointmentControllerService.getAllAppointments>>;
export type AppointmentControllerServiceGetAllAppointmentsQueryResult<
  TData = AppointmentControllerServiceGetAllAppointmentsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useAppointmentControllerServiceGetAllAppointmentsKey =
  "AppointmentControllerServiceGetAllAppointments";
export const UseAppointmentControllerServiceGetAllAppointmentsKeyFn = (
  {
    page,
    size,
    sort,
  }: {
    page?: number;
    size?: number;
    sort?: string[];
  } = {},
  queryKey?: Array<unknown>,
) => [
  useAppointmentControllerServiceGetAllAppointmentsKey,
  ...(queryKey ?? [{ page, size, sort }]),
];
export type DoctorControllerServiceGetDoctorProfileDefaultResponse = Awaited<
  ReturnType<typeof DoctorControllerService.getDoctorProfile>
>;
export type DoctorControllerServiceGetDoctorProfileQueryResult<
  TData = DoctorControllerServiceGetDoctorProfileDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useDoctorControllerServiceGetDoctorProfileKey =
  "DoctorControllerServiceGetDoctorProfile";
export const UseDoctorControllerServiceGetDoctorProfileKeyFn = (
  queryKey?: Array<unknown>,
) => [useDoctorControllerServiceGetDoctorProfileKey, ...(queryKey ?? [])];
export type DoctorControllerServiceGetAllDoctorsDefaultResponse = Awaited<
  ReturnType<typeof DoctorControllerService.getAllDoctors>
>;
export type DoctorControllerServiceGetAllDoctorsQueryResult<
  TData = DoctorControllerServiceGetAllDoctorsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useDoctorControllerServiceGetAllDoctorsKey =
  "DoctorControllerServiceGetAllDoctors";
export const UseDoctorControllerServiceGetAllDoctorsKeyFn = (
  queryKey?: Array<unknown>,
) => [useDoctorControllerServiceGetAllDoctorsKey, ...(queryKey ?? [])];
export type DoctorControllerServiceGetDoctorDashboardDefaultResponse = Awaited<
  ReturnType<typeof DoctorControllerService.getDoctorDashboard>
>;
export type DoctorControllerServiceGetDoctorDashboardQueryResult<
  TData = DoctorControllerServiceGetDoctorDashboardDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useDoctorControllerServiceGetDoctorDashboardKey =
  "DoctorControllerServiceGetDoctorDashboard";
export const UseDoctorControllerServiceGetDoctorDashboardKeyFn = (
  queryKey?: Array<unknown>,
) => [useDoctorControllerServiceGetDoctorDashboardKey, ...(queryKey ?? [])];
export type PatientControllerServiceRegisterNewPatientMutationResult = Awaited<
  ReturnType<typeof PatientControllerService.registerNewPatient>
>;
export type EmailTestControllerServiceTestEmailMutationResult = Awaited<
  ReturnType<typeof EmailTestControllerService.testEmail>
>;
export type PrescriptionControllerServiceCreatePrescriptionMutationResult =
  Awaited<ReturnType<typeof PrescriptionControllerService.createPrescription>>;
export type AuthControllerServiceSetPasswordMutationResult = Awaited<
  ReturnType<typeof AuthControllerService.setPassword>
>;
export type AuthControllerServiceResetPasswordMutationResult = Awaited<
  ReturnType<typeof AuthControllerService.resetPassword>
>;
export type AuthControllerServiceRefreshMutationResult = Awaited<
  ReturnType<typeof AuthControllerService.refresh>
>;
export type AuthControllerServiceLogoutMutationResult = Awaited<
  ReturnType<typeof AuthControllerService.logout>
>;
export type AuthControllerServiceLoginMutationResult = Awaited<
  ReturnType<typeof AuthControllerService.login>
>;
export type AuthControllerServiceForgotPasswordMutationResult = Awaited<
  ReturnType<typeof AuthControllerService.forgotPassword>
>;
export type AppointmentControllerServiceCreateNewAppointmentMutationResult =
  Awaited<ReturnType<typeof AppointmentControllerService.createNewAppointment>>;
export type PatientControllerServiceChangePatientMutationResult = Awaited<
  ReturnType<typeof PatientControllerService.changePatient>
>;
export type AdminControllerServiceUpdateAdminProfileMutationResult = Awaited<
  ReturnType<typeof AdminControllerService.updateAdminProfile>
>;
export type PatientControllerServiceUpdatePatientMutationResult = Awaited<
  ReturnType<typeof PatientControllerService.updatePatient>
>;
export type AuthControllerServiceChangePasswordMutationResult = Awaited<
  ReturnType<typeof AuthControllerService.changePassword>
>;
export type DoctorControllerServiceUpdateDoctorProfileMutationResult = Awaited<
  ReturnType<typeof DoctorControllerService.updateDoctorProfile>
>;
export type PatientControllerServiceDeletePatientMutationResult = Awaited<
  ReturnType<typeof PatientControllerService.deletePatient>
>;
