import { Request, Response } from 'express';
import { Request as UserRequest } from '../entities/Request';
import bcrypt from 'bcrypt';
import { em } from '../server';
import { User, UserRole } from '../entities/User';

export default async function requestAccount(req: Request, res: Response) {
  const {
    _type,
    title,
    from,
    email,
    username,
    institution,
    description,
    password,
  } = req.body;

  if (!title || !from || !username || !institution || !email) {
    res
      .status(400)
      .send(
        'You must specify a title, name, username, associated institution and email'
      );
  } else {
    const hash = await bcrypt.hash(password, 12);

    const qb = em.createQueryBuilder(User);

    const firstName = from.split(' ')[0];
    const lastName = from.split(' ')[1];

    qb.insert({
      username,
      firstName,
      lastName,
      password: hash,
      role: UserRole.GUEST,
    });

    console.log(qb.getFormattedQuery());

    await em
      .persistAndFlush(
        em.create(UserRequest, {
          _type,
          title,
          from,
          email,
          username,
          institution,
          description,
          query: qb.getFormattedQuery(),
          password,
        })
      )
      .then(() => res.sendStatus(201))
      .catch((err) => res.status(500).send(err));
  }
}
