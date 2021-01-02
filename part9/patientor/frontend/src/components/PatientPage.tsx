import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Header, Segment, Icon, List, Button } from 'semantic-ui-react';
import { Patient, Gender, NewEntry, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatientInfo } from '../state';

import { AddEntryModal } from '../AddPatientModal';
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
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

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
  }, [id]); // eslint-disable-line

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      const updatedPatient = patients[id];
      updatedPatient.entries.push(newEntry);

      dispatch(updatePatientInfo(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
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
