import { SelectOption } from '@flmnh-mgcl/ui';
import { countries } from '../../assets/countries';

export const conditionCountOptions = Array.from({ length: 15 }, (_, index) => {
  return { label: String(index), value: index };
});

export const numericalSetCountOptions = Array.from(
  { length: 15 },
  (_, index) => {
    return { label: String(index + 2), value: index + 2 };
  }
);

export const headerOptions = [
  'id',
  'catalogNumber',
  'otherCatalogNumber',
  'otherIdentifier',
  'projectNumber',
  'order',
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
  { label: 'in', value: 'in' },
  { label: 'not in', value: 'not in' },
  { label: 'is not null', value: 'is not null' },
  { label: 'is null', value: 'is null' },
  { label: 'like', value: 'like' },
  { label: 'between', value: 'between' },
  { label: 'not between', value: 'not between' },
  { label: 'regexp', value: 'regexp' },
  { label: 'not regexp', value: 'not regexp' },
];

// nots are handled separately
export const operatorToKey = {
  '>': '$gt',
  '>=': '$gte',
  '<': '$lt',
  '<=': '$lte',
  '!=': '$ne',
  in: '$in',
  'not in': '$nin',
  like: '$like',
  regexp: '$re',
};

export const fieldToConditionalKey = {
  id: 'id',
  catalogNumber: 'catalogNumber',
  otherCatalogNumber: 'otherCatalogNumber',
  recordNumber: 'recordNumber',
  projectNumber: 'projectNumber',
  otherIdentifier: 'otherIdentifier',
  reared: 'reared',
  withholdData: 'withholdData',

  //=== lab ===//
  labName: 'lab.labName',

  //=== taxonomy ===//
  order: 'taxonomy.order',
  superfamily: 'taxonomy.superfamily',
  family: 'taxonomy.family',
  subfamily: 'taxonomy.subfamily',
  tribe: 'taxonomy.tribe',
  genus: 'taxonomy.genus',
  subgenus: 'taxonomy.subgenus',
  specificEpithet: 'taxonomy.specificEpithet',
  infraspecificEpithet: 'taxonomy.infraspecificEpithet',

  //=== collectionEvent ===//
  recordedBy: 'collectionEvent.recordedBy',
  identifiedBy: 'collectionEvent.identifiedBy',
  dateIdentified: 'collectionEvent.dateIdentified',
  verbatimDate: 'collectionEvent.verbatimDate',
  collectedYear: 'collectionEvent.collectedYear',
  collectedMonth: 'collectionEvent.collectedMonth',
  collectedDay: 'collectionEvent.collectedDay',
  fieldNotes: 'collectionEvent.fieldNotes',
  otherCollectors: 'collectionEvent.otherCollectors',

  //=== collectionEvent.location ===//
  stateProvince: 'collectionEvent.location.stateProvince',
  country: 'collectionEvent.location.country',
  municipality: 'collectionEvent.location.municipality',
  locality: 'collectionEvent.location.locality',
  elevationInMeters: 'collectionEvent.location.elevationInMeters',
  decimalLatitude: 'collectionEvent.location.decimalLatitude',
  decimalLongitude: 'collectionEvent.location.decimalLongitude',
  geodeticDatum: 'collectionEvent.location.geodeticDatum',
  corrdinateUncertainty: 'collectionEvent.location.corrdinateUncertainty',
  verbatimLatitude: 'collectionEvent.location.verbatimLatitude',
  verbatimLongitude: 'collectionEvent.location.verbatimLongitude',

  //=== loan ===//
  to: 'loan.to',
  at: 'loan.at',
  returnDate: 'loan.returnDate',

  //=== storage ===//
  rack: 'storage.rack',
  freezer: 'storage.freezer',
  box: 'storage.box',
  tubeSize: 'storage.tubeSize',
};

export const BooleanField = [
  { label: 'Yes', value: 'Y' },
  { label: 'No', value: 'N' },
];

export const validUnits = ['m', 'ft', 'mi'];

export const fieldOptions: SelectOption[] = [
  { label: 'All', value: '*' },
  ...headerOptions.map((header) => {
    return { label: header, value: header };
  }),
];

