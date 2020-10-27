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
  collectedYear: number;
  collectedMonth: number;
  collectedDay: number;
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
  decimalLatitude: number;
  decimalLongitude: number;
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

export type PropsOf<TTag = any> = TTag extends React.ElementType
  ? React.ComponentProps<TTag>
  : never;

export const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.BACKEND_URL!
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
