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
import { SelectOption } from '@flmnh-mgcl/ui';

// TODO: ADD DOCUMENTATION

export const specialCaseEmpties = {
  collectedDay: null,
  collectedMonth: null,
  collectedYear: null,
  dateEntered: null,
  decimalLatitude: null,
  decimalLongitude: null,
  elevationInMeters: undefined,
};

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

// TODO: add ignore when REGEX
export function validateSetValue(condition: string, field: string) {
  // console.log(field);

  return determineAndRunFieldValidator(field, condition);
}

export function validateTableSelection(table: string) {
  // console.log(table);
  if (!table || !table.length) {
    return 'You must select a table';
  }

  return true;
}

// TODO:
export function validateConditionSelection(_table: string) {
  return true;
}

export function validateControlList(items: any[], control: SelectOption[]) {
  for (let i = 0; i < items.length; i++) {
    const currentValue = items[i];

    let matchedWhitespace = false;

    const hasMatch = control.some((el) => {
      if (el.value === currentValue.trim()) {
        matchedWhitespace = true;
      }

      return el.value === currentValue;
    });
    if (!hasMatch) {
      return matchedWhitespace
        ? 'Item(s) have extra whitespace between separator(s)'
        : `${currentValue} is not an accepted input`;
    }
  }

  return true;
}

// TODO: change formatting to FIRST MIDDLE LAST
// TODO: change validation, make exceptions for names such as Rio de Grande
export function validateName(name: string) {
  if (!name || !name.length) {
    return true;
  }

  const isProperNoun = validateProperNoun(name);

  if (isProperNoun === true) {
    const names = name.split(' ');

    if (names.length < 2) {
      return 'Please provide at least first and last names';
    } else if (name.indexOf(',') >= 0) {
      return 'Invalid name, detected comma';
    } else {
      return true;
    }
  } else {
    return isProperNoun;
  }
}

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

  if (!value || !value.length) {
    return 'catalogNumber is required';
  } else if (!pattern.test(value)) {
    return 'Invald format: LEP followed by 5-7 digits';
  }

  return true;
}

// FLMNH-MGCL [6digits] TODO: add me
export function validateOtherCatalogNumber(value: string) {
  let flmnhPattern = new RegExp(/^FLMNH-MGCL [0-9]{6,8}$/g);
  let mgclPattern = new RegExp(/^MGCL_[0-9]{6,8}$/g);

  if (!value || value.length < 1) {
    return true;
  } else if (!mgclPattern.test(value) && !flmnhPattern.test(value)) {
    return 'Invald format: MGCL_ or FLMNH-MGCL followed by 6-8 digits';
  }

  return true;
}

// export function validateProjectNumber(value: string) {}

// TODO: implement me?
// export function validateRecordNumber(value: string) {}

