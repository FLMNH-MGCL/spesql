import { Request, Response } from 'express';
import { Lab } from '../entities';
import { em } from '../server';

export default async function getLabs(_req: Request, res: Response) {
  await em
    .find(Lab, {})
    .then((labs) => res.status(200).send(labs))
    .catch((err) => res.status(500).send(err));
}
