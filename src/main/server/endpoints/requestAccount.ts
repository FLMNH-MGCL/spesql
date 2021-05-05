import { Request, Response } from 'express';
import { connection } from '../server';
import bcrypt from 'bcrypt';

// /api/request-account
export default function requestAccount(req: Request, res: Response) {
  const {
    _type,
    title,
    from,
    email,
    username,
    institution,
    description,
    query,
    password,
  } = req.body;

  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else if (!title || !from || !username || !institution || !email) {
    res
      .status(400)
      .send(
        'You must specify a title, name, username, associated institution and email'
      );
  } else {
    bcrypt
      .hash(password, parseInt(process.env.ELECTRON_WEBPACK_APP_SALT!, 10))
      .then((hash) => {
        const val = {
          _type,
          title,
          from,
          email,
          username,
          institution,
          description,
          query,
          password: hash,
        };

        connection!.query(
          'INSERT INTO user_requests SET ?',
          val,
          (error, data) => {
            if (error) {
              res.status(503).send(error);
            } else {
              res.status(201).send(data);
            }
          }
        );
      });
  }
}
