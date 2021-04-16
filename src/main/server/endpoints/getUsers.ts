import { Request, Response } from 'express';
import { User } from '../entities/User';
import { em } from '../server';

export default async function getUsers(_req: Request, res: Response) {
  // unfortunately, the {fields: []} option only works with findOne according to
  // the
  await em
    .find(User, {})
    .then((fullUsers) => {
      const users = fullUsers.map((user) => {
        const { firstName, lastName, role, username } = user; // remove password
        return { firstName, lastName, role, username };
      });
      res.status(200).send(users);
    })
    .catch((err) => res.status(500).send(err));
}
