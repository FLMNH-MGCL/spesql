const reset = { key: "-1", text: "Select One", value: "" };

export const selectQueryOption = [
  { key: "0", text: "SELECT", value: "SELECT" }
];

export const updateQueryOption = [
  { key: "1", text: "UPDATE", value: "UPDATE" }
];

export const countQueryOption = [{ key: "42", text: "COUNT", value: "COUNT" }];

export const headerSelection = [
  { key: "2", text: "ALL", value: "*" },
  { key: "43", text: "Lep #", value: "recordNumber" },
  { key: "44", text: "MGCL #", value: "catalogNumber" },
  { key: "14", text: "Order", value: "order_" },
  { key: "13", text: "Superfamily", value: "superfamily" },
  { key: "11", text: "Family", value: "family" },
  { key: "12", text: "Subfamily", value: "subfamily" },
  { key: "45", text: "Tribe", value: "tribe" },
  { key: "3", text: "Genus", value: "genus" },
  { key: "46", text: "Subgenus", value: "subgenus" },
  { key: "10", text: "Species", value: "specificEpithet" },
  { key: "47", text: "Identification Qual.", value: "identificationQualifier" },
  { key: "48", text: "Recorded By", value: "recordedBy" },
  { key: "49", text: "Identified By", value: "identifiedBy" },
  { key: "50", text: "Date Identified", value: "dateIdentified" },
  { key: "51", text: "Sex", value: "sex" },
  { key: "52", text: "Life Stage", value: "lifeStage" },
  { key: "53", text: "Habitat", value: "habitat" },
  { key: "54", text: "Occurrence Remarks", value: "occurrenceRemarks" },
  { key: "55", text: "Country", value: "country" },
  { key: "56", text: "Province", value: "stateProvince" },
  { key: "57", text: "County", value: "county" },
  { key: "58", text: "Municipality", value: "municipality" },
  { key: "59", text: "Locality", value: "locality" },
  { key: "60", text: "Elevation", value: "verbatimElevation" },
  { key: "61", text: "Latitude", value: "verbatimLatitude" },
  { key: "62", text: "Longitude", value: "verbatimLongitude" },
  { key: "63", text: "Geodetic Datum", value: "geodeticDatum" },
  { key: "64", text: "Coord. Uncertainty", value: "coordinateUncertainty" },
  { key: "65", text: "Loan Info", value: "loanInfo" },
  { key: "66", text: "Preparations", value: "preparations" },
  { key: "67", text: "Freezer", value: "freezer" },
  { key: "68", text: "Rack", value: "rack" },
  { key: "69", text: "Box", value: "box" },
  { key: "70", text: "TubSize", value: "tubeSize" },
  { key: "71", text: "Collectors", value: "collectors" }
  // { key: '72', text: 'Lep', value: 'catalogNumber' },
  // { key: '73', text: 'Lep', value: 'catalogNumber' },
  // { key: '74', text: 'Lep', value: 'catalogNumber' },
  // { key: '75', text: 'Lep', value: 'catalogNumber' },
  // { key: '76', text: 'Lep', value: 'catalogNumber' },
  // { key: '77', text: 'Lep', value: 'catalogNumber' },
  // { key: '78', text: 'Lep', value: 'catalogNumber' },
];

export const filterOptions = [
  {
    key: "Lep #",
    text: "Lep #",
    value: "Lep #",
    label: { color: "blue", empty: true, circular: true }
  },
  { key: "2", text: "ALL", value: "*" },
  { key: "43", text: "Lep #", value: "recordNumber" },
  { key: "44", text: "MGCL #", value: "catalogNumber" },
  { key: "14", text: "Order", value: "order_" },
  { key: "13", text: "Superfamily", value: "superfamily" },
  { key: "11", text: "Family", value: "family" },
  { key: "12", text: "Subfamily", value: "subfamily" },
  { key: "45", text: "Tribe", value: "tribe" },
  { key: "3", text: "Genus", value: "genus" },
  { key: "46", text: "Subgenus", value: "subgenus" },
  { key: "10", text: "Species", value: "specificEpithet" },
  { key: "47", text: "Identification Qual.", value: "identificationQualifier" },
  { key: "48", text: "Recorded By", value: "recordedBy" },
  { key: "49", text: "Identified By", value: "identifiedBy" },
  { key: "50", text: "Date Identified", value: "dateIdentified" },
  { key: "51", text: "Sex", value: "sex" },
  { key: "52", text: "Life Stage", value: "lifeStage" },
  { key: "53", text: "Habitat", value: "habitat" },
  { key: "54", text: "Occurrence Remarks", value: "occurrenceRemarks" },
  { key: "55", text: "Country", value: "country" },
  { key: "56", text: "Province", value: "stateProvince" },
  { key: "57", text: "County", value: "county" },
  { key: "58", text: "Municipality", value: "municipality" },
  { key: "59", text: "Locality", value: "locality" },
  { key: "60", text: "Elevation", value: "verbatimElevation" },
  { key: "61", text: "Latitude", value: "verbatimLatitude" },
  { key: "62", text: "Longitude", value: "verbatimLongitude" },
  { key: "63", text: "Geodetic Datum", value: "geodeticDatum" },
  { key: "64", text: "Coord. Uncertainty", value: "coordinateUncertainty" },
  { key: "65", text: "Loan Info", value: "loanInfo" },
  { key: "66", text: "Preparations", value: "preparations" },
  { key: "67", text: "Freezer", value: "freezer" },
  { key: "68", text: "Rack", value: "rack" },
  { key: "69", text: "Box", value: "box" },
  { key: "70", text: "TubSize", value: "tubeSize" },
  { key: "71", text: "Collectors", value: "collectors" }
];

export const conditionalOperatorOptions = [
  { key: "4", text: "=", value: "=" },
  { key: "5", text: "!=", value: "!=" },
  { key: "6", text: "<", value: "<" },
  { key: "7", text: ">", value: ">" },
  { key: "8", text: "<=", value: "<=" },
  { key: "9", text: ">=", value: ">=" },
  { key: "22", text: "REGEXP", value: "REGEXP" }
];

export const setOperatorOptions = [{ key: "21", text: "=", value: "=" }];

export const setCountOptions = [
  { key: "15", text: "1", value: 1 },
  { key: "16", text: "2", value: 2 },
  { key: "17", text: "3", value: 3 },
  { key: "18", text: "4", value: 4 },
  { key: "19", text: "5", value: 5 },
  { key: "20", text: "6", value: 6 },
  { key: "15", text: "7", value: 7 },
  { key: "16", text: "8", value: 8 },
  { key: "17", text: "9", value: 9 },
  { key: "18", text: "10", value: 10 },
  { key: "19", text: "11", value: 11 },
  { key: "20", text: "12", value: 12 },
  { key: "15", text: "13", value: 13 },
  { key: "16", text: "14", value: 14 },
  { key: "17", text: "15", value: 15 },
  { key: "18", text: "16", value: 16 },
  { key: "19", text: "17", value: 17 },
  { key: "20", text: "18", value: 18 }
];

export const conditionalCountOptions = [
  { key: "41", text: "0", value: 0 },
  { key: "23", text: "1", value: 1 },
  { key: "24", text: "2", value: 2 },
  { key: "25", text: "3", value: 3 },
  { key: "26", text: "4", value: 4 },
  { key: "27", text: "5", value: 5 },
  { key: "28", text: "6", value: 6 },
  { key: "29", text: "7", value: 7 },
  { key: "30", text: "8", value: 8 },
  { key: "31", text: "9", value: 9 },
  { key: "32", text: "10", value: 10 },
  { key: "33", text: "11", value: 11 },
  { key: "34", text: "12", value: 12 },
  { key: "35", text: "13", value: 13 },
  { key: "36", text: "14", value: 14 },
  { key: "37", text: "15", value: 15 },
  { key: "38", text: "16", value: 16 },
  { key: "39", text: "17", value: 17 },
  { key: "40", text: "18", value: 18 }
];

export const identificationQualifierControl = [
  reset,
  { key: "72", text: "aff", value: "aff" },
  { key: "73", text: "cf", value: "cf" },
  { key: "74", text: "near", value: "near" },
  { key: "75", text: "sensu stricto", value: "sensu stricto" },
  { key: "76", text: "sensu lato", value: "sensu lato" }
];

export const samplingProtocolControl = [
  reset,
  { key: "77", text: "HandDirect", value: "HandDirect" },
  { key: "78", text: "NetAerial", value: "NetAerial" },
  { key: "79", text: "Light", value: "Light" },
  { key: "80", text: "LightUV", value: "LightUV" },
  { key: "81", text: "LightMV", value: "LightMV" },
  { key: "82", text: "LightMH", value: "LightMH" },
  { key: "83", text: "LightLED", value: "LightLED" },
  { key: "84", text: "LightOther", value: "LightOther" },
  { key: "85", text: "Bait", value: "Bait" },
  { key: "86", text: "TrapMalaise", value: "TrapMalaise" },
  { key: "87", text: "Trap", value: "Trap" }
];

// convert to one
// molecular, genetic, 
export const dispositionControl = [
  reset,
  { key: "88", text: "Present", value: "Present" },
  { key: "89", text: "Missing", value: "Missing" },
  { key: "90", text: "Sample Used Up", value: "Sample Used Up" },
  { key: "91", text: "On Loan", value: "On Loan" }
];

// wing, pinned
// export const dispositionWingControl = [
//   reset,
//   dispositionMolecularControl[0],
//   dispositionMolecularControl[1],
//   dispositionMolecularControl[3]
// ];

export const preparationsControl = [
  reset,
  { key: "92", text: "Wing Voucher", value: "Wing Voucher" },
  { key: "93", text: "Molecular Collection", value: "Molecular Collection" },
  { key: "94", text: "Pinned Collection", value: "Pinned Collection" },
  { key: "95", text: "Larval Collection", value: "Larval Collection" },
  { key: "96", text: "Genetic Resources", value: "Genetic Resources" }
];

// Freezer control will be a manual check on submit

// Rack control will be a manual check on submit

// Box control will be a manual check on submit

export const tubeSizeControl = [
  reset,
  { key: "97", text: "papered", value: "papered" },
  { key: "98", text: "50falcon", value: "50falcon" },
  { key: "99", text: "15falcon", value: "15falcon" },
  { key: "100", text: "microcentrifuge", value: "microcentrifuge" }
];

export const lifeStageControl = [
  reset,
  { key: "101", text: "egg", value: "egg" },
  { key: "102", text: "larva", value: "larva" },
  { key: "103", text: "pupa", value: "pupa" },
  { key: "104", text: "adult", value: "adult" }
];

export const sexControl = [
  reset,
  { key: "105", text: "male", value: "male" },
  { key: "106", text: "female", value: "female" },
  { key: "107", text: "gynandromorph", value: "gynandromorph" }
];

// catalogNumber control will be a manual check on submit

/*
Freezer:
Numeric (Kawahara01

Rack
Alphanumeric
1 letter or 2 or 3 or 4 or 5 or 6 or 7 or 8

Box
1 or 2 digits

sex

CatalogNumber
should always be MGCL_6 or 7 or 8 digits

NEW FIELDS:
Reared
Y or N
fieldNotes
*/
