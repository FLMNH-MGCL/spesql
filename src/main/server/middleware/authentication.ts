import { NextFunction, Request, Response } from 'express';
import { connection } from '../server';
import bcrypt from 'bcrypt';

/**
 * Middleware function to verify a valid, current session
 *
 * @param {Request} req: the request context sent to the server
 * @param {Response} res: the response context
 * @param {NextFunction} next: the function in queue, will only get called on successful validation
 */
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

/**
 * Middleware function to restrict next function to only those with admin access
 *
 * @param {Request} req: the request context sent to the server
 * @param {Response} res: the response context
 * @param {NextFunction} next: the function in queue, will only get called on successful validation
 */
export function adminRoute(req: Request, res: Response, next: NextFunction) {
  const userId = req.session!.userId;
  // const username = req.body.username;
  // const password = req.body.password;

  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    // grab the current user from session and query the db for the user
    // this will be used to validate the person attempting this route matches
    // the credentials stored in the current session.
    connection.query(
      'SELECT * FROM users_new WHERE id = ?',
      userId,
      (error, data) => {
        if (error) {
          res.status(500).send(error);
        } else {
          // returns an array, so will need to grab the first element
          const user = data[0];

          const accessRole = user.role;

          if (accessRole !== 'admin') {
            res.status(403).send('You must be an admin to access this route'); // TODO: should I change this to 401 to be ambiguous?
          } else {
            next();
          }
        }
      }
    );
  }
}

/**
 * Middleware function to restrict next function to only those with manager access
 *
 * @param {Request} req: the request context sent to the server
 * @param {Response} res: the response context
 * @param {NextFunction} next: the function in queue, will only get called on successful validation
 */
export function managerRoute(req: Request, res: Response, next: NextFunction) {
  const userId = req.session!.userId;
  // const username = req.body.username;
  // const password = req.body.password;

  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    // grab the current user from session and query the db for the user
    // this will be used to validate the person attempting this route matches
    // the credentials stored in the current session.
    connection.query(
      'SELECT * FROM users_new WHERE id = ?',
      userId,
      (error, data) => {
        if (error) {
          res.status(500).send(error);
        } else {
          // returns an array, so will need to grab the first element
          const user = data[0];

          console.log(user);

          const accessRole = user.role;

          // I do not allow for people to operate on the database with accounts
          // other than the one that is logged in. this is why if the username
          // the user used to validate the current credentials differs from the
          // credentials recieved from the session id I send a 401. A new session
          // will need to be started, in this case (i.e. log out and log in using
          // your own account)
          // if (queriedUsername !== username) {
          //   res
          //     .status(401)
          //     .send('Attempting authentication with conflicting accounts');
          // }

          // admins are still able to access manager routes, there is a down access
          // schema in this backend
          if (accessRole !== 'manager' && accessRole !== 'admin') {
            res.status(403).send('You must be an manager to access this route'); // TODO: should I change this to 401 to be ambiguous?
          } else {
            // this is the true 'validation' part of this function, password match
            // bcrypt.compare(password, hashedPassword, (error, same) => {
            //   if (!same && !error) {
            //     res.status(401).send('Authorization either failed or denied');
            //   } else if (error) {
            //     res.status(401).send(error);
            //   } else {
            //     next();
            //   }
            // });

            next();
          }
        }
      }
    );
  }
}
