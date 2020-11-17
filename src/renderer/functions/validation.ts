import { countries } from '../assets/countries';
import {
  identificationQualifierControl,
  sexControl,
  preparationsControl,
  tubeSizeControl,
  lifeStageControl,
  samplingProtocolControl,
  geodeticDatumControl,
  BooleanField,
  validUnits,
  dispositionControl,
} from '../components/utils/constants';

import Qty from 'js-quantities'; //https://github.com/gentooboontoo/js-quantities
import { Specimen } from '../types';

// TODO: ADD DOCUMENTATION

export const NeutralValidator = { validate: () => true };
// TODO: look into conditional register settings for validator, I do not like this solution at all

export function validateAdvancedSelectQuery(query: string) {
  if (query === '') {
    return 'Cannot be empty';
  } else if (!query.toLowerCase().startsWith('select')) {
    return 'Invalid Select query';
  } else {
    return true;
  }
}

export function validateAdvancedCountQuery(query: string) {
  if (query === '') {
    return true;
  } else if (!query.toLowerCase().startsWith('select')) {
    return 'Invalid Select query';
  } else {
    return true;
  }
}

export function validateAdvancedUpdateQuery(_query: string) {
  return 'Cannot do this yet';
}

export function validateFieldSelection(fields: string[]) {
  if (fields.length < 1) {
    return 'You must select a field';
  } else if (fields.indexOf('*') > -1 && fields.length > 1) {
    return "'All' may not be combined with other fields";
  }

  return true;
}

export function validateOperator(_operator: string) {}

// TODO: add ignore when REGEX
export function validateConditionalValue(condition: string, field: string) {
  console.log(field);

  return determineAndRunFieldValidator(field, condition);
}

export function validateTableSelection(table: string) {
  console.log(table);
  if (!table || !table.length) {
    return 'You must select a table';
  }

  return true;
}

export function validateConditionSelection(table: string) {
  console.log(table);

  return true;
}

// TODO
export function validateBooleanField(value: string) {
  if (!value || value === '') {
    return true;
  } else if (!BooleanField.some((el) => el.value === value)) {
    return `${value} is not an accepted input`;
  }

  return true;
}

export function validateCatalogNumber(value: string) {
  let pattern = new RegExp('^LEP[0-9]{5,7}');

  if (value === '') {
    return 'catalogNumber is required';
  } else if (!pattern.test(value)) {
    return 'Invald format: LEP followed by 5-7 digits';
  }

  return true;
}

export function validateOtherCatalogNumber(value: string) {
  let pattern = new RegExp('^MGCL_[0-9]{6,8}');

  if (!value || value.length < 1) {
    return true;
  } else if (!pattern.test(value)) {
    return 'Invald format: MGCL_ followed by 6-8 digits';
  }

  return true;
}

// TODO: implement me?
// export function validateRecordNumber(value: string) {}

export function validatePronoun(value: string) {
  if (!value || value.length < 1) {
    return true;
  }

  const firstLetter = value[0];

  if (firstLetter !== firstLetter.toUpperCase()) {
    return 'Capitalize the first letter';
  }

  return true;
}

export function validateLowerCase(value: string) {
  if (!value || value.length < 1) {
    return true;
  }

  // FIXME: ? should this validate in this manner? or should I only check first letter?
  if (value.toLowerCase() !== value) {
    return 'No capitalizations allowed';
  }

  return true;
}

// export function validateOrder(value: string) {}
// export function validateSuperFamily(value: string) {}
// export function validateFamily(value: string) {}
// export function validateSubFamily(value: string) {}
// export function validateTribe(value: string) {}
// export function validateGenus(value: string) {}
// export function validateSubGenus(value: string) {}
// export function validateSpecificEpithet(value: string) {}
// export function validateInfraSpecificEpithet(value: string) {}

export function validateIndentificationQualifier(values: string[] | string) {
  if (Array.isArray(values)) {
    if (!values || values.length < 1) {
      return true;
    }

    for (let value in values) {
      if (!identificationQualifierControl.some((el) => el.value === value)) {
        return `${value} is not an accepted input`;
      }
    }
  } else {
    if (!values || values.length < 1) {
      return true;
    }

    const splitList = values.split('|');

    // if there are less than 2 items in the split list, that means theres just one,
    // so if there are more commas that means the user is not formatting the list
    // correctly
    if (splitList.length < 2 && (values.match(/,/g) || []).length >= 1) {
      return "It seems you're not using | as the separator";
    }

    for (let i = 0; i < splitList.length; i++) {
      const currentValue = splitList[i];
      if (
        !identificationQualifierControl.some((el) => el.value === currentValue)
      ) {
        return `${currentValue} is not an accepted input`;
      }
    }
  }

  return true;
}

export function validateCollectedYear(value: string) {
  if (!value || value.length < 1) {
    return true;
  }

  const parsed = parseInt(value, 10);
  const currentYear = new Date().getFullYear();

  if (parsed === NaN) {
    return 'You must enter a valid integer';
  } else if (parsed < 1000) {
    return 'Invalid date: cannot be less than 1000';
  } else if (parsed > currentYear) {
    return 'Invalid date: cannot be future years';
  }

  return true;
}

export function validateCollectedMonth(value: string) {
  if (!value || value.length < 1) {
    return true;
  }

  const parsed = parseInt(value, 10);

  if (parsed === NaN) {
    return 'You must enter a valid integer';
  } else if (parsed < 0 || parsed > 12) {
    return 'Invalid month value';
  }

  return true;
}

export function validateCollectedDay(value: string) {
  if (!value || value.length < 1) {
    return true;
  }

  const parsed = parseInt(value, 10);

  if (parsed === NaN) {
    return 'You must enter a valid integer';
  } else if (parsed < 0 || parsed > 31) {
    return 'Invalid day value';
  }

  return true;
}

export function validateSex(value: string) {
  if (!value) {
    return true;
  }

  if (!sexControl.some((el) => el.value === value)) {
    return `${value} is not an accepted input`;
  }

  return true;
}

export function validateLifeStage(value: string) {
  if (!value) {
    return true;
  }

  if (!lifeStageControl.some((el) => el.value === value)) {
    return `${value} is not an accepted input`;
  }

  return true;
}

// TODO: anything?
export function validateHabitat(_value: string) {
  // if (!value || !value.length) {
  //   return true;
  // }

  return true;
}

export function validateSamplingProtocol(values: string[] | string) {
  if (Array.isArray(values)) {
    if (!values || values.length < 1) {
      return true;
    }

    for (let i = 0; i < values.length; i++) {
      const currentValue = values[i];
      if (!samplingProtocolControl.some((el) => el.value === currentValue)) {
        return `${currentValue} is not an accepted input`;
      }
    }

    return true;
  } else {
    if (!values || values.length < 1) {
      return true;
    }

    const splitList = values.split('|');

    // if there are less than 2 items in the split list, that means theres just one,
    // so if there are more commas that means the user is not formatting the list
    // correctly
    if (splitList.length < 2 && (values.match(/,/g) || []).length >= 1) {
      return "It seems you're not using | as the separator";
    }

    for (let i = 0; i < splitList.length; i++) {
      const currentValue = splitList[i];
      if (!samplingProtocolControl.some((el) => el.value === currentValue)) {
        return `${currentValue} is not an accepted input`;
      }
    }

    return true;
  }
}

export function validateCountry(value: string) {
  if (!value || !value.length) {
    return true;
  }

  if (!countries.some((country) => country.name === value)) {
    return `${value} is not an accepted input`;
  }

  return true;
}

// TODO: other locality data

export function validatePreparations(value: string) {
  if (!value) {
    return true;
  }

  if (!preparationsControl.some((el) => el.value === value)) {
    return `${value} is not an accepted input`;
  }

  return true;
}

export function validateTubeSize(value: string) {
  if (!value) {
    return true;
  }

  if (!tubeSizeControl.some((el) => el.value === value)) {
    return `${value} is not an accepted input`;
  }

  return true;
}

export function validateElevation(value: string) {
  if (!value || !value.length) {
    return true;
  }

  try {
    const qty = new Qty(value);

    if (qty.isUnitless()) {
      return 'You must provide a unit';
    } else if (!validUnits.includes(qty.units())) {
      return `Unit must be: ${validUnits.toString()}`;
    }

    return true;
  } catch {
    return 'Invalid elevation input';
  }
}

export function validateLatitude(value: string) {
  if (!value || !value.length) {
    return true;
  }

  const parsedLat = parseFloat(value);

  if (!isNumeric(value) || isNaN(parsedLat)) {
    return 'Must be numeric';
  } else if (parsedLat < -90 || parsedLat > 90) {
    return 'Value out of range: -90 <= x <= 90';
  }

  return true;
}

export function validateLongitude(value: string) {
  if (!value || !value.length) {
    return true;
  }

  const parsedLong = parseFloat(value);

  if (!isNumeric(value) || isNaN(parsedLong)) {
    return 'Must be numeric';
  } else if (parsedLong < -180 || parsedLong > 180) {
    return 'Value out of range: -180 <= x <= 180';
  }

  return true;
}

export function validateGeodeticDatum(value: string) {
  if (!value || !value.length) {
    return true;
  }

  if (!geodeticDatumControl.some((el) => el.value === value)) {
    return `${value} is not an accepted input`;
  }

  return true;
}

export function validateDisposition(value: string) {
  if (!value || !value.length) {
    return true;
  }

  if (!dispositionControl.some((el) => el.value === value)) {
    return `${value} is not an accepted input`;
  }

  return true;
}

export function validateFreezer(value: string) {
  if (!value || !value.length) {
    return true;
  }

  /* prettier-ignore */
  const pattern = new RegExp("Kawahara\d\d")

  const matches = pattern.test(value);

  return matches ?? 'Invalid: must match Kawahara##';
}

// TODO
export function validateRack(value: string) {
  if (!value || !value.length) {
    return true;
  }

  if (value && value.length > 3) {
    return 'Must be 1-3 characters long';
  }

  return true;
}

// TODO
export function validateBox(value: string) {
  if (!value || !value.length) {
    return true;
  }

  const parsedBox = parseFloat(value);

  if (!isNumeric(value) || isNaN(parsedBox)) {
    return 'Must be numeric';
  } else if (parsedBox < 1 || parsedBox > 999) {
    return 'Value out of range: 1 <= x <= 999';
  }

  return true;
}

/**
 *
 *  NON-EXACT FIELD VALIDATORS
 *
 */

// TODO
export function validateMeasuredField(_value: string) {
  return true;
}

/**
 *
 * @param list {string}
 */
export function validateListField(list: string) {
  if (!list || list.length < 1) {
    return true;
  }

  const splitList = list.split('|');

  // if there are less than 2 items in the split list, that means theres just one,
  // so if there are more commas that means the user is not formatting the list
  // correctly
  if (splitList.length < 2 && (list.match(/,/g) || []).length > 1) {
    return "It seems you're not using | as the separator";
  }

  // TODO: more validation

  return true;
}

export function validateDateField(date: string) {
  let pattern = new RegExp('^d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$');

  if (!date || date.length < 1) {
    return true;
  }

  if (!pattern.test(date)) {
    return 'Invalid date: yyyy-mm-dd';
  }

  return true;
}

function isNumeric(n: string) {
  const parsed = parseFloat(n);
  return !isNaN(parsed) && isFinite(parsed);
}

// TODO: call all above validators, return an array of errors
export function validateSpecimen(specimen: any) {
  let errors = [];

  const specimenKeys = Object.keys(specimen);

  for (let i = 0; i < specimenKeys.length; i++) {
    const field = specimenKeys[i];
    const ret = determineAndRunFieldValidator(field, specimen[field]);

    if (ret === true || ret === undefined) {
      continue;
    } else {
      errors.push({ field, message: ret });
    }
  }

  return errors;
}

// TODO:
// some fields are correct as input, but incorrect for storage. for example,
// measurements! we only store in meters, but we allow the input of ft or miles.
// this function will correct these fields and return the updated specimen
export function fixPartiallyCorrect(partiallyCorrect: Specimen) {
  // const updatedElevation = ...
  let {
    elevationInMeters,
    collectedYear,
    collectedMonth,
    collectedDay,
    dateEntered,
    decimalLatitude,
    decimalLongitude,
  } = partiallyCorrect as any;

  const elevationQuantity = partiallyCorrect.elevationInMeters
    ? new Qty(partiallyCorrect.elevationInMeters)
    : null;

  if (elevationQuantity) {
    elevationInMeters = elevationQuantity.to('m').toString();
  }

  if (!collectedYear) {
    collectedYear = null;
  } else {
    collectedYear = parseInt(collectedYear, 10); // needs to be number
  }

  if (!collectedMonth) {
    collectedMonth = null;
  } else {
    collectedMonth = parseInt(collectedMonth, 10); // needs to be number
  }

  if (!collectedDay) {
    collectedDay = null;
  } else {
    collectedDay = parseInt(collectedDay, 10); // needs to be number
  }

  // TODO: date??

  if (!decimalLatitude) {
    decimalLatitude = null;
  } else {
    decimalLatitude = parseFloat(decimalLatitude);
  }

  if (!decimalLongitude) {
    decimalLongitude = null;
  } else {
    decimalLongitude = parseFloat(decimalLongitude);
  }

  return {
    ...partiallyCorrect,
    elevationInMeters,
    collectedYear,
    collectedMonth,
    collectedDay,
    dateEntered,
    decimalLatitude,
    decimalLongitude,
  } as Specimen;
}

// TODO: types need changing?? value might be string or number or string[]
// TODO: don't call validators for REGEXP operator!!
function determineAndRunFieldValidator(field: string, value: any) {
  switch (field) {
    case 'catalogNumber':
      return validateCatalogNumber(value);
    case 'otherCatalogNumber':
      return validateOtherCatalogNumber(value);
    case 'recordNumber':
      return true;
    case 'order_':
    case 'superfamily':
    case 'family':
    case 'subfamily':
    case 'tribe':
    case 'genus':
    case 'subgenus':
      return validatePronoun(value);

    case 'specificEpithet':
      return validateLowerCase(value);
    case 'infraspecificEpithet':
      return true;
    case 'identificationQualifier':
      return validateIndentificationQualifier(value);
    case 'recordedBy':
    case 'otherCollectors':
      return validateListField(value);
    case 'identifiedBy':
      return validatePronoun(value);
    case 'dateIdentified':
      return validateDateField(value);
    case 'verbatimDate':
      return true;
    case 'collectedYear':
      return validateCollectedYear(value);
    case 'collectedMonth':
      return validateCollectedMonth(value);
    case 'collectedDay':
      return validateCollectedDay(value);
    case 'dateEntered':
      return validateDateField(value);
    case 'sex':
      return validateSex(value);
    case 'lifeStage':
      return validateLifeStage(value);
    case 'habitat':
      return validateHabitat(value);

    case 'occurrenceRemarks':
    case 'molecularOccurrenceRemarks':
      return true;

    case 'samplingProtocol':
      return validateSamplingProtocol(value);
    case 'country':
      return validateCountry(value);
    case 'stateProvince':
    case 'county':
    case 'municipality':
    case 'locality':
      return validatePronoun(value); // FIXME: maybe not??
    case 'elevationInMeters':
      return true;
    case 'decimalLatitude':
      return true;
    case 'decimalLongitude':
      return true;
    case 'geodeticDatum':
      return validateGeodeticDatum(value);
    case 'coordinateUncertainty':
      return true;
    case 'verbatimLatitude':
      return true;
    case 'verbatimLongitude':
      return true;
    case 'georeferencedBy':
      return true;
    case 'disposition':
      return validateDisposition(value);
    case 'isLoaned':
      return true;
    case 'loanInstitution':
      return true;
    case 'loaneeName':
      return true;
    case 'loanDate':
      return true;
    case 'loanReturnDate':
      return true;
    case 'preparations':
      return validatePreparations(value);
    case 'freezer':
      return validateFreezer(value);
    case 'rack':
      return validateRack(value);
    case 'box':
      return validateBox(value);
    case 'tubeSize':
      return validateTubeSize(value);
    case 'associatedSequences':
      return true;
    case 'associatedReferences':
      return true;
    case 'withholdData':
    case 'reared':
      return validateBooleanField(value);
    case 'recordEnteredBy':
      return true;
    case 'modifiedInfo':
      return true;
    case 'fieldNotes':
      return true;
    default:
      // I believe react-hook-form does some wierd async process here, and so I cannot throw this
      // error and have my boundary pick it up! TODO:
      // so for now, it just fails the validation
      // throw new Error('Invalid field was selected as a conditional!');
      return false;
  }
}
