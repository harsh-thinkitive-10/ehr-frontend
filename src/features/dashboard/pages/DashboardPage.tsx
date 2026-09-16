import { Navigate } from 'react-router-dom';

import { useAuth } from '../../auth/context';

import PatientDashboard from '../components/PatientDashboard';
import DoctorDashboard from '../components/DoctorDashboard';

export default function DashboardPage() {
  const { roles } = useAuth();

  if (roles.includes('PATIENT')) {
    return <PatientDashboard />;
  }

  if (roles.includes('DOCTOR')) {
    return <DoctorDashboard />;
  }

  if (roles.includes('ADMIN')) {
    return (
      <Navigate
        to="/admin/dashboard"
        replace
      />
    );
  }

  return (
    <Navigate
      to="/unauthorized"
      replace
    />
  );
}