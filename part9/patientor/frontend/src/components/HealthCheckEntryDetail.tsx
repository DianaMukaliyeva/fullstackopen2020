import React from 'react';
import { Icon } from 'semantic-ui-react';

import { HealthCheckEntry, HealthCheckRating } from '../types';

const HealthCheckEntryDetail: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const heartColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.CriticalRisk:
        return 'red';
      case HealthCheckRating.HighRisk:
        return 'orange';
      case HealthCheckRating.LowRisk:
        return 'yellow';
      case HealthCheckRating.Healthy:
      default:
        return 'green';
    }
  };

  return (
    <>
      <b>{entry.date} </b>
      <Icon name="doctor" size="big" />
      <p>{entry.description}</p>
      <Icon name="heart" color={heartColor(entry.healthCheckRating)} />
    </>
  );
};

export default HealthCheckEntryDetail;
