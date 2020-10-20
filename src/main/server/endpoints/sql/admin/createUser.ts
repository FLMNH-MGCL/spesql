import { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import { connection } from '../../../server';

export default function createUser(_req: Request, res: Response) {
  // if (!connection) {
  // } else {
  //   bcrypt.hash('dev', parseInt(process.env.SALT!, 10)).then((hash) => {
  //     connection?.query(
  //       `INSERT INTO users(name, username, password, access_role) VALUES ("Aaron Leopold", "dev", "${hash}", "admin");`,
  //       (err, data) => {
  //         if (err) {
  //           res.status(503);
  //           res.json({ err: err });
  //         } else {
  //           console.log('sucessfully created user');
  //           res.status(201).send(data);
  //         }
  //       }
  //     );
  //   });
  // }
  res.send('woah');
}
