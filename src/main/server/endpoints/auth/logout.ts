import { Request, Response } from 'express';
import { sessionConfig } from '../../config';

export default async function logout(req: Request, res: Response) {
  // TODO: CHANGE USER!!

  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.clearCookie(sessionConfig.name);
      res.sendStatus(200);
    }
  });
}
