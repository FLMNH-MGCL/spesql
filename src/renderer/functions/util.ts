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
