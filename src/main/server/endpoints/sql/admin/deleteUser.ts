import { Request, Response } from 'express';
import { connection } from '../../../server';

export default function deleteUser(req: Request, res: Response) {
  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    const { id } = req.body;

    if (!id) {
      res.status(400).send('Missing user id in req.body');
    }

    connection.query(
      'DELETE FROM ?? WHERE id = ?',
      ['users', id],
      (error, data) => {
        if (error) {
          res.status(503).send(error);
        } else {
          res.status(200).send(data);
        }
      }
    );
  }
}
