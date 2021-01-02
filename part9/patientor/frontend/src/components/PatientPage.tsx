import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Header, Segment, Icon, List } from 'semantic-ui-react';
import { Patient, Gender } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatientInfo } from '../state';

import EntryDetails from './EntryDetails';

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

  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [patientInfo, setPatientInfo] = React.useState<Patient | undefined>();

  React.useEffect(() => {
    const getPatientInfo = async (patientId: string) => {
      const { data: patient } = await axios.get(`${apiBaseUrl}/patients/${patientId}`);
      setPatientInfo(patient);
      dispatch(updatePatientInfo(patient));
    };

    if (patients[id] && patients[id].ssn) {
      setPatientInfo(patients[id]);
    } else {
      getPatientInfo(id);
    }
  }, [id]);

  const getDiagnosisName = (code: string): string => {
    if (diagnoses[code]) {
      return diagnoses[code].name;
    }
    return '';
  };

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
      <Header as="h3">entries</Header>
      {patientInfo.entries.map((entry) => (
        <Segment key={entry.id}>
          <EntryDetails entry={entry} />

          <List bulleted style={{ paddingLeft: '10px' }}>
            {entry.diagnosisCodes?.map((code: string) => (
              <List.Item key={code}>
                {code} {getDiagnosisName(code)}
              </List.Item>
            ))}
          </List>
        </Segment>
      ))}
    </div>
  );
};

export default PatientPage;
