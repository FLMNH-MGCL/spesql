import { Request, Response } from 'express';
import { connection } from '../../../server';

export default function deleteTable(req: Request, res: Response) {
  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    const { tableName } = req?.body;

    if (!tableName || !tableName.length) {
      res.status(400).send('Missing table name in creation request');
    } else {
      connection.query(`DROP TABLE ${tableName}`, (err, data) => {
        if (err) {
          res.status(503).json({ err: err });
        } else {
          console.log('sucessfully deleted table');
          res.status(201).send(data);
        }
      });
    }
  }
}
