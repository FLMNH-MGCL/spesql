type StringOrNull = string | null;

export type SpecimenFields = {
  id: number;
  catalogNumber: string; // MGCL-123456
  otherCatalogNumber: string; // LEP123456
  recordNumber: StringOrNull;
  order_: StringOrNull;
  superfamily: StringOrNull;
  family: StringOrNull;
  subfamily: StringOrNull;
  tribe: StringOrNull;
  genus: StringOrNull;
  subgenus: StringOrNull;
  specificEpithet: StringOrNull;
  infraspecificEpithet: StringOrNull;
  identificationQualifier: StringOrNull;
  recordedBy: StringOrNull; // First Last | First Last
  otherCollectors: StringOrNull;
  identifiedBy: StringOrNull;
  dateIdentified: StringOrNull;
  verbatimDate: StringOrNull;
  collectedYear: number | null;
  collectedMonth: number | null;
  collectedDay: number | null;
  dateEntered: Date | null;
  sex: 'M' | 'F' | 'G' | null;
  lifeStage: StringOrNull;
  habitat: StringOrNull;
  occurrenceRemarks: StringOrNull;
  molecularOccurrenceRemarks: StringOrNull;
  samplingProtocol: StringOrNull;
  country: StringOrNull;
  stateProvince: StringOrNull;
  county: StringOrNull;
  municipality: StringOrNull;
  locality: StringOrNull;
  elevationInMeters: StringOrNull;
  decimalLatitude: number | null;
  decimalLongitude: number | null;
  geodeticDatum: StringOrNull;
  coordinateUncertainty: StringOrNull;
  verbatimLatitude: StringOrNull;
  verbatimLongitude: StringOrNull;
  georeferencedBy: StringOrNull;
  disposition: StringOrNull;
  isLoaned: StringOrNull;
  loanInstitution: StringOrNull;
  loaneeName: StringOrNull;
  loanDate: StringOrNull;
  loanReturnDate: StringOrNull;
  preparations: StringOrNull;
  freezer: StringOrNull;
  rack: StringOrNull;
  box: StringOrNull;
  tubeSize: StringOrNull;
  associatedSequences: StringOrNull;
  associatedReferences: StringOrNull;
  withholdData: StringOrNull;
  reared: StringOrNull;
  recordEnteredBy: StringOrNull;
  modifiedInfo: StringOrNull;
  fieldNotes: StringOrNull;
};

// I am creating a Partial from the Fields type because a query might not return all
// fields available
export type Specimen = Partial<SpecimenFields>;

// TODO: I HATE this solution. I need to research a better solution, I do not want
// to have to create a dummy object just to validate. I should be able to validate with
// just the type ALONE
export function isSpecimen(obj: any) {
  const obj_keys = Object.keys(obj);
  const correct_keys = Object.keys(SpecimenValidator);

  let invalidFields = [];

  for (let i = 0; i < obj_keys.length; i++) {
    const key = obj_keys[i];
    // const valid = existsInSpecimen(obj, key);
    const valid = correct_keys.includes(key);

    if (!valid) {
      invalidFields.push(key);
    }
  }

  return invalidFields;
}

export type PropsOf<TTag = any> = TTag extends React.ElementType
  ? React.ComponentProps<TTag>
  : never;

export const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.ELECTRON_WEBPACK_APP_BACKEND_URL!
    : 'http://localhost:5000';

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type MutuallyExclusive<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type NotificationContent = {
  title: string;
  message: string;
  level: 'error' | 'warning' | 'success';
};

// TODO: see above @isSpecimen
const SpecimenValidator: Specimen = {
  id: 0,
  catalogNumber: '', // MGCL-123456
  otherCatalogNumber: '', // LEP123456
  recordNumber: null,
  order_: null,
  superfamily: null,
  family: null,
  subfamily: null,
  tribe: null,
  genus: null,
  subgenus: null,
  specificEpithet: null,
  infraspecificEpithet: null,
  identificationQualifier: null,
  recordedBy: null, // First Last | First Last
  otherCollectors: null,
  identifiedBy: null,
  dateIdentified: null,
  verbatimDate: null,
  collectedYear: 0,
  collectedMonth: 0,
  collectedDay: 0,
  dateEntered: null,
  sex: null,
  lifeStage: null,
  habitat: null,
  occurrenceRemarks: null,
  molecularOccurrenceRemarks: null,
  samplingProtocol: null,
  country: null,
  stateProvince: null,
  county: null,
  municipality: null,
  locality: null,
  elevationInMeters: null,
  decimalLatitude: 0,
  decimalLongitude: 0,
  geodeticDatum: null,
  coordinateUncertainty: null,
  verbatimLatitude: null,
  verbatimLongitude: null,
  georeferencedBy: null,
  disposition: null,
  isLoaned: null,
  loanInstitution: null,
  loaneeName: null,
  loanDate: null,
  loanReturnDate: null,
  preparations: null,
  freezer: null,
  rack: null,
  box: null,
  tubeSize: null,
  associatedSequences: null,
  associatedReferences: null,
  withholdData: null,
  reared: null,
  recordEnteredBy: null,
  modifiedInfo: null,
  fieldNotes: null,
};

export type TableStats = {
  table_name: string;
  rows: number;
  size: number;
};
