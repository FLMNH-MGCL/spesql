import { Request, Response } from 'express';
import { Lab } from '../entities';
import { em } from '../server';

export default async function addNewLab(req: Request, res: Response) {
  const { labName } = req.body;

  await em
    .persistAndFlush(em.create(Lab, { labName }))
    .then(() => res.sendStatus(201))
    .catch((err) => {
      res.status(500).send(err);
    });
}
