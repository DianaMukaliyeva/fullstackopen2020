import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatientData } from '../types';

const patients: Patient[] = patientData;

const getPatientsData = (): Patient[] => {
  return patients;
};

const getPatientsNonSensitiveData = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatientsData,
  getPatientsNonSensitiveData,
};
