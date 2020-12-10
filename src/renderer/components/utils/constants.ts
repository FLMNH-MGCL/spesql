import { countries } from '../../assets/countries';
import { SelectOption } from '../ui/Select';

export const conditionCountOptions = Array.from({ length: 15 }, (_, index) => {
  return { label: String(index), value: index };
});

export const headerOptions = [
  'id',
  'catalogNumber',
  'otherCatalogNumber',
  'order_',
  'genus',
  'specificEpithet',
  'recordNumber',
  'superfamily',
  'family',
  'subfamily',
  'tribe',
  'subgenus',
  'infraspecificEpithet',
  'identificationQualifier',
  'recordedBy', // First Last | First Last
  'otherCollectors',
  'identifiedBy',
  'dateIdentified',
  'verbatimDate',
  'collectedYear',
  'collectedMonth',
  'collectedDay',
  'dateEntered',
  'sex',
  'lifeStage',
  'habitat',
  'occurrenceRemarks',
  'molecularOccurrenceRemarks',
  'samplingProtocol',
  'country',
  'stateProvince',
  'county',
  'municipality',
  'locality',
  'elevationInMeters',
  'decimalLatitude',
  'decimalLongitude',
  'geodeticDatum',
  'coordinateUncertainty',
  'verbatimLatitude',
  'verbatimLongitude',
  'georeferencedBy',
  'disposition',
  'isLoaned',
  'loanInstitution',
  'loaneeName',
  'loanDate',
  'loanReturnDate',
  'preparations',
  'freezer',
  'rack',
  'box',
  'tubeSize',
  'associatedSequences',
  'associatedReferences',
  'withholdData',
  'reared',
  'recordEnteredBy',
  'modifiedInfo',
  'fieldNotes',
];

export const operators = [
  { label: '=', value: '=' },
  { label: '!=', value: '!=' },
  { label: '<', value: '<' },
  { label: '>', value: '>' },
  { label: '<=', value: '<=' },
  { label: '>=', value: '>=' },
  { label: 'REGEXP', value: 'REGEXP' },
];

export const BooleanField = [
  { label: 'Yes', value: 'Y' },
  { label: 'No', value: 'N' },
];

export const validUnits = ['m', 'ft', 'mi'];

export const fieldOptions = [
  { label: 'All', value: '*' },
  ...headerOptions.map((header) => {
    return { label: header, value: header };
  }),
];

export const identificationQualifierControl = [
  { label: 'aff', value: 'aff' },
  { label: 'cf', value: 'cf' },
  { label: 'near', value: 'near' },
  { label: 'sensu stricto', value: 'sensu stricto' },
  { label: 'sensu lato', value: 'sensu lato' },
];

export const sexControl = [
  { label: 'Male', value: 'M' },
  { label: 'Female', value: 'F' },
  { label: 'Gynandromorph', value: 'G' },
];

export const preparationsControl = [
  { label: 'Wing Voucher', value: 'Wing Voucher' },
  { label: 'Molecular Collection', value: 'Molecular Collection' },
  { label: 'Pinned Collection', value: 'Pinned Collection' },
  { label: 'Larval Collection', value: 'Larval Collection' },
  { label: 'Genetic Resources', value: 'Genetic Resources' },
];

export const tubeSizeControl = [
  { label: 'papered', value: 'papered' },
  { label: '50falcon', value: '50falcon' },
  { label: '15falcon', value: '15falcon' },
  { label: 'microcentrifuge', value: 'microcentrifuge' },
];

export const lifeStageControl = [
  { label: 'egg', value: 'egg' },
  { label: 'larva', value: 'larva' },
  { label: 'pupa', value: 'pupa' },
  { label: 'adult', value: 'adult' },
];

export const samplingProtocolControl = [
  { label: 'HandDirect', value: 'HandDirect' },
  { label: 'NetAerial', value: 'NetAerial' },
  { label: 'Light', value: 'Light' },
  { label: 'LightUV', value: 'LightUV' },
  { label: 'LightMV', value: 'LightMV' },
  { label: 'LightMH', value: 'LightMH' },
  { label: 'LightLED', value: 'LightLED' },
  { label: 'LightOther', value: 'LightOther' },
  { label: 'Bait', value: 'Bait' },
  { label: 'TrapMalaise', value: 'TrapMalaise' },
  { label: 'Trap', value: 'Trap' },
];

export const dispositionControl = [
  { label: 'Present', value: 'Present' },
  { label: 'Missing', value: 'Missing' },
  { label: 'Sample Used Up', value: 'Sample Used Up' },
  { label: 'On Loan', value: 'On Loan' },
];

export const geodeticDatumControl = [
  { label: 'EPSG:4326', value: 'EPSG:4326' },
  { label: 'WGS84', value: 'WGS84' },
  { label: 'NAD27', value: 'NAD27' },
  { label: 'Campo Inchauspe', value: 'Campo Inchauspe' },
  { label: 'European 1950', value: 'European 1950' },
  { label: 'Clarke 1866', value: 'Clarke 1866' },
  { label: 'Unknown', value: 'Unknown' },
];

export const accessRoles = [
  { label: 'Guest', value: 'guest' },
  { label: 'Manager', value: 'manager' },
  { label: 'Admin', value: 'admin' },
];

export const dateDays: SelectOption[] = Array.from(
  { length: 31 },
  (_, index) => {
    return { label: String(index + 1), value: index + 1 };
  }
);

export const dateMonths: SelectOption[] = Array.from(
  { length: 12 },
  (_, index) => {
    return { label: String(index + 1), value: index + 1 };
  }
);

export const countryControl = countries.map((country) => {
  return { label: country.name, value: country.name };
});
