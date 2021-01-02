import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewDataEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsNonSensitiveData());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(patientService.getPatientData(id));
});

router.post('/', (req, res) => {
  try {
    const newPatientData = toNewPatientEntry(req.body);
    const newPatient = patientService.addPatient(newPatientData);

    res.send(newPatient);
  } catch (e) {
    res.status(400).send(e.message); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const { id } = req.params;
    const newDataEntry = toNewDataEntry(req.body);
    const newEntry = patientService.addPatientEntry(id, newDataEntry);

    res.send(newEntry);
  } catch (e) {
    res.status(400).send(e.message); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  }
});

export default router;
