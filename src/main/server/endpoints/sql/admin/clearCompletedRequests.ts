import { Request, Response } from 'express';
import { connection } from '../../../server';

export default function clearCompletedRequests(_req: Request, res: Response) {
  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    connection.query(
      `DELETE FROM user_requests WHERE status in ('FAILED', 'REJECTED', 'ACCEPTED')`,

      (error, _data) => {
        if (error) {
          // console.log(error);
          res.status(500).send(error);
        } else {
          res.sendStatus(201);
        }
      }
    );
  }
}
