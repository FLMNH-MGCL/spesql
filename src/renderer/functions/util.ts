import { Specimen } from '../types';

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function resetSelectedSpecimen(
  previous: Specimen | null,
  setSelectedSpecimen: (newSpecimen: Specimen | null) => void,
  data: Specimen[]
) {
  const updatedSpecimen = data.find((specimen) => specimen.id === previous?.id);

  console.log('PREV', previous);
  console.log('UPDATED', updatedSpecimen);

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
