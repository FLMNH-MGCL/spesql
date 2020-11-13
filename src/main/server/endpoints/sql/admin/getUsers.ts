import { Request, Response } from 'express';
import { connection } from '../../../server';

export default function getUsers(_req: Request, res: Response) {
  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    const query = 'SELECT id,name,username,role,created_at FROM users_new';

    connection.query(query, (error, data) => {
      if (error) {
        res.status(500).send(error);
      } else {
        const ret = { users: data, query };
        res.send(ret);
      }
    });
  }
}
