import React from 'react';
import { Icon } from 'semantic-ui-react';

import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareEntryDetail: React.FC<{ entry: OccupationalHealthcareEntry }> = ({
  entry,
}) => {
  return (
    <>
      <b>{entry.date} </b>
      <Icon name="treatment" size="big" />
      <b>{entry.employerName}</b>
      <p>{entry.description}</p>
      {entry.sickLeave && (
        <b>
          <i>
            sick leave dates: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </i>
        </b>
      )}
    </>
  );
};

export default OccupationalHealthcareEntryDetail;
