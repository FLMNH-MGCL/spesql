import { GoogleChartTicks } from 'react-google-charts/dist/types';

export enum RequestType {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  // INSERT,
  ACCOUNTCREATION = 'ACCOUNTCREATION',
}

export enum RequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  FAILED = 'FAILED',
}

export type UserRequest = {
  id?: number;
  _type: RequestType;
  status: RequestStatus;
  from: string; // username OR name (if not registered user)
  email?: string;
  username?: string;
  institution?: string;
  title: string; // title of request
  description?: string; // optional explanation for request
  query?: string;
  password?: string;
  at?: Date;
};

export type EmailContent = {
  from: string; // admin username OR name
  toName: string; // name of person going to
  toEmail: string; // email of person going to
  userRequest: UserRequest; // request this is responding to
};

export type Values = Record<string, any>;

type StringOrNull = string | null;

export type DBLab = {
  id: number;
  labName: string;
};

export type DBTaxonomy = {
  id: number;
  order: StringOrNull;
  superfamily: StringOrNull;
  family: StringOrNull;
  subfamily: StringOrNull;
  tribe: StringOrNull;
  genus: StringOrNull;
  subgenus: StringOrNull;
  specificEpithet: StringOrNull;
  infraspecificEpithet: StringOrNull;
};

export type DBCollectionEventLocation = {
  id: number;
  stateProvince: StringOrNull;
  country: StringOrNull;
  municipality: StringOrNull;
  locality: StringOrNull;
  elevationInMeters: StringOrNull;
  decimalLatitude: number | null;
  decimalLongitude: number | null;
  geodeticDatum: StringOrNull;
  corrdinateUncertainty: StringOrNull;
  verbatimLatitude: StringOrNull;
  verbatimLongitude: StringOrNull;
};

export type DBCollectionEvent = {
  id: number;
  recordedBy: StringOrNull;
  identifiedBy: StringOrNull;
  dateIdentified: StringOrNull;
  verbatimDate: StringOrNull;
  collectedYear: StringOrNull;
  collectedMonth: StringOrNull;
  collectedDay: StringOrNull;
  fieldNotes: StringOrNull;
  otherCollectors: StringOrNull;
  location: DBCollectionEventLocation;
};

export type DBLoan = {
  id: number;
  to: string;
  at: Date;
  returnDate: Date | null;
};

export type DBStorage = {
  id: number;
  rack: StringOrNull;
  freezer: StringOrNull;
  box: StringOrNull;
  tubeSize: StringOrNull;
};

export type DBSpecimen = {
  id: number;
  catalogNumber: string;
  otherCatalogNumber: StringOrNull;
  recordNumber: StringOrNull;
  projectNumber: StringOrNull;
  otherIdentifier: StringOrNull;
  reared?: boolean;
  withholdData?: boolean;

  //=== RELATIONS ===//
  lab: DBLab;
  taxonomy: DBTaxonomy | null;
  collectionEvent: DBCollectionEvent | null;
  loan: DBLoan | null;
  storage: DBStorage | null;
};

// TODO: otherIdentifier AND projectNumber
export type SpecimenFields = {
  id: number;
  catalogNumber: string;
  otherCatalogNumber: string;
  recordNumber: StringOrNull;
  otherIdentifier: StringOrNull;
  projectNumber: StringOrNull;
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
  recordedBy: StringOrNull;
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
      invalidFields.push(key ? key : `EMPTY COLUMN AROUND ${i + 1}`);
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
  level: 'error' | 'warning' | 'success' | 'info';
};

// TODO: see above @isSpecimen
export const SpecimenValidator: Specimen = {
  id: 0,
  catalogNumber: '',
  otherCatalogNumber: '',
  otherIdentifier: null,
  projectNumber: null,
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
  recordedBy: null,
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

export type GoogleChartType =
  | 'AreaChart'
  | 'BarChart'
  | 'BubbleChart'
  | 'ComboChart'
  | 'DiffChart'
  | 'DonutChart'
  | 'Gantt'
  | 'Gauge'
  | 'GeoChart'
  | 'Histogram'
  | 'LineChart'
  | 'Line'
  | 'Map'
  | 'OrgChart'
  | 'PieChart'
  | 'Sankey'
  | 'ScatterChart'
  | 'SteppedAreaChart'
  | 'Table'
  | 'Timeline'
  | 'TreeMap'
  | 'WaterfallChart'
  | 'WordTree';

export type SankeyData = [string, string, number][];

export type ChartOptions = Partial<{
  width: number;
  height: number;
  is3D: boolean;
  title: string;
  backgroundColor: string;
  hAxis?: {
    minValue?: any;
    maxValue?: any;
    ticks?: GoogleChartTicks;
    title?: string;
    viewWindow?: {
      max?: any;
      min?: any;
    };
    [otherOptionKey: string]: any;
  };
  vAxis?: {
    minValue?: any;
    maxValue?: any;
    ticks?: GoogleChartTicks;
    title?: string;
    viewWindow?: {
      max?: any;
      min?: any;
    };
    [otherOptionKey: string]: any;
  };
  legend: any;
  colors: string[];
  [otherOptionKey: string]: any;
}>;

// TODO: add others