export const updateFieldOptions = fieldOptions.filter((el) => el.value !== '*');

export const queryBuilderFields = [
  { name: 'id', label: 'id', inputType: 'number' },
  { name: 'catalogNumber', label: 'catalogNumber', inputType: 'text' },
  {
    name: 'otherCatalogNumber',
    label: 'otherCatalogNumber',
    inputType: 'text',
  },
  { name: 'otherIdentifier', label: 'otherIdentifier', inputType: 'text' },
  { name: 'projectNumber', label: 'projectNumber', inputType: 'text' },
  { name: 'order_', label: 'order_', inputType: 'text' },
  { name: 'genus', label: 'genus', inputType: 'text' },
  { name: 'specificEpithet', label: 'specificEpithet', inputType: 'text' },
  { name: 'recordNumber', label: 'recordNumber', inputType: 'text' },
  { name: 'superfamily', label: 'superfamily', inputType: 'text' },
  { name: 'family', label: 'family', inputType: 'text' },
  { name: 'subfamily', label: 'subfamily', inputType: 'text' },
  { name: 'tribe', label: 'tribe', inputType: 'text' },
  { name: 'subgenus', label: 'subgenus', inputType: 'text' },
  {
    name: 'infraspecificEpithet',
    label: 'infraspecificEpithet',
    inputType: 'text',
  },
  {
    name: 'identificationQualifier',
    label: 'identificationQualifier',
    inputType: 'text',
  },
  { name: 'recordedBy', label: 'recordedBy', inputType: 'text' },
  { name: 'otherCollectors', label: 'otherCollectors', inputType: 'text' },
  { name: 'identifiedBy', label: 'identifiedBy', inputType: 'text' },
  { name: 'dateIdentified', label: 'dateIdentified', inputType: 'text' },
  { name: 'verbatimDate', label: 'verbatimDate', inputType: 'text' },
  { name: 'collectedYear', label: 'collectedYear', inputType: 'text' },
  { name: 'collectedMonth', label: 'collectedMonth', inputType: 'text' },
  { name: 'collectedDay', label: 'collectedDay', inputType: 'text' },
  { name: 'dateEntered', label: 'dateEntered', inputType: 'text' },
  { name: 'sex', label: 'sex', inputType: 'text' },
  { name: 'lifeStage', label: 'lifeStage', inputType: 'text' },
  { name: 'habitat', label: 'habitat', inputType: 'text' },
  { name: 'occurrenceRemarks', label: 'occurrenceRemarks', inputType: 'text' },
  {
    name: 'molecularOccurrenceRemarks',
    label: 'molecularOccurrenceRemarks',
    inputType: 'text',
  },
  { name: 'samplingProtocol', label: 'samplingProtocol', inputType: 'text' },
  { name: 'country', label: 'country', inputType: 'text' },
  { name: 'stateProvince', label: 'stateProvince', inputType: 'text' },
  { name: 'county', label: 'county', inputType: 'text' },
  { name: 'municipality', label: 'municipality', inputType: 'text' },
  { name: 'locality', label: 'locality', inputType: 'text' },
  { name: 'elevationInMeters', label: 'elevationInMeters', inputType: 'text' },
  { name: 'decimalLatitude', label: 'decimalLatitude', inputType: 'text' },
  { name: 'decimalLongitude', label: 'decimalLongitude', inputType: 'text' },
  { name: 'geodeticDatum', label: 'geodeticDatum', inputType: 'text' },
  {
    name: 'coordinateUncertainty',
    label: 'coordinateUncertainty',
    inputType: 'text',
  },
  { name: 'verbatimLatitude', label: 'verbatimLatitude', inputType: 'text' },
  { name: 'verbatimLongitude', label: 'verbatimLongitude', inputType: 'text' },
  { name: 'georeferencedBy', label: 'georeferencedBy', inputType: 'text' },
  { name: 'disposition', label: 'disposition', inputType: 'text' },
  { name: 'isLoaned', label: 'isLoaned', inputType: 'text' },
  { name: 'loanInstitution', label: 'loanInstitution', inputType: 'text' },
  { name: 'loaneeName', label: 'loaneeName', inputType: 'text' },
  { name: 'loanDate', label: 'loanDate', inputType: 'text' },
  { name: 'loanReturnDate', label: 'loanReturnDate', inputType: 'text' },
  { name: 'preparations', label: 'preparations', inputType: 'text' },
  { name: 'freezer', label: 'freezer', inputType: 'text' },
  { name: 'rack', label: 'rack', inputType: 'text' },
  { name: 'box', label: 'box', inputType: 'text' },
  { name: 'tubeSize', label: 'tubeSize', inputType: 'text' },
  {
    name: 'associatedSequences',
    label: 'associatedSequences',
    inputType: 'text',
  },
  {
    name: 'associatedReferences',
    label: 'associatedReferences',
    inputType: 'text',
  },
  { name: 'withholdData', label: 'withholdData', inputType: 'text' },
  { name: 'reared', label: 'reared', inputType: 'text' },
  { name: 'recordEnteredBy', label: 'recordEnteredBy', inputType: 'text' },
  { name: 'modifiedInfo', label: 'modifiedInfo', inputType: 'text' },
  { name: 'fieldNotes', label: 'fieldNotes', inputType: 'text' },
];

