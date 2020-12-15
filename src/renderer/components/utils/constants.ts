import { GoogleChartType } from '../../types';
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
  { label: 'IS NOT NULL', value: 'IS NOT NULL' },
  { label: 'IS NULL', value: 'IS NULL' },
  { label: 'LIKE', value: 'LIKE' },
  { label: 'BETWEEN', value: 'BETWEEN' },
  { label: 'NOT BETWEEN', value: 'NOT BETWEEN' },
  { label: 'REGEXP', value: 'REGEXP' },
  { label: 'NOT REGEXP', value: 'NOT REGEXP' },
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
  { label: 'Molecular Collection', value: 'Molecular Collection' }, //
  { label: 'Pinned Collection', value: 'Pinned Collection' },
  { label: 'Larval Collection', value: 'Larval Collection' },
  { label: 'Genetic Resources', value: 'Genetic Resources' }, // cryo
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
  { label: 'Voucher Present', value: 'Voucher Present' },
  { label: 'Molecular Present', value: 'Molecular Present' },
  { label: 'Pinned Present', value: 'Pinned Present' },
  { label: 'Larval Present', value: 'Larval Present' },
  { label: 'GRR Present', value: 'GRR Present' },

  { label: 'Voucher Missing', value: 'Voucher Missing' },
  { label: 'Molecular Missing', value: 'Molecular Missing' },
  { label: 'Pinned Missing', value: 'Pinned Missing' },
  { label: 'Larval Missing', value: 'Larval Missing' },
  { label: 'GRR Missing', value: 'GRR Missing' },

  { label: 'Voucher Used Up', value: 'Voucher Used Up' },
  { label: 'Molecular Used Up', value: 'Molecular Used Up' },
  { label: 'GRR Used Up', value: 'GRR Used Up' },

  { label: 'Voucher On Loan', value: 'Voucher On Loan' },
  { label: 'Molecular On Loan', value: 'Molecular On Loan' },
  { label: 'Pinned On Loan', value: 'Pinned On Loan' },
  { label: 'Larval On Loan', value: 'Larval On Loan' },
  { label: 'GRR On Loan', value: 'GRR On Loan' },
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

export const charts = [
  { label: 'AnnotationChart', value: 'AnnotationChart' },
  { label: 'AreaChart', value: 'AreaChart' },
  { label: 'BarChart', value: 'BarChart' },
  { label: 'BubbleChart', value: 'BubbleChart' },
  { label: 'Calendar', value: 'Calendar' },
  { label: 'CandlestickChart', value: 'CandlestickChart' },
  { label: 'ColumnChart', value: 'ColumnChart' },
  { label: 'ComboChart', value: 'ComboChart' },
  { label: 'DiffChart', value: 'DiffChart' },
  { label: 'DonutChart', value: 'DonutChart' },
  { label: 'Gantt', value: 'Gantt' },
  { label: 'Gauge', value: 'Gauge' },
  { label: 'GeoChart', value: 'GeoChart' },
  { label: 'Histogram', value: 'Histogram' },
  { label: 'LineChart', value: 'LineChart' },
  { label: 'Line', value: 'Line' },
  { label: 'Bar', value: 'Bar' },
  { label: 'Map', value: 'Map' },
  { label: 'OrgChart', value: 'OrgChart' },
  { label: 'PieChart', value: 'PieChart' },
  { label: 'Sankey', value: 'Sankey' },
  { label: 'ScatterChart', value: 'ScatterChart' },
  { label: 'SteppedAreaChart', value: 'SteppedAreaChart' },
  { label: 'Table', value: 'Table' },
  { label: 'Timeline', value: 'Timeline' },
  { label: 'TreeMap', value: 'TreeMap' },
  { label: 'WaterfallChart', value: 'WaterfallChart' },
  { label: 'WordTree', value: 'WordTree' },
];

export const aggregates = [
  { label: 'AVG', value: 'AVG' },
  { label: 'COUNT', value: 'COUNT' },
  { label: 'MAX', value: 'MAX' },
  { label: 'MIN', value: 'MIN' },
  { label: 'STD', value: 'STD' },
  { label: 'STDEV', value: 'STDEV' },
  { label: 'VARIANCE', value: 'VARIANCE' },
];
