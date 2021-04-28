import { Request, Response } from 'express';
import { connection } from '../server';

// /api/request-update
export default function requestUpdate(req: Request, res: Response) {
  const { _type, title, from, username, description, query } = req.body;

  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else if (!title || !from || !username || !description) {
    res
      .status(400)
      .send(
        'You must specify a title, name, username and update description/reason'
      );
  } else {
    const val = {
      _type,
      title,
      from,
      username,
      description,
      query,
    };

    connection.query('INSERT INTO user_requests SET ?', val, (error, data) => {
      if (error) {
        console.log(error);
        res.status(503).send(error);
      } else {
        console.log(data);
        res.status(201).send(data);
      }
    });
  }
}
