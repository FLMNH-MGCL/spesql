import { Request, Response } from 'express';
import { connection } from '../../server';
import mysql from 'mysql';

// TODO
export default function (req: Request, res: Response) {
  const { id, table } = req.body;

  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else if (!id || !table) {
    res.status(400).send('No entry id or table was found in request');
  } else {
    const query = mysql.format('DELETE FROM ?? WHERE id = ?', [table, id]);
    connection.query(query, (error, data) => {
      if (error) {
        res.status(503).send(error);
      } else {
        res.status(201).send({ ...data, query });
      }
    });
  }
}
