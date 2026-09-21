import { createBrowserRouter, Navigate } from 'react-router-dom';

// Auth
import LoginPage from '../features/auth/pages/LoginPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';

// Dashboard
import DashboardPage from '../features/dashboard/pages/DashboardPage';

// Patient
import PatientProfilePage from '../features/patient/pages/PatientProfilePage';
import PatientManagementPage from '../features/patient/pages/PatientManagementPage';

// Doctor
import DoctorProfilePage from '../features/doctor/pages/DoctorProfilePage';

// Appointments
import AppointmentListPage from '../features/appointment/pages/AppointmentListPage';
import DoctorAppointmentListPage from '../features/appointment/pages/DoctorAppointmentListPage';

// Admin
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage';
import AdminAppointmentListPage from '../features/admin/pages/AdminAppointmentListPage';
import ManagementPage from '../features/management/pages/ManagementPage';

// Settings
import SettingsPage from '../features/setting/pages/SettingsPage';

// Common
import NotFoundPage from '../pages/NotFoundPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';

// Guards
import ProtectedRoute from '../routes/ProtectedRoute';
import RoleRoute from '../routes/RoleRoute';

// Layouts
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import LoginLayout from '../layouts/LoginLayout/LoginLayout';
import AppLayout from '../layouts/AppLayout/AppLayout';

// Roles
import { ROLES } from '../features/auth/constant/roles';

export const router = createBrowserRouter([
  // =========================================================
  // PUBLIC ROUTES
  // =========================================================

  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },

  {
    element: (
      <AuthLayout>
        <LoginLayout />
      </AuthLayout>
    ),
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
    ],
  },

  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },

  // =========================================================
  // PROTECTED ROUTES
  // =========================================================

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          // -------------------------------------------------
          // DASHBOARD
          // -------------------------------------------------

          {
            element: (
              <RoleRoute
                allowedRoles={[ROLES.PATIENT, ROLES.DOCTOR, ROLES.ADMIN]}
              />
            ),
            children: [
              {
                path: '/dashboard',
                element: <DashboardPage />,
              },
            ],
          },

          // -------------------------------------------------
          // PATIENT
          // -------------------------------------------------

          {
            element: (
              <RoleRoute allowedRoles={[ROLES.PATIENT, ROLES.ADMIN]} />
            ),
            children: [
              {
                path: '/patient/profile',
                element: <PatientProfilePage />,
              },
            ],
          },

          {
            element: <RoleRoute allowedRoles={[ROLES.ADMIN]} />,
            children: [
              {
                path: '/admin/patients',
                element: <PatientManagementPage />,
              },
            ],
          },

          // -------------------------------------------------
          // DOCTOR
          // -------------------------------------------------

          {
            element: (
              <RoleRoute allowedRoles={[ROLES.DOCTOR, ROLES.ADMIN]} />
            ),
            children: [
              {
                path: '/doctor/profile',
                element: <DoctorProfilePage />,
              },
            ],
          },

          // -------------------------------------------------
          // APPOINTMENTS
          // -------------------------------------------------

          {
            element: <RoleRoute allowedRoles={[ROLES.PATIENT]} />,
            children: [
              {
                path: '/appointments',
                element: <AppointmentListPage />,
              },
            ],
          },

          {
            element: <RoleRoute allowedRoles={[ROLES.DOCTOR]} />,
            children: [
              {
                path: '/doctor/appointments',
                element: <DoctorAppointmentListPage />,
              },
            ],
          },

          {
            element: <RoleRoute allowedRoles={[ROLES.ADMIN]} />,
            children: [
              {
                path: '/admin/appointments',
                element: <AdminAppointmentListPage />,
              },
            ],
          },

          // -------------------------------------------------
          // ADMIN
          // -------------------------------------------------

          {
            element: <RoleRoute allowedRoles={[ROLES.ADMIN]} />,
            children: [
              {
                path: '/admin/dashboard',
                element: <AdminDashboardPage />,
              },
            ],
          },

          {
            element: <RoleRoute allowedRoles={[ROLES.ADMIN]} />,
            children: [
              {
                path: '/admin/management',
                element: <ManagementPage />,
              },
            ],
          },

          // -------------------------------------------------
          // SETTINGS
          // -------------------------------------------------

          {
            element: (
              <RoleRoute
                allowedRoles={[ROLES.PATIENT, ROLES.DOCTOR, ROLES.ADMIN]}
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

  // =========================================================
  // COMMON ROUTES
  // =========================================================

  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);