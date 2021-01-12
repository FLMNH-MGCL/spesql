import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { connection } from '../../../server';
import mysql from 'mysql';

export default function editUser(req: Request, res: Response) {
  if (!connection) {
  } else {
    let { newUser, newPassword, id } = req.body;

    if (!newUser && !newPassword) {
      res.status(400).send('No updates detected in req.body');
    } else if (
      !Object.keys(newUser).length &&
      (!newPassword || !newPassword.length)
    ) {
      res.status(400).send('No updates detected in req.body');
    }

    if (newPassword) {
      bcrypt
        .hash(newPassword, parseInt(process.env.ELECTRON_WEBPACK_APP_SALT!, 10))
        .then((hash) => {
          newUser.password = hash;
          const template = mysql.format('UPDATE users SET ? WHERE id = ?', [
            newUser,
            id,
          ]);
          connection?.query(template, (err, data) => {
            if (err) {
              res.status(503);
              res.json({ err: err });
            } else {
              console.log('sucessfully edited user');
              res.status(201).send(data);
            }
          });
        });
    } else {
      const template = mysql.format('UPDATE users SET ? WHERE id = ?', [
        newUser,
        id,
      ]);
      connection?.query(template, (err, data) => {
        if (err) {
          res.status(503);
          res.json({ err: err });
        } else {
          console.log('sucessfully edited user');
          res.status(201).send(data);
        }
      });
    }
  }
}
