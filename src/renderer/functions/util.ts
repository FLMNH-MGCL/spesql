import { Specimen } from '../types';
import Qty from 'js-quantities'; //https://github.com/gentooboontoo/js-quantities

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function resetSelectedSpecimen(
  previous: Specimen | null,
  setSelectedSpecimen: (newSpecimen: Specimen | null) => void,
  data: Specimen[]
) {
  const updatedSpecimen = data.find((specimen) => specimen.id === previous?.id);

  setSelectedSpecimen(null);

  if (updatedSpecimen) {
    setSelectedSpecimen(updatedSpecimen);
  } else {
    setSelectedSpecimen(null);
  }
}

export function standardizeName(name: string) {
  const wordsRegex = new RegExp(/\b([a-zA-Z]*)\b/g);

  const nameParts = name.match(wordsRegex)?.filter((part) => part !== '');

  console.log(nameParts);

  if (!nameParts || nameParts.length < 2) {
    return null;
  }

  if (name.includes(',')) {
    // validator is already ran, so assume it is in correct position
    return name;
  } else {
    let lastName = nameParts[nameParts.length - 1];
    let fullName = lastName + ',';
    nameParts.forEach((part, index) => {
      if (index !== nameParts.length - 1) {
        fullName += ' ' + part;
      }
    });

    return fullName;
  }
}

export function arrayFieldsToString(partiallyCorrect: Specimen) {
  let corrected = partiallyCorrect;

  Object.keys(partiallyCorrect).forEach((key) => {
    //@ts-ignore
    const current = partiallyCorrect[key];

    if (Array.isArray(current)) {
      if (current.length) {
        //@ts-ignore
        corrected[key] = current.join('|');
      } else {
        //@ts-ignore
        corrected[key] = null;
      }
    }
  });

  return corrected;
}

export function getSpecimenDefaults(specimen: Specimen) {
  let corrected = specimen;

  Object.keys(specimen).forEach((key) => {
    //@ts-ignore
    if (specimen[key] === '') {
      //@ts-ignore
      corrected[key] = null;
    }
  });

  return corrected;
}

// TODO:
// some fields are correct as input, but incorrect for storage. for example,
// measurements! we only store in meters, but we allow the input of ft or miles.
// this function will correct these fields and return the updated specimen
export function fixPartiallyCorrect(partiallyCorrect: Specimen) {
  // const updatedElevation = ...

  let slightlyMoreCorrect = getSpecimenDefaults(partiallyCorrect);
  // console.log(slightlyMoreCorrect);

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
    ? Qty.parse(partiallyCorrect.elevationInMeters)
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
    ...slightlyMoreCorrect,
    elevationInMeters,
    collectedYear,
    collectedMonth,
    collectedDay,
    dateEntered,
    decimalLatitude,
    decimalLongitude,
  } as Specimen;
}

export function toProperNoun(noun: string) {
  const pattern = /(\b[a-z](?!\s))/g;
  const wordCount = noun.trim().split(' ').length;

  if (wordCount > 1) {
    return noun.replace(pattern, (letter) => letter.toUpperCase());
  } else {
    // "Aaron's" without a trailing space would, when passed through regex, get returned as
    // "Aaron'S" so I add a space to correct this. Ideally, a new regex should be created. TODO:
    return (noun + ' ')
      .replace(pattern, (letter) => letter.toUpperCase())
      .trim();
  }
}
