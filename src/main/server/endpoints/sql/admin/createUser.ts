import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { connection } from '../../../server';

// TODO
export default function createUser(req: Request, res: Response) {
  if (!connection) {
  } else {
    const { newUser } = req.body;

    if (!newUser) {
      res.status(400).send('Missing newUser object in req.body');
    }

    const { name, username, password, access_role } = newUser;

    if (!name || !username || !password || !access_role) {
      res
        .status(400)
        .send(
          'Missing either name, username, password, access_role (or all) from newUser'
        );
    } else {
      bcrypt
        .hash(password, parseInt(process.env.ELECTRON_WEBPACK_APP_SALT!, 10))
        .then((hash) => {
          connection?.query(
            // FIXME: change to users once matching users_new
            `INSERT INTO users_new(name, username, password, role) VALUES ("${name}", "${username}", "${hash}", "${access_role}");`,
            (err, data) => {
              if (err) {
                res.status(503);
                res.json({ err: err });
              } else {
                console.log('sucessfully created user');
                res.status(201).send(data);
              }
            }
          );
        });
    }
  }
}
