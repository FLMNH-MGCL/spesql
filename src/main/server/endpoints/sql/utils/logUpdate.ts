import { Request, Response } from 'express';
import { connection } from '../../../server';

// TODO: I can use nested arrays for bulk inserts, should this go in here?
export default function logUpdate(req: Request, res: Response) {
  const { query, username, catalogNumber, updates, table } = req.body;

  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else if (!query || !username) {
    console.log({ query, username, catalogNumber, updates, table });
    res
      .status(400)
      .send(
        'You must provide a query string and valid username to log changes'
      );
  } else {
    const set = {
      query: query.replace(/`/g, '').replace(/'/g, '"'),
      tbl_name: table,
      user: username,
      catalogNumber,
      updates: JSON.stringify(updates),
    };

    connection.query('INSERT INTO logs SET ?', set, (error, data) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
        console.log(error.sql);
      } else {
        res.status(201).send(data);
      }
    });
  }
}
