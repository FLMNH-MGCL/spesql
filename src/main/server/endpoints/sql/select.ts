import { Request, Response } from 'express';
import { connection } from '../../server';
import mysql from 'mysql';

export default function select(req: Request, res: Response) {
  // it is no longer required to check for valid queries in the select
  // function, as this is handled by the middleware validator
  const template: string = req.body.query;
  const { columns, conditions } = req.body;

  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    if (columns || conditions) {
      const query = mysql.format(template, [columns, ...conditions]);
      console.log(query);
      connection.query(query, (error, data) => {
        if (error) {
          res.status(503).send(error);
        } else {
          const ret = { specimen: data, query };

          res.send(ret);
        }
      });
    } else {
      const query = template;
      connection.query(query, (error, data) => {
        if (error) {
          console.log(error);
          res.status(503).send(error);
        } else {
          const ret = { specimen: data, query };
          res.send(ret);
        }
      });
    }
  }
}
