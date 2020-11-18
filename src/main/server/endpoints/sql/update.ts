import { Request, Response } from 'express';
import { connection } from '../../server';
import mysql from 'mysql';

// TODO
export default function update(req: Request, res: Response) {
  const { conditions, updates } = req.body;
  const template: string = req.body.query;

  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else if (!template || !conditions || !updates) {
    res
      .status(400)
      .send('Missing required body parameters: query, conditions or updates');
  } else {
    const query = mysql.format(template, [updates, ...conditions]);
    console.log(query, template, conditions, updates);

    connection.query(query, (error, data) => {
      if (error) {
        console.log(error);
        res.status(503).send(error);
      } else {
        // const ret = { specimen: data, query };

        console.log(data);

        res.send(data);
      }
    });
  }
}
