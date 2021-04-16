import { Request, Response } from 'express';
import { Specimen } from '../../entities';
import { em } from '../../server';

export default async function deleteSpecimen(req: Request, res: Response) {
  const { catalogNumber } = req.body;

  if (!catalogNumber) {
    res.status(400).send('Missing body parameters');
  } else {
    const target = await em.findOne(Specimen, { catalogNumber });

    if (target) {
      await em
        .removeAndFlush(target)
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(500).send('Could not locate specimen');
    }
  }
}
