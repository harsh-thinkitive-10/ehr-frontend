import {
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';

/*
 * Auth Pages
 */
import LoginPage from '../features/auth/pages/LoginPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';

/*
 * Dashboard
 */
import DashboardPage from '../features/dashboard/pages/DashboardPage';

/*
 * Patient
 */
import PatientProfilePage from '../features/patient/pages/PatientProfilePage';

/*
 * Doctor
 */
import DoctorProfilePage from '../features/doctor/pages/DoctorProfilePage';

/*
 * Appointments
 */
import AppointmentListPage from '../features/appointment/pages/AppointmentListPage';
import DoctorAppointmentListPage from '../features/appointment/pages/DoctorAppointmentListPage';

/*
 * Admin
 */
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage';
import AdminAppointmentListPage from '../features/admin/pages/AdminAppointmentListPage';

/*
 * Settings
 */
import SettingsPage from '../features/setting/pages/SettingsPage';

/*
 * Common Pages
 */
import NotFoundPage from '../pages/NotFoundPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';

/*
 * Route Guards
 */
import ProtectedRoute from '../routes/ProtectedRoute';
import RoleRoute from '../routes/RoleRoute';

/*
 * Layouts
 */
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import LoginLayout from '../layouts/LoginLayout/LoginLayout';
import AppLayout from '../layouts/AppLayout/AppLayout';

/*
 * Roles
 */
import { ROLES } from '../features/auth/constant/roles';

export const router = createBrowserRouter([
  /*
   * =========================================================
   * PUBLIC ROUTES
   * =========================================================
   */

  /*
   * Root
   */
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },

  /*
   * Authentication Routes
   */
  {
    element: (
      <AuthLayout>
        <LoginLayout />
      </AuthLayout>
    ),
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
    ],
  },

  /*
   * Password Reset
   *
   * Kept outside AuthLayout because the reset page
   * has its own layout.
   */
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },

  /*
   * =========================================================
   * PROTECTED ROUTES
   * =========================================================
   */

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          /*
           * -------------------------------------------------
           * Dashboard
           * -------------------------------------------------
           *
           * Patient -> Patient Dashboard
           * Doctor  -> Doctor Dashboard
           * Admin   -> Admin Dashboard
           *
           * DashboardPage decides which dashboard
           * should actually be rendered.
           */
          {
            element: (
              <RoleRoute
                allowedRoles={[
                  ROLES.PATIENT,
                  ROLES.DOCTOR,
                  ROLES.ADMIN,
                ]}
              />
            ),
            children: [
              {
                path: '/dashboard',
                element: <DashboardPage />,
              },
            ],
          },

          /*
           * -------------------------------------------------
           * Patient Profile
           * -------------------------------------------------
           */
          {
            element: (
              <RoleRoute
                allowedRoles={[
                  ROLES.PATIENT,
                  ROLES.ADMIN,
                ]}
              />
            ),
            children: [
              {
                path: '/patient/profile',
                element: <PatientProfilePage />,
              },
            ],
          },

          /*
           * -------------------------------------------------
           * Doctor Profile
           * -------------------------------------------------
           */
          {
            element: (
              <RoleRoute
                allowedRoles={[
                  ROLES.DOCTOR,
                  ROLES.ADMIN,
                ]}
              />
            ),
            children: [
              {
                path: '/doctor/profile',
                element: <DoctorProfilePage />,
              },
            ],
          },

          /*
           * -------------------------------------------------
           * Patient Appointments
           * -------------------------------------------------
           */
          {
            element: (
              <RoleRoute
                allowedRoles={[
                  ROLES.PATIENT,
                ]}
              />
            ),
            children: [
              {
                path: '/appointments',
                element: <AppointmentListPage />,
              },
            ],
          },

          /*
           * -------------------------------------------------
           * Doctor Appointments
           * -------------------------------------------------
           */
          {
            element: (
              <RoleRoute
                allowedRoles={[
                  ROLES.DOCTOR,
                ]}
              />
            ),
            children: [
              {
                path: '/doctor/appointments',
                element: <DoctorAppointmentListPage />,
              },
            ],
          },

          /*
           * -------------------------------------------------
           * Admin Appointments
           * -------------------------------------------------
           */
          {
            element: (
              <RoleRoute
                allowedRoles={[
                  ROLES.ADMIN,
                ]}
              />
            ),
            children: [
              {
                path: '/admin/appointments',
                element: <AdminAppointmentListPage />,
              },
            ],
          },

          /*
           * -------------------------------------------------
           * Admin Dashboard
           * -------------------------------------------------
           */
          {
            element: (
              <RoleRoute
                allowedRoles={[
                  ROLES.ADMIN,
                ]}
              />
            ),
            children: [
              {
                path: '/admin/dashboard',
                element: <AdminDashboardPage />,
              },
            ],
          },

          /*
           * -------------------------------------------------
           * Settings
           * -------------------------------------------------
           *
           * All authenticated application roles can access
           * settings.
           */
          {
            element: (
              <RoleRoute
                allowedRoles={[
                  ROLES.PATIENT,
                  ROLES.DOCTOR,
                  ROLES.ADMIN,
                ]}
              />
            ),
            children: [
              {
                path: '/settings',
                element: <SettingsPage />,
              },
            ],
          },
        ],
      },
    ],
  },

  /*
   * =========================================================
   * UNAUTHORIZED
   * =========================================================
   */
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },

  /*
   * =========================================================
   * NOT FOUND
   * =========================================================
   */
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);