export type SpecimenFields = {
  catalogNumber: string; // MGCL-123456
  otherCatalogNumber: string; // LEP123456
  recordNumber: string;
  order_: string;
  superfamily: string;
  family: string;
  subfamily: string;
  tribe: string;
  genus: string;
  subgenus: string;
  specificEpithet: string;
  infraspecificEpithet: string;
  identificationQualifier: string;
  recordedBy: string; // First Last | First Last
  otherCollectors: string;
  identifiedBy: string;
  dateIdentified: string;
  verbatimDate: string;
  collectedYear: number;
  collectedMonth: number;
  collectedDay: number;
  sex: 'M' | 'F' | 'G';
  lifeStage: string;
  habitat: string;
  occurrenceRemarks: string;
  molecularOccurrenceRemarks: string;
  samplingProtocol: string;
  country: string;
  stateProvince: string;
  county: string;
  municipality: string;
  locality: string;
  elevationInMeters: string;
  decimalLatitude: string;
  decimalLongitude: string;
  geodeticDatum: string;
  coordinateUncertainty: string;
  verbatimLatitude: string;
  verbatimLongitude: string;
  georeferencedBy: string;
  disposition: string;
  isLoaned: string;
  loanInstitution: string;
  loaneeName: string;
  loanDate: string;
  loanReturnDate: string;
  preparations: string;
  freezer: string;
  rack: string;
  box: string;
  tubeSize: string;
  associatedSequences: string;
  associatedReferences: string;
  withholdData: string;
  reared: string;
  fieldNotes: string;
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
