import { useEffect, useState } from 'react';

import { patientService } from '../services/patientService';

import type { PatientDashboard } from '../types/dashboard.types';

interface UsePatientDashboardResult {
  dashboard: PatientDashboard | null;
  loading: boolean;
  error: string;
}

export function usePatientDashboard(): UsePatientDashboardResult {
  const [dashboard, setDashboard] =
    useState<PatientDashboard | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError('');

        const data =
          await patientService.getDashboard();

        setDashboard(data);
      } catch (error) {
        console.error(
          'Failed to load patient dashboard:',
          error,
        );

        setError(
          'Unable to load your dashboard.',
        );
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
  };
}