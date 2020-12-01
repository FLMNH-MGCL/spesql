import { Request, Response } from 'express';
import { connection } from '../../../server';

export default function getTableLogs(req: Request, res: Response) {
  const { table } = req.body;
  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    const query = `SELECT * FROM ${table}`;

    connection.query(query, (error, data) => {
      if (error) {
        res.status(500).send(error);
      } else {
        const ret = { logs: data, query };

        res.send(ret);
      }
    });
  }
}
