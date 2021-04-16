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
        // select all but password
        const { id, firstName, lastName, role, username } = user;
        return { id, firstName, lastName, role, username };
      });
      res.status(200).send(users);
    })
    .catch((err) => res.status(500).send(err));
}
