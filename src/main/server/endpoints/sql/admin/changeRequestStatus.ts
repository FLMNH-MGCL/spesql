import { Request, Response } from 'express';
import { connection } from '../../../server';

export default function changeRequestStatus(req: Request, res: Response) {
  const { id, newStatus } = req.body;

  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else if (id === undefined || id === null || !newStatus) {
    res.status(400).send('You must specify an id and updated status.');
  } else {
    connection.query(
      'UPDATE user_requests SET status = ? WHERE id = ?',
      [newStatus, id],
      (error, _data) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        } else {
          res.sendStatus(201);
        }
      }
    );
  }
}
