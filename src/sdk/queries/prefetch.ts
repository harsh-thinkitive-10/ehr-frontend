// generated with @7nohe/openapi-react-query-codegen@1.4.1

import { type QueryClient } from "@tanstack/react-query";
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
export const prefetchUsePatientControllerServiceGetPatientById = (
  queryClient: QueryClient,
  {
    id,
  }: {
    id: number;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UsePatientControllerServiceGetPatientByIdKeyFn({ id }),
    queryFn: () => PatientControllerService.getPatientById({ id }),
  });
/**
 * @returns PatientDTO OK
 * @throws ApiError
 */
export const prefetchUsePatientControllerServiceGetMyProfile = (
  queryClient: QueryClient,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UsePatientControllerServiceGetMyProfileKeyFn(),
    queryFn: () => PatientControllerService.getMyProfile(),
  });
/**
 * @returns Response OK
 * @throws ApiError
 */
export const prefetchUsePatientControllerServiceGet = (
  queryClient: QueryClient,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UsePatientControllerServiceGetKeyFn(),
    queryFn: () => PatientControllerService.get(),
  });
/**
 * @returns PatientDashboardDTO OK
 * @throws ApiError
 */
export const prefetchUsePatientControllerServiceGetDashboard = (
  queryClient: QueryClient,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UsePatientControllerServiceGetDashboardKeyFn(),
    queryFn: () => PatientControllerService.getDashboard(),
  });
/**
 * @returns Response OK
 * @throws ApiError
 */
export const prefetchUseAdminControllerServiceGetAdminProfile = (
  queryClient: QueryClient,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseAdminControllerServiceGetAdminProfileKeyFn(),
    queryFn: () => AdminControllerService.getAdminProfile(),
  });
/**
 * @param data The data for the request.
 * @param data.uuid
 * @returns Response OK
 * @throws ApiError
 */
export const prefetchUsePrescriptionControllerServiceGetPrescriptionByUuid = (
  queryClient: QueryClient,
  {
    uuid,
  }: {
    uuid: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UsePrescriptionControllerServiceGetPrescriptionByUuidKeyFn(
      { uuid },
    ),
    queryFn: () =>
      PrescriptionControllerService.getPrescriptionByUuid({ uuid }),
  });
/**
 * @param data The data for the request.
 * @param data.appointmentUuid
 * @returns Response OK
 * @throws ApiError
 */
export const prefetchUsePrescriptionControllerServiceGetPrescriptionByAppointmentUuid =
  (
    queryClient: QueryClient,
    {
      appointmentUuid,
    }: {
      appointmentUuid: string;
    },
  ) =>
    queryClient.prefetchQuery({
      queryKey:
        Common.UsePrescriptionControllerServiceGetPrescriptionByAppointmentUuidKeyFn(
          { appointmentUuid },
        ),
      queryFn: () =>
        PrescriptionControllerService.getPrescriptionByAppointmentUuid({
          appointmentUuid,
        }),
    });
/**
 * @param data The data for the request.
 * @param data.page Zero-based page index (0..N)
 * @param data.size The size of the page to be returned
 * @param data.sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
 * @returns Response OK
 * @throws ApiError
 */
export const prefetchUseAppointmentControllerServiceGetPatientAppointments = (
  queryClient: QueryClient,
  {
    page,
    size,
    sort,
  }: {
    page?: number;
    size?: number;
    sort?: string[];
  } = {},
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseAppointmentControllerServiceGetPatientAppointmentsKeyFn(
      { page, size, sort },
    ),
    queryFn: () =>
      AppointmentControllerService.getPatientAppointments({ page, size, sort }),
  });
/**
 * @param data The data for the request.
 * @param data.page Zero-based page index (0..N)
 * @param data.size The size of the page to be returned
 * @param data.sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
 * @returns Response OK
 * @throws ApiError
 */
export const prefetchUseAppointmentControllerServiceGetDoctorAppointments = (
  queryClient: QueryClient,
  {
    page,
    size,
    sort,
  }: {
    page?: number;
    size?: number;
    sort?: string[];
  } = {},
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseAppointmentControllerServiceGetDoctorAppointmentsKeyFn({
      page,
      size,
      sort,
    }),
    queryFn: () =>
      AppointmentControllerService.getDoctorAppointments({ page, size, sort }),
  });
/**
 * @param data The data for the request.
 * @param data.page Zero-based page index (0..N)
 * @param data.size The size of the page to be returned
 * @param data.sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
 * @returns Response OK
 * @throws ApiError
 */
export const prefetchUseAppointmentControllerServiceGetAllAppointments = (
  queryClient: QueryClient,
  {
    page,
    size,
    sort,
  }: {
    page?: number;
    size?: number;
    sort?: string[];
  } = {},
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseAppointmentControllerServiceGetAllAppointmentsKeyFn({
      page,
      size,
      sort,
    }),
    queryFn: () =>
      AppointmentControllerService.getAllAppointments({ page, size, sort }),
  });
/**
 * @returns Response OK
 * @throws ApiError
 */
export const prefetchUseDoctorControllerServiceGetDoctorProfile = (
  queryClient: QueryClient,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseDoctorControllerServiceGetDoctorProfileKeyFn(),
    queryFn: () => DoctorControllerService.getDoctorProfile(),
  });
/**
 * @returns Response OK
 * @throws ApiError
 */
export const prefetchUseDoctorControllerServiceGetAllDoctors = (
  queryClient: QueryClient,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseDoctorControllerServiceGetAllDoctorsKeyFn(),
    queryFn: () => DoctorControllerService.getAllDoctors(),
  });
/**
 * @returns Response OK
 * @throws ApiError
 */
export const prefetchUseDoctorControllerServiceGetDoctorDashboard = (
  queryClient: QueryClient,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseDoctorControllerServiceGetDoctorDashboardKeyFn(),
    queryFn: () => DoctorControllerService.getDoctorDashboard(),
  });
