import React from 'react';
import { Grid, Button, Segment } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, DiagnosisSelection, NumberField, SelectField, FieldOption } from './FormField';
import { NewEntry } from '../types';
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const typeOptions: FieldOption[] = [
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
  { value: 'HealthCheck', label: 'Health Check' },
];

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validate = (values: any): { [field: string]: string } => {
    const requiredError = 'Field is required';
    const errors: { [field: string]: string } = {};
    if (!values.description) {
      errors.description = requiredError;
    }
    if (!values.date) {
      errors.date = requiredError;
    } else if (!isDate(values.date)) {
      errors.date = 'Date should be in next format: YYYY-MM-DD';
    }
    if (!values.specialist) {
      errors.specialist = requiredError;
    }
    if (values.type === 'Hospital') {
      if (!values.dischargeDate) {
        errors.dischargeDate = requiredError;
      } else if (!isDate(values.dischargeDate)) {
        errors.dischargeDate = 'Date should be in next format: YYYY-MM-DD';
      }
      if (!values.dischargeCriteria) {
        errors.dischargeCriteria = requiredError;
      }
    } else if (values.type === 'HealthCheck') {
      if (values.healthCheckRating !== 0 && !values.healthCheckRating) {
        errors.healthCheckRating = requiredError;
      } else if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
        errors.healthCheckRating =
          'Incorrect Health Check Rating. 0 - Healthy, 1 - LowRisk, 2 - HighRisk, 3 - CriticalRisk';
      }
    } else if (values.type === 'OccupationalHealthcare') {
      if (!values.sickLeaveStartDate) {
        errors.sickLeaveStartDate = requiredError;
      } else if (!isDate(values.sickLeaveStartDate)) {
        errors.sickLeaveStartDate = 'Date should be in next format: YYYY-MM-DD';
      }
      if (!values.sickLeaveEndDate) {
        errors.sickLeaveEndDate = requiredError;
      } else if (!isDate(values.sickLeaveEndDate)) {
        errors.sickLeaveEndDate = 'Date should be in next format: YYYY-MM-DD';
      }
      if (!values.employerName) {
        errors.employerName = requiredError;
      }
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        dischargeDate: '',
        dischargeCriteria: '',
        healthCheckRating: 0,
        employerName: '',
        sickLeaveStartDate: '',
        sickLeaveEndDate: '',
      }}
      onSubmit={onSubmit}
      validate={validate}>
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <SelectField label="Type" name="type" options={typeOptions} />
            {values.type === 'Hospital' && (
              <Segment>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="Discharge criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </Segment>
            )}
            {values.type === 'HealthCheck' && (
              <Segment>
                <Field
                  label="Health Check Rating"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
                />
              </Segment>
            )}
            {values.type === 'OccupationalHealthcare' && (
              <Segment>
                <Field
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick leave start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveStartDate"
                  component={TextField}
                />
                <Field
                  label="Sick leave end date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveEndDate"
                  component={TextField}
                />
              </Segment>
            )}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
