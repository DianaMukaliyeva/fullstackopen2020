import diagnoseData from '../../data/diagnoses.json';

import { DiagnoseEntry } from '../types';

const diagnoses: DiagnoseEntry[] = diagnoseData;

const getEntries = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default {
  getEntries,
};
