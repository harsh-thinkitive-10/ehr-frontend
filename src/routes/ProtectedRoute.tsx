import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/context';

export default function ProtectedRoute() {
   const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}