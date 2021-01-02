import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddPatientForm, { PatientFormValues } from './AddPatientForm';
import AddEntryForm from './AddEntryForm';
import { NewDataEntry } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
}

interface PatientProps extends Props {
  onSubmit: (values: PatientFormValues) => void;
}

interface EntryProps extends Props {
  onSubmit: (values: NewDataEntry) => void;
}

export const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: PatientProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: EntryProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);
