import { Request, Response } from 'express';
import { connection } from '../../server';

// TODO: I can use nested arrays for bulk inserts, should this go in here?
export default function insert(req: Request, res: Response) {
  const { table, values } = req.body;

  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else if (!table || !values) {
    res
      .status(400)
      .send('You must provide a table and valid entries to insert');
  } else {
    connection.query('INSERT INTO ?? SET ?', [table, values], (error, data) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(201).send(data);
      }
    });
  }
}
