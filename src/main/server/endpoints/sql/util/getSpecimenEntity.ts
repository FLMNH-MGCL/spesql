import { Lab, Loan, Specimen, Storage } from '../../../entities';
import { em } from '../../../server';
import addCollectionEvent from './addCollectionEvent';

// this is for BULK only
export default async function getSpecimenEntity(specimen: any, lab: Lab) {
  const {
    catalogNumber,
    otherCatalogNumber,
    recordNumber,
    projectNumber,
    otherIdentifier,
    reared,
    withholdData,
  } = specimen;

  const dbSpecimen = em.create(Specimen, {
    catalogNumber,
    otherCatalogNumber,
    recordNumber,
    projectNumber,
    otherIdentifier,
    reared,
    withholdData,
  });

  dbSpecimen.lab = lab;

  const { collectionEvent, loan, storage } = specimen;

  if (collectionEvent) {
    addCollectionEvent(dbSpecimen, collectionEvent);
  }

  if (loan) {
    dbSpecimen.loan = em.create(Loan, { ...loan });
  }

  if (storage) {
    dbSpecimen.storage = em.create(Storage, { ...storage });
  }

  return dbSpecimen;
}
