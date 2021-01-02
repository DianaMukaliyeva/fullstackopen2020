import React from 'react';
import { Icon } from 'semantic-ui-react';

import { HospitalEntry } from '../types';

const HospitalEntryDetail: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <>
      <b>{entry.date} </b>
      <Icon name="hospital" size="big" />
      <p>{entry.description}</p>
      <i>
        {entry.discharge.date}: {entry.discharge.criteria}
      </i>
    </>
  );
};

export default HospitalEntryDetail;
