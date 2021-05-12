import { Lab, Loan, Specimen, Storage, Taxonomy } from '../../../entities';
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

  const { collectionEvent, loan, storage, taxonomy } = specimen;

  if (collectionEvent) {
    addCollectionEvent(dbSpecimen, collectionEvent);
  }

  if (loan) {
    dbSpecimen.loan = em.create(Loan, { ...loan });
  }

  if (storage) {
    dbSpecimen.storage = em.create(Storage, { ...storage });
  }

  if (taxonomy) {
    const dBTaxonomy = await em.findOne(Taxonomy, { ...taxonomy });

    if (dBTaxonomy) {
      dbSpecimen.taxonomy = dBTaxonomy;
    } else {
      dbSpecimen.taxonomy = em.create(Taxonomy, { ...taxonomy });
    }
  }

  return dbSpecimen;
}
