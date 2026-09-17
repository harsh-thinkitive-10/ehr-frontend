// generated with @7nohe/openapi-react-query-codegen@1.4.1

import type { UseQueryOptions } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  AdminControllerService,
  AppointmentControllerService,
  DoctorControllerService,
  PatientControllerService,
  PrescriptionControllerService,
} from "../requests/services.gen";
import * as Common from "./common";
/**
 * @param data The data for the request.
 * @param data.id
 * @returns PatientDTO OK
 * @throws ApiError
 */
export const usePatientControllerServiceGetPatientByIdSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const usePatientControllerServiceGetMyProfileSuspense = <
  TData = Common.PatientControllerServiceGetMyProfileDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UsePatientControllerServiceGetMyProfileKeyFn(queryKey),
    queryFn: () => PatientControllerService.getMyProfile() as TData,
    ...options,
  });
/**
 * @returns Response OK
 * @throws ApiError
 */
export const usePatientControllerServiceGetSuspense = <
  TData = Common.PatientControllerServiceGetDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UsePatientControllerServiceGetKeyFn(queryKey),
    queryFn: () => PatientControllerService.get() as TData,
    ...options,
  });
/**
 * @returns PatientDashboardDTO OK
 * @throws ApiError
 */
export const usePatientControllerServiceGetDashboardSuspense = <
  TData = Common.PatientControllerServiceGetDashboardDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UsePatientControllerServiceGetDashboardKeyFn(queryKey),
    queryFn: () => PatientControllerService.getDashboard() as TData,
    ...options,
  });
/**
 * @returns Response OK
 * @throws ApiError
 */
export const useAdminControllerServiceGetAdminProfileSuspense = <
  TData = Common.AdminControllerServiceGetAdminProfileDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useSuspenseQuery<TData, TError>({
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
export const usePrescriptionControllerServiceGetPrescriptionByUuidSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const usePrescriptionControllerServiceGetPrescriptionByAppointmentUuidSuspense =
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
    useSuspenseQuery<TData, TError>({
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
export const useAppointmentControllerServiceGetPatientAppointmentsSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useAppointmentControllerServiceGetDoctorAppointmentsSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useAppointmentControllerServiceGetAllAppointmentsSuspense = <
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
  useSuspenseQuery<TData, TError>({
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
export const useDoctorControllerServiceGetDoctorProfileSuspense = <
  TData = Common.DoctorControllerServiceGetDoctorProfileDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseDoctorControllerServiceGetDoctorProfileKeyFn(queryKey),
    queryFn: () => DoctorControllerService.getDoctorProfile() as TData,
    ...options,
  });
/**
 * @returns Response OK
 * @throws ApiError
 */
export const useDoctorControllerServiceGetAllDoctorsSuspense = <
  TData = Common.DoctorControllerServiceGetAllDoctorsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseDoctorControllerServiceGetAllDoctorsKeyFn(queryKey),
    queryFn: () => DoctorControllerService.getAllDoctors() as TData,
    ...options,
  });
/**
 * @returns Response OK
 * @throws ApiError
 */
export const useDoctorControllerServiceGetDoctorDashboardSuspense = <
  TData = Common.DoctorControllerServiceGetDoctorDashboardDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey:
      Common.UseDoctorControllerServiceGetDoctorDashboardKeyFn(queryKey),
    queryFn: () => DoctorControllerService.getDoctorDashboard() as TData,
    ...options,
  });
