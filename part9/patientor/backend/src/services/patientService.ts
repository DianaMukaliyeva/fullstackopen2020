import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';
import { Patient, NonSensitivePatientData, NewPatientEntry } from '../types';

const getPatientsData = (): Patient[] => {
  return patients;
};

const getPatientData = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
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
  getPatientData,
};