export function validateProperNoun(value: string) {
  if (!value || value.length < 1) {
    return true;
  }

  const parts = value.split(' ');
  const pattern = new RegExp(/(\b[a-z](?!\s))/g);

  if (parts.length > 1) {
    return pattern.test(value)
      ? 'Capitalize the first letter for each word'
      : true;
  } else {
    return pattern.test(value + ' ') ? 'Capitalize the first letter' : true;
  }
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

// ALL OF THESE USE validateProperNoun
// export function validateOrder(value: string) {}
// export function validateSuperFamily(value: string) {}
// export function validateFamily(value: string) {}
// export function validateSubFamily(value: string) {}
// export function validateTribe(value: string) {}
// export function validateGenus(value: string) {}
// export function validateSubGenus(value: string) {}

// ALL OF THESE USE validateLowerCase
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
export function validatePreparations(value: string[] | string) {
  if (!value || !value.length) {
    return true;
  }

  if (Array.isArray(value)) {
    return validateControlList(value, preparationsControl);
  } else {
    const splitList = value.split('|');

    if (splitList.length < 2 && (value.match(/,/g) || []).length >= 1) {
      return "It seems you're not using | as the separator";
    }

    return validateControlList(splitList, preparationsControl);
  }
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

  const qty = Qty.parse(value);

  console.log(qty);

  if (!qty) {
    return 'Invalid elevation, unexpected value(s)';
  } else if (qty.isUnitless()) {
    return 'You must provide a unit';
  } else if (!validUnits.includes(qty.units())) {
    return `Unit must be: ${validUnits.toString()}`;
  }

  return true;
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

  if (Array.isArray(value)) {
    return validateControlList(value, dispositionControl);
  } else {
    const splitList = value.split('|');

    if (splitList.length < 2 && (value.match(/,/g) || []).length >= 1) {
      return "It seems you're not using | as the separator";
    }

    return validateControlList(splitList, dispositionControl);
  }
}

// FIXME: this will short circuit true validation until data is resolved by researchers, there is conflict regarding how it should be formatted.
export function validateFreezer(value: string) {
  return true;
  if (!value || !value.length) {
    return true;
  }

  if (value === 'GRR') {
    return true;
  } else if (value.toLowerCase() === 'grr') {
    return 'Must match GRR exactly';
  }

  /* prettier-ignore */
  const pattern = new RegExp(/Kawahara\d\d/g)

  const matches = pattern.test(value);

  return matches ? true : 'Must match Kawahara## or GRR';
}

// FIXME: this will short circuit true validation until data is resolved by researchers, there is conflict regarding how it should be formatted.
// TODO: I have removed the short circuit for now
export function validateRack(value: string) {
  // return true;
  if (!value || !value.length) {
    return true;
  }

  if (value && value.length > 3) {
    // console.log(value);
    return 'Must be 1-3 characters long';
  }

  if (/\d/.test(value)) {
    return 'Racks may not have numbers (see box)';
  }

  return true;
}

export function validateBox(value: string) {
  if (!value || !value.length) {
    return true;
  }

  const parsedBox = parseInt(value, 10);

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

// TODO: needed?
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

export function validateNameListField(list: string) {
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

  for (let i = 0; i < splitList.length; i++) {
    const name = splitList[i].trim();

    if (!name || !name.length) {
      return 'Detected empty name in list';
    }

    const isValidName = validateName(name);

    // true when valid, string when invalid
    if (typeof isValidName === 'string') {
      return isValidName;
    }
  }

  return true;
}

export function validateDateField(date: string) {
  let pattern = new RegExp(/^d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g);

  if (!date || date.length < 1) {
    return true;
  }

  if (!pattern.test(date)) {
    return 'Invalid date: YYYY-MM-DD';
  }

  return true;
}

// TODO: check me please
export function validateStringDateRange(
  dateRange: string,
  futureOnly?: boolean,
  pastOnly?: boolean
) {
  if (!dateRange || !dateRange.length) {
    return true;
  }

  const parts = dateRange.split('-'); // FIXME: I am not sure if this is best

  if (parts.length !== 2) {
    return 'Malformated date range: ' + dateRange;
  }

  const from = parts[0].trim();
  const to = parts[1].trim();

  const today = new Date();

  // check if from comes before to
  if (Date.parse(from) > Date.parse(to)) {
    return 'Dates must be in chronological order (from - to)';
  }

  if (futureOnly) {
    if (Date.parse(from) < Date.parse(today.toDateString())) {
      return "'from' date must be in the future";
    } else if (Date.parse(to) < Date.parse(today.toDateString())) {
      return "'to' date must be in the future";
    }
  } else if (pastOnly) {
    if (Date.parse(from) > Date.parse(today.toDateString())) {
      return "'from' date must be in the past";
    } else if (Date.parse(to) > Date.parse(today.toDateString())) {
      return "'to' date must be in the past";
    }
  }

  return true;
}

export function validateStringConstraint(_value: any) {
  return true;
}

export function validateFixedLengthField(
  fieldName: string,
  value: string,
  maxLength: number
) {
  if (!value || !value.length) {
    return true;
  }

  if (value.length > maxLength) {
    return `${fieldName} cannot be longer than ${maxLength} characters`;
  } else {
    return true;
  }
}

function isNumeric(n: string) {
  const parsed = parseFloat(n);
  return !isNaN(parsed) && isFinite(parsed);
}

// TODO: call all above validators, return an array of errors
export function validateSpecimen(specimen: any) {
  let errors = [];

  if (!specimen.catalogNumber) {
    errors.push({
      field: 'catalogNumber',
      message: 'catalogNumber is required',
    });
  }

  const specimenKeys = Object.keys(specimen);

  for (let i = 0; i < specimenKeys.length; i++) {
    const field = specimenKeys[i];
    const ret = determineAndRunFieldValidator(field, specimen[field]);

    if (ret === true || ret === undefined) {
      continue;
    } else {
      errors.push({
        field,
        message: ret,
        fieldValue: specimen[field] as any,
        catalogNumber: specimen.catalogNumber as string,
      });
    }
  }

  return errors;
}

// TODO: types need changing?? value might be string or number or string[]
// TODO: don't call validators for REGEXP operator!!
export function determineAndRunFieldValidator(field: string, value: any) {
  switch (field) {
    case 'catalogNumber':
      return validateCatalogNumber(value);
    case 'otherCatalogNumber':
      return validateOtherCatalogNumber(value);
    case 'recordNumber':
      return true;
    case 'projectNumber':
      return validateListField(value);
    case 'otherIdentifier':
      return validateFixedLengthField('otherIdentifier', value, 25);
    case 'order_':
    case 'superfamily':
    case 'family':
    case 'subfamily':
    case 'tribe':
    case 'genus':
    case 'subgenus':
      return validateProperNoun(value);

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
      return validateProperNoun(value);
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
      return true; // FIXME: maybe not??
    case 'elevationInMeters':
      return validateElevation(value);
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
