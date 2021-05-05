import { Request, Response } from 'express';
import { connection } from '../../server';
import mysql from 'mysql';

export default function count(req: Request, res: Response) {
  const template: string = req.body.query;
  const { conditions } = req.body;

  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    if (conditions) {
      const query = mysql.format(template, conditions);
      connection.query(query, (error, data) => {
        if (error) {
          res.status(503).send(error);
        } else {
          const ret = { count: data[0][Object.keys(data[0])[0]], query };

          res.send(ret);
        }
      });
    } else {
      const query = template;
      connection.query(query, (error, data) => {
        if (error) {
          res.status(503).send(error);
        } else {
          const ret = { count: data[0][Object.keys(data[0])[0]], query };
          res.send(ret);
        }
      });
    }
  }
}
