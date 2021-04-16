import { Request, Response } from 'express';
import { Lab, Specimen } from '../../entities';
import { em } from '../../server';

export default async function count(req: Request, res: Response) {
  const { labName, conditions } = req.body;

  if (labName) {
    const lab = await em.findOne(Lab, { name: labName });

    if (lab) {
      await em
        .findAndCount(Specimen, { ...(conditions ?? {}), lab })
        // findAndCount returns [tuple[], number], I only need the number so
        // I ignore the first element and send the second
        .then(([_, numRecords]) => res.send({ numRecords }))
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(500).send('Could not location target lab.');
    }
  } else {
    await em
      .findAndCount(Specimen, { ...(conditions ?? {}) })
      .then(([_, numRecords]) => res.send({ numRecords }))
      .catch((err) => res.status(500).send(err));
  }
}
