import { Request, Response } from 'express';
import { Specimen } from '../../entities';
import { em } from '../../server';

export default async function update(req: Request, res: Response) {
  const { changes, conditions } = req.body;

  if (!conditions || !changes) {
    res
      .status(400)
      .send('You must define both conditions and changes for the update');
  } else {
    const qb = em.createQueryBuilder(Specimen);
    qb.update({ ...changes }).where({ ...conditions });

    await qb
      .execute()
      .then((value) => res.status(201).send(value))
      .catch((err) => res.status(500).send(err));
  }
}
