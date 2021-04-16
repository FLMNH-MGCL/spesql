import clsx from 'clsx';
import { Request, Response } from 'express';
import { User } from '../../entities/User';
import { em, initMikro } from '../../server';

export default async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .send('You must enter both a username and password for login.');
  } else {
    const user = await em.findOne(User, { username });

    if (!user || !(await user.verifyPassword(password))) {
      res.status(401).send('Authorization either failed or denied');
    } else {
      await initMikro(user.role);

      // @ts-ignore: this will work I promise <3
      req.session.userId = user.id;

      req.session.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          // TODO: CHANGE CREDENTIALS
          const fullName = clsx(user.firstName, user.lastName);
          res.status(200).send({
            fullName,
            username: user.username,
            id: user.id,
            accessRole: user.role,
          });
        }
      });
    }
  }
}
