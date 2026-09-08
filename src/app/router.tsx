import {
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';

import LoginPage from '../features/auth/pages/LoginPage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';

import ProtectedRoute from '../routes/ProtectedRoute';

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
    path: '/login',
    element: <LoginPage />,
  },

  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);