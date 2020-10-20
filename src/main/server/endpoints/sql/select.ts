import { Request, Response } from 'express';
import { connection } from '../../server';

export default function select(req: Request, res: Response) {
  // it is no longer required to check for valid queries in the select
  // function, as this is handled by the middleware validator
  const query: string = req.body.query;

  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    connection.query(query, (error, data) => {
      if (error) {
        res.status(503).send(error);
      } else {
        res.send(data);
      }
    });
  }
}
