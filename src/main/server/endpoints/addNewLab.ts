import { Request, Response } from 'express';
import { Lab } from '../entities';
import { em } from '../server';

export default async function addNewLab(req: Request, res: Response) {
  const { name } = req.body;

  await em
    .persistAndFlush(em.create(Lab, { name }))
    .then(() => res.sendStatus(201))
    .catch((err) => {
      res.status(500).send(err);
    });
}
