import { Request, Response } from 'express';
import { connection } from '../../server';

// TODO: I can use nested arrays for bulk inserts, should this go in here?
export default function insert(req: Request, res: Response) {
  const { table, specimen } = req.body;

  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else if (!table || !specimen) {
    res.status(400).send('You must provide a table and an entry to insert');
  } else {
    res.send('NOT YET');
    // connection.query(
    //   'INSERT INTO ?? SET ?',
    //   [table, specimen],
    //   (error, data) => {
    //     if (error) {
    //       res.status(503).send(error);
    //     } else {
    //       res.status(201).send(data);
    //     }
    //   }
    // );
  }
}
