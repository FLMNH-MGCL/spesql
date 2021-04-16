import { Request, Response } from 'express';
import { Lab, Loan, Specimen, Storage } from '../../entities';
import { em } from '../../server';
import addCollectionEvent from './util/addCollectionEvent';

export default async function singleInsert(req: Request, res: Response) {
  const { specimen } = req.body;

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

  const { labName } = specimen;

  const lab = await em.findOneOrFail(Lab, { name: labName }).catch(() => null);

  // all specimen must be associated with a lab
  if (!lab) {
    res.status(500).send({ message: 'No lab was found with that name' });
  } else {
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

    await em
      .persistAndFlush(dbSpecimen)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        res.status(500).send(err);
      });
  }
}
