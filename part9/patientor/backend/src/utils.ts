import { NewPatientEntry, Gender } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const parseString = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing parameter: ' + name);
  }

  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Date should be in next format: YYYY-MM-DD, not this: ' + date);
  }

  return new Date(date).toISOString().split('T')[0];
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Gender should be one of next: Male, Female, Other, not this: ' + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseString(object.occupation),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
  };
};

export default toNewPatientEntry;
