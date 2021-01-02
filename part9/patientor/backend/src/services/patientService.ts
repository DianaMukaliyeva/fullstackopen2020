import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';
import { Patient, NonSensitivePatientData, NewPatientEntry, NewDataEntry, Entry } from '../types';

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
  const newPatient = { id: uuidv4(), entries: [], ...entry };
  patients.push(newPatient);

  return newPatient;
};

const addPatientEntry = (patientId: string, entry: NewDataEntry): Entry => {
  const patient = patients.find((patient) => patient.id === patientId);
  if (!patient) {
    throw new Error('Patient with this id does not exist');
  }
  const newEntry = { id: uuidv4(), ...entry };
  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatientsData,
  getPatientsNonSensitiveData,
  addPatient,
  getPatientData,
  addPatientEntry,
};
