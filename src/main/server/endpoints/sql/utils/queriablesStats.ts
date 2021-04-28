import { Request, Response } from 'express';
import { connection } from '../../../server';

export function queriablesStats(_req: Request, res: Response) {
  if (!connection) {
    res.status(500).send('Lost connection with database');
  } else {
    const queryString = `
SELECT
  table_name,
  table_rows as 'rows',
  round(((data_length + index_length)), 2) 'size'
FROM information_schema.TABLES
WHERE table_schema not in ('information_schema', 'mysql', 'performance_schema')
AND table_name not in ('users', 'logs', 'user_requests');`;

    connection.query(queryString, (error, data) => {
      if (error) {
        // TODO: what should this be
        res.status(503).send(error);
      } else {
        res.send(data);
      }
    });
  }
}
