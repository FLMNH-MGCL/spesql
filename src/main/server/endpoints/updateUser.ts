import { Request, Response } from 'express';
import { User } from '../entities/User';
import { em } from '../server';
import bcrypt from 'bcrypt';

export default async function updateUser(req: Request, res: Response) {
  const { changes, id, username } = req.body;

  if (!changes || id === undefined || id === null || !username) {
    res
      .status(400)
      .send(
        'You must defined changes, and specify the id and username of target user to update'
      );
  } else {
    const qb = em.createQueryBuilder(User);

    let bcryptError;

    if (changes.password) {
      await bcrypt.hash(changes.password, 12, (err, hash) => {
        if (err) {
          bcryptError = err;
        } else {
          qb.update({ ...changes, password: hash }).where({ id, username });
        }
      });
    } else {
      qb.update({ ...changes }).where({ id, username });
    }

    if (bcryptError) {
      res.status(500).send(bcryptError);
    } else {
      await qb
        .execute()
        .then((value) => res.status(201).send(value))
        .catch((err) => res.status(500).send(err));
    }
  }
}
