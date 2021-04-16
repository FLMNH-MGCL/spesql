import { Request, Response } from 'express';
import { sessionConfig } from '../../config';
import { initMikro } from '../../server';

export default async function logout(req: Request, res: Response) {
  await initMikro('GUEST');

  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.clearCookie(sessionConfig.name);
      res.sendStatus(200);
    }
  });
}
