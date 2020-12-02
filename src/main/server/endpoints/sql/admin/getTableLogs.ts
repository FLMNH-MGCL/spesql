import { Request, Response } from 'express';
import { connection } from '../../../server';
import mysql from 'mysql';

export default function getTableLogs(req: Request, res: Response) {
  const { table } = req.body;
  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    const query = mysql.format('SELECT * FROM logs WHERE ?? = ?', [
      'tbl_name',
      table,
    ]);

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
