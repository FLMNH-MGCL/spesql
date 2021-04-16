import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../entities/User';
import { em } from '../server';

export default async function createUser(req: Request, res: Response) {
  const { role, firstName, lastName, username, password } = req.body;

  await bcrypt.hash(password, 12, (err, hash) => {
    if (err) {
      res.status(500).send(err);
    } else {
      em.persistAndFlush(
        em.create(User, {
          role,
          firstName,
          lastName,
          username,
          password: hash,
        })
      )
        .then(() => res.sendStatus(201))
        .catch((dbErr) => res.status(500).send(dbErr));
    }
  });
}
