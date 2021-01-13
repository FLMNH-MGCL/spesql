import clsx from 'clsx';
import { Request, Response } from 'express';
import { connection } from '../../../server';

export default function editTable(req: Request, res: Response) {
  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    const { newName, tableName } = req?.body;

    if (!tableName || !tableName.length) {
      res.status(400).send('Missing original table name in creation request');
    } else if (!newName || !newName.length) {
      res.status(400).send('Missing new table name in creation request');
    } else {
      const query = clsx('ALTER TABLE', tableName, 'RENAME TO', newName);
      connection.query(query, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(data);
        }
      });
    }
  }
}
