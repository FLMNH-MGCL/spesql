import {
  identificationQualifierControl,
  sexControl,
  preparationsControl,
  tubeSizeControl,
  lifeStageControl,
  samplingProtocolControl,
  geodeticDatumControl,
} from '../components/utils/constants';

// TODO: ADD DOCUMENTATION

export const NeutralValidator = { validate: () => true };
// TODO: look into conditional register settings for validator, I do not like this solution at all

export function validateAdvancedSelectQuery(query: string) {
  if (query === '') {
    return true;
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

export function validateFieldSelection(fields: string[]) {
  console.log(fields);
  return 'bad no no';
}

// TODO: remove some of these and abstract to broad validator
// eg validatePronoun, validateLowercaseStart, etc

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

  if (value === '') {
    return 'catalogNumber is required';
  } else if (!pattern.test(value)) {
    return 'Invald format: MGCL_ followed by 6-8 digits';
  }

  return true;
}

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

// FIXME: list?
export function validateIndentificationQualifier(values: string[]) {
  if (!values || values.length < 1) {
    return true;
  }

  for (let value in values) {
    if (!identificationQualifierControl.some((el) => el.value === value)) {
      return `${value} is not an accepted input`;
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

// TODO
export function validateHabitat(value: string) {
  if (!value) {
    return true;
  }

  return true;
}

export function validateSamplingProtocol(values: string[]) {
  if (!values || values.length < 1) {
    return true;
  }

  for (let value in values) {
    if (!samplingProtocolControl.some((el) => el.value === value)) {
      return `${value} is not an accepted input`;
    }
  }

  return true;
}

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

// TODO
export function validateElevation(value: string) {
  return true;
}

// TODO
export function validateLatitude(value: string) {
  return true;
}

// TODO
export function validateLongitude(value: string) {
  return true;
}

// TODO
export function validateGeodeticDatum(value: string) {
  if (!value) {
    return true;
  }

  if (!geodeticDatumControl.some((el) => el.value === value)) {
    return `${value} is not an accepted input`;
  }

  return true;
}

// TODO
export function validateDisposition(value: string) {
  return true;
}

// TODO
export function validateFreezer(value: string) {
  return true;
}

// TODO
export function validateRack(value: string) {
  return true;
}

// TODO
export function validateBox(value: string) {
  return true;
}

/**
 *
 *  NON-EXACT FIELD VALIDATORS
 *
 */

// TODO
export function validateMeasuredField(value: string) {
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

// TODO: call all above validators, return an array of errors
export function validateSpeciment(specimen: any, currentIndex: number) {}
