import { NextFunction, Request, Response } from 'express';
import { connection } from '../server';
import bcrypt from 'bcrypt';

// this function will verify the session token
export function validateSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session?.userId === undefined) {
    console.log(req.session);
    res.status(409).send('The session has expired');
  } else {
    next();
  }
}

export function adminRoute(req: Request, res: Response, next: NextFunction) {
  const userId = req.session!.userId;
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).send('You must provide credentials for admin routes');
  } else if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    // grab the current user from session and query the db for the user
    connection.query(
      `SELECT * FROM users WHERE id='${userId}'`,
      (error, data) => {
        if (error) {
          res.status(500).send(error);
        } else {
          // returns an array, so will need to grab the first element
          const user = data[0];

          const queriedUsername = user.username;
          const accessRole = user.access_role;
          const hashedPassword = user.password;

          if (queriedUsername !== username) {
            res
              .status(401)
              .send('Attempting authentication with conflicting accounts');
          } else if (accessRole !== 'admin') {
            res.status(403).send('You must be an admin to access this route'); // TODO: should I change this to 401 to be ambiguous?
          } else {
            // this is the true 'validation' part of this function, password match
            bcrypt.compare(password, hashedPassword, (error, same) => {
              if (!same && !error) {
                res.status(401).send('Authorization either failed or denied');
              } else if (error) {
                res.status(401).send(error);
              } else {
                next();
              }
            });
          }
        }
      }
    );
  }
}

export function managerRoute(req: Request, res: Response, next: NextFunction) {
  const userId = req.session!.userId;
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).send('You must provide credentials for manager routes');
  } else if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    // grab the current user from session and query the db for the user
    connection.query(
      `SELECT * FROM users WHERE id='${userId}'`,
      (error, data) => {
        if (error) {
          res.status(500).send(error);
        } else {
          // returns an array, so will need to grab the first element
          const user = data[0];

          const queriedUsername = user.username;
          const accessRole = user.access_role;
          const hashedPassword = user.password;

          if (queriedUsername !== username) {
            res
              .status(401)
              .send('Attempting authentication with conflicting accounts');
          } else if (accessRole !== 'manager') {
            res.status(403).send('You must be an manager to access this route'); // TODO: should I change this to 401 to be ambiguous?
          } else {
            // this is the true 'validation' part of this function, password match
            bcrypt.compare(password, hashedPassword, (error, same) => {
              if (!same && !error) {
                res.status(401).send('Authorization either failed or denied');
              } else if (error) {
                res.status(401).send(error);
              } else {
                next();
              }
            });
          }
        }
      }
    );
  }
}
