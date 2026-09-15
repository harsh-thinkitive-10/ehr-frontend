import {
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';

import LoginPage from '../features/auth/pages/LoginPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';

import DashboardPage from '../features/dashboard/pages/DashboardPage';
import PatientProfilePage from '../features/patient/pages/PatientProfilePage';
import AppointmentListPage from '../features/appointment/pages/AppointmentListPage';
import SettingsPage from '../features/setting/pages/SettingsPage';

import NotFoundPage from '../pages/NotFoundPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';

import ProtectedRoute from '../routes/ProtectedRoute';
import RoleRoute from '../routes/RoleRoute';

import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import LoginLayout from '../layouts/LoginLayout/LoginLayout';
import AppLayout from '../layouts/AppLayout/AppLayout';

import { ROLES } from '../features/auth/constant/roles';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Navigate
        to="/login"
        replace
      />
    ),
  },

 
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

  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },

          {
            path: '/patient/profile',
            element: <PatientProfilePage />,
          },

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

          {
            path: '/settings',
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
 
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);