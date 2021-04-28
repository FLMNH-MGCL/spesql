import { Request, Response } from 'express';
import { connection } from '../../../server';

export default function getRequests(_req: Request, res: Response) {
  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    connection.query('SELECT * FROM user_requests', (error, data) => {
      if (error) {
        res.status(500).send(error);
      } else {
        const ret = { requests: data };
        res.send(ret);
      }
    });
  }
}
