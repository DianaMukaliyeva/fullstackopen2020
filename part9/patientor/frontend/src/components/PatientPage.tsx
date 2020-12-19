import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Patient, Gender } from '../types';
import { apiBaseUrl } from '../constants';
import { Header, Segment, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

const getGender = (gender: Gender) => {
  switch (gender) {
    case 'male':
      return 'man';
    case 'female':
      return 'woman';
    case 'other':
      return 'other gender vertical';
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();
  const [patientInfo, setPatientInfo] = React.useState<Patient | undefined>();

  React.useEffect(() => {
    const getPatientInfo = async (patientId: string) => {
      const { data: patient } = await axios.get(`${apiBaseUrl}/patients/${patientId}`);
      setPatientInfo(patient);
      dispatch({ type: 'UPDATE_PATIENT_INFO', payload: patient });
    };

    if (patients[id] && patients[id].ssn) {
      setPatientInfo(patients[id]);
    } else {
      getPatientInfo(id);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!patientInfo) {
    return <Segment>Patient does not exists</Segment>;
  }

  return (
    <div>
      <Header as="h2">
        {patientInfo.name}
        <Icon name={getGender(patientInfo.gender)} />
      </Header>
      <div>ssn: {patientInfo.ssn}</div>
      <div>occupation: {patientInfo.occupation}</div>
    </div>
  );
};

export default PatientPage;
