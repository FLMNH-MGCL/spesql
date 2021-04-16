import { Request, Response } from 'express';
import { User } from '../entities/User';
import { em } from '../server';

export default async function deleteUser(req: Request, res: Response) {
  const { userId, username } = req.body;

  // could be 0 :D
  if (userId === undefined || userId === null || !username) {
    res
      .status(400)
      .send('You must specify a user by id and username to delete');
  } else {
    const target = em.findOne(User, { id: userId, username });
    if (target) {
      await em
        .removeAndFlush(target)
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(400).send('Could not locate target user.');
    }
  }
}
