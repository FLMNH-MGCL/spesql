import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { connection } from '../../server';

export default function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.sendStatus(400);
  }

  // const user = { id: 0, username, password };
  else if (!connection) {
  } else {
    connection.query(
      `SELECT * FROM users WHERE username='${username}'`,
      (error, data) => {
        if (error) {
          res.status(500).send(error);
        } else if (data && data.length === 1) {
          const target = data[0];

          const id = target.id;
          const hashedPassword = target.password;
          const accessRole = target.access_role;

          bcrypt.compare(password, hashedPassword, (error, same) => {
            if (!same && !error) {
              res.status(401).send('Authorization either failed or denied');
            } else if (error) {
              // console.log(error);
              res.status(401).send(error);
            } else {
              req.session!.userId = id;
              req.session!.save((error) => {
                if (error) {
                  res.status(500).send(error);
                } else {
                  res.status(200).send({ username, id, accessRole });
                }
              });
            }
          });
        } else {
          res.status(500).send('MySQL query returned invalid data'); // TODO: should this be 401?
        }
      }
    );
  }
}
