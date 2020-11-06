import { Request, Response } from 'express';
import { connection } from '../../server';

export default function viewer(req: Request, res: Response) {
  const userId = req.session?.userId;

  if (!userId || !connection) {
    res.status(401).send(null);
  } else {
    connection.query(
      'SELECT * FROM users_new WHERE ?? = ?',
      ['id', userId],
      (error, data) => {
        if (error) {
          res.status(500).send('Server error');
        } else if (data && data.length === 1) {
          const { username, id, accessRole } = data[0];

          res.status(200).send({ username, id, accessRole });
        } else {
          console.log(data);
          res.status(401).send(null);
        }
      }
    );
  }
}
