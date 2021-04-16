import { Request, Response } from 'express';
import { Specimen } from '../../entities';
import { em } from '../../server';

export default async function singleUpdate(req: Request, res: Response) {
  const { changes, catalogNumber } = req.body;

  if (!catalogNumber || !changes) {
    res
      .status(400)
      .send(
        'You must define changes and specify a record by catalogNumber for the update'
      );
  } else {
    const qb = em.createQueryBuilder(Specimen);
    qb.update({ ...changes }).where({ catalogNumber });

    await qb
      .execute()
      .then((value) => res.status(201).send(value))
      .catch((err) => res.status(500).send(err));
  }
}
