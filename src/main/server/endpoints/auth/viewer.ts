import { Request, Response } from 'express';
import { connection } from '../../server';

export default function viewer(req: Request, res: Response) {
  // @ts-ignore: type error here is invalid
  const userId = req.session?.userId;

  if (!userId || !connection) {
    res.status(401).send(null);
  } else {
    connection.query(
      'SELECT * FROM users WHERE ?? = ?',
      ['id', userId],
      (error, data) => {
        if (error) {
          res.status(500).send(error);
        } else if (data && data.length === 1) {
          const { name, username, id, role } = data[0];

          res
            .status(200)
            .send({ fullName: name, username, id, accessRole: role });
        } else {
          res.status(401).send(null);
        }
      }
    );
  }
}
