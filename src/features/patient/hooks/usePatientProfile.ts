import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import type {
  Dispatch,
  SetStateAction,
} from 'react';

import { patientService } from '../services/patientService';

import type { Patient } from '../types/patient.types';

interface UsePatientProfileResult {
  patient: Patient | null;
  loading: boolean;
  error: string;
  setPatient: Dispatch<
    SetStateAction<Patient | null>
  >;
}

export function usePatientProfile(): UsePatientProfileResult {
  const [patient, setPatient] =
    useState<Patient | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const data =
        await patientService.getMyProfile();

      setPatient(data);
    } catch (error) {
      console.error(
        'Failed to load patient profile:',
        error,
      );

      setError(
        'Unable to load your profile.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);


  return {
    patient,
    loading,
    error,
    setPatient,
  };
}