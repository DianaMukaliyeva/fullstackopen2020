/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  NewPatientEntry,
  Gender,
  NewDataEntry,
  BaseEntry,
  HealthCheckRating,
  SickLeave,
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const parseString = (name: any, param: string): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing ${param}`);
  }

  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Date should be in next format: YYYY-MM-DD');
  }

  return new Date(date).toISOString().split('T')[0];
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Gender should be one of next: Male, Female, Other');
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseString(object.occupation, 'occupation'),
    ssn: parseString(object.ssn, 'ssn'),
    gender: parseGender(object.gender),
  };
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (rating === 0) {
    return 0;
  }
  if (!rating || isNaN(parseInt(rating)) || !isHealthCheckRating(rating)) {
    throw new Error('Healt Check Rating should be from 0 to 3');
  }
  return Number(rating);
};

const isArrayOfStrings = (diagnosisCodes: any[]): diagnosisCodes is string[] => {
  diagnosisCodes.forEach((code) => {
    if (!isString(code)) {
      throw new Error('Incorrect diagnosis codes');
    }
  });

  return true;
};

const parseDiagnosisCodes = (diagnosisCodes: any): string[] => {
  if (!diagnosisCodes) {
    return [];
  }

  if (!Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
    throw new Error(`Incorrect data: diagnosis codes`);
  }
  return diagnosisCodes;
};

const parseSickLeave = (startDate: any, endDate: any): SickLeave | undefined => {
  if (!startDate && !endDate) {
    return undefined;
  }
  const sickLeave = {
    startDate: parseDate(startDate),
    endDate: parseDate(endDate),
  };

  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewDataEntry = (object: any): NewDataEntry => {
  const newBaseEntry: Omit<BaseEntry, 'id'> = {
    description: parseString(object.description, 'description'),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  switch (object.type) {
    case 'HealthCheck':
      return {
        ...newBaseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case 'OccupationalHealthcare':
      return {
        ...newBaseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(object.employerName, 'employer name'),
        sickLeave: parseSickLeave(object.sickLeaveStartDate, object.sickLeaveEndDate),
      };
    case 'Hospital':
      return {
        ...newBaseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(object.dischargeDate),
          criteria: parseString(object.dischargeCriteria, 'discharge criteria'),
        },
      };
    default:
      throw new Error(`Incorrect or missing entry type`);
  }
};
