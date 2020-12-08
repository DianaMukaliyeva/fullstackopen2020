import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatientData, NewPatientEntry } from '../types';

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

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = { id: uuidv4(), ...entry };
  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatientsData,
  getPatientsNonSensitiveData,
  addPatient,
};