export const identificationQualifierControl = [
  { label: 'aff', value: 'aff' },
  { label: 'cf', value: 'cf' },
  { label: 'near', value: 'near' },
  { label: 'sensu stricto', value: 'sensu stricto' },
  { label: 'sensu lato', value: 'sensu lato' },
  { label: 'New Genus', value: 'New Genus' },
  { label: 'New Species', value: 'New Species' },
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

  { label: 'Voucher Absent', value: 'Voucher Absent' },

  { label: 'MGCL Papered', value: 'MGCL Papered' },
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

// https://www.cia.gov/library/publications/the-world-factbook/fields/302.html

export const charts = [
  { label: 'AreaChart', value: 'AreaChart' },
  { label: 'BarChart', value: 'BarChart' },
  { label: 'BubbleChart', value: 'BubbleChart' },
  { label: 'ComboChart', value: 'ComboChart' },
  { label: 'DiffChart', value: 'DiffChart' },
  { label: 'DonutChart', value: 'DonutChart' },
  { label: 'Gantt', value: 'Gantt' },
  { label: 'Gauge', value: 'Gauge' },
  { label: 'GeoChart', value: 'GeoChart' },
  { label: 'Histogram', value: 'Histogram' },
  { label: 'LineChart', value: 'LineChart' },
  { label: 'Line', value: 'Line' },
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

export const DEFAULT_CHART_COLORS = [
  '#3366CC',
  '#DC3912',
  '#FF9900',
  '#109618',
  '#990099',
  '#3B3EAC',
  '#0099C6',
  '#DD4477',
  '#66AA00',
  '#B82E2E',
  '#316395',
  '#994499',
  '#22AA99',
  '#AAAA11',
  '#6633CC',
  '#E67300',
  '#8B0707',
  '#329262',
  '#5574A6',
  '#3B3EAC',
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

export const legendOptions = [
  { label: 'None', value: 'none' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Top', value: 'top' },
  { label: 'In', value: 'in' },
];

export const chartOrientation = [
  { label: 'Horizontal', value: 'horizontal' },
  { label: 'Vertical', value: 'vertical' },
];

export const trendLineTypes = [
  { label: 'Auto', value: '' },
  { label: 'Linear', value: 'linear' },
  { label: 'Polynomial', value: 'polynomial' },
  { label: 'Exponential', value: 'exponential' },
];

export const allRelations = [
  'lab',
  'taxonomy',
  'collectionEvent',
  'collectionEvent.location',
  'loan',
  'storage',
];

export const relationsOptions = [
  { label: 'All', value: 'all' },
  { label: 'Taxonomy', value: 'taxonomy' },
  { label: 'Collection Event', value: 'collectionEvent' },
  { label: 'Location', value: 'collectionEvent.location' },
  { label: 'Loan', value: 'loan' },
  { label: 'Storage', value: 'storage' },
];
