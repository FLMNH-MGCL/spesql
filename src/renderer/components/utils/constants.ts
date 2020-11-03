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

export const fieldOptions = [
  { label: 'All', value: '*' },
  { label: 'Lep #', value: 'otherCatalogNumber' },
  { label: 'MGCL #', value: 'catalogNumber' },
  { label: 'Record #', value: 'recordNumber' },
  { label: 'Order', value: 'order_' },
  { label: 'Superfamily', value: 'superfamily' },
  { label: 'Family', value: 'family' },
  { label: 'Subfamily', value: 'subfamily' },
  { label: 'Tribe', value: 'tribe' },
  { label: 'Genus', value: 'genus' },
  { label: 'Subgenus', value: 'subgenus' },
  { label: 'Species', value: 'specificEpithet' },
  { label: 'Subspecies', value: 'infraspecificEpithet' },
  { label: 'Identification Qual.', value: 'identificationQualifier' },
  { label: 'Recorded By', value: 'recordedBy' },
  { label: 'Other Collectors', value: 'otherCollectors' },
  { label: 'Identified By', value: 'identifiedBy' },
  { label: 'Date Identified', value: 'dateIdentified' },
  { label: 'Date', value: 'verbatimDate' },
  { label: 'Year', value: 'collectedYear' },
  { label: 'Month', value: 'collectedMonth' },
  { label: 'Day', value: 'collectedDay' },
  { label: 'Sex', value: 'sex' },
  { label: 'Life Stage', value: 'lifeStage' },
  { label: 'Habitat', value: 'habitat' },
  { label: 'Occ. Remarks', value: 'occurrenceRemarks' },
  {
    label: 'Mol. Remarks',
    value: 'molecularOccurrenceRemarks',
  },
  { label: 'Protocol', value: 'samplingProtocol' },
  { label: 'Country', value: 'country' },
  { label: 'Province', value: 'stateProvince' },
  { label: 'County', value: 'county' },
  { label: 'Municipality', value: 'municipality' },
  { label: 'Locality', value: 'locality' },
  { label: 'Elevation', value: 'elevationInMeters' },
  { label: 'Latitude', value: 'verbatimLatitude' },
  { label: 'Dec. Latitude', value: 'decimalLatitude' },
  { label: 'Longitude', value: 'verbatimLongitude' },
  { label: 'Dec. Longitude', value: 'decimalLongitude' },
  { label: 'Geodetic Datum', value: 'geodeticDatum' },
  { label: 'Coord. Uncertainty', value: 'coordinateUncertainty' },
  { label: 'Georeferenced', value: 'georeferencedBy' },
  { label: 'Loaned', value: 'isLoaned' },
  { label: 'Loan Institution', value: 'loanInstitution' },
  { label: 'Loanee Name', value: 'loaneeName' },
  { label: 'Loan Date', value: 'loanDate' },
  { label: 'Loan Return Date', value: 'loanReturnDate' },
  { label: 'Preparations', value: 'preparations' },
  { label: 'Freezer', value: 'freezer' },
  { label: 'Rack', value: 'rack' },
  { label: 'Box', value: 'box' },
  { label: 'TubSize', value: 'tubeSize' },
  { label: 'Notes', value: 'fieldNotes' },
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
