import React from 'react';
import { Entry } from '../types';
import HospitalEntryDetail from './HospitalEntryDetail';
import HealthCheckEntryDetail from './HealthCheckEntryDetail';
import OccupationalHealthcareEntryDetail from './OccupationalHealthcareEntryDetail';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetail entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetail entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetail entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
