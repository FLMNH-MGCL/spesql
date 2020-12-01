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
    res.status(500).send('Lost connection with database');
  } else {
    connection.query(
      `SELECT * FROM users WHERE username='${username}'`,
      (error, data) => {
        if (error) {
          // I am hardcoding this query, so in theory the only time an error
          // should hit here is if the connection to the DB (i.e. the VPN is not
          // connected) is unable to be made
          res.status(504).send(error);
        } else if (data && data.length === 1) {
          const target = data[0];

          const id = target.id;
          const hashedPassword = target.password;
          const accessRole = target.role;

          bcrypt.compare(password, hashedPassword, (error, same) => {
            if (!same && !error) {
              res.status(401).send('Authorization either failed or denied');
            } else if (error) {
              // console.log(error);
              res.status(401).send(error);
            } else {
              req.session!.userId = id;
              console.log(req.session);
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
          res.status(401).send('Authorization either failed or denied'); // TODO: should this be 401?
        }
      }
    );
  }
}
