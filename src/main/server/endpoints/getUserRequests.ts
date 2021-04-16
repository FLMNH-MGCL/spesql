import { Request, Response } from 'express';
import { Request as UserRequest } from '../entities/Request';
import { em } from '../server';

export default async function getUserRequests(_req: Request, res: Response) {
  await em
    .find(UserRequest, {})
    .then((requests) => res.status(200).send(requests))
    .catch((err) => res.status(500).send(err));
}
