import { NextFunction, Request, Response } from 'express';
import { User, UserRole } from '../entities/User';
import { em } from '../server';

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
  // @ts-ignore: type error here is invalid
  if (req.session?.userId === undefined) {
    console.log(req.session);
    res.status(401).send('The session has expired');
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
export async function adminRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // @ts-ignore: type error here is invalid
  const userId = req.session.userId;

  // grab the current user from session and query the db for the user
  // this will be used to validate the person attempting this route matches
  // the what is stored in the current session.
  await em
    .findOne(User, { id: userId })
    .then((user) => {
      if (user) {
        if (user.role === UserRole.ADMIN) {
          next();
        } else {
          res.sendStatus(403);
        }
      } else {
        res.status(401).send('Invalid session');
      }
    })
    .catch((err) => res.status(500).send(err));
}

/**
 * Middleware function to restrict next function to only those with manager access
 *
 * @param {Request} req: the request context sent to the server
 * @param {Response} res: the response context
 * @param {NextFunction} next: the function in queue, will only get called on successful validation
 */
export async function managerRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // @ts-ignore: type error here is invalid
  // @ts-ignore: type error here is invalid
  const userId = req.session.userId;

  // grab the current user from session and query the db for the user
  // this will be used to validate the person attempting this route matches
  // the what is stored in the current session.
  await em
    .findOne(User, { id: userId })
    .then((user) => {
      if (user) {
        if (user.role === UserRole.MANAGER || user.role === UserRole.ADMIN) {
          next();
        } else {
          res.sendStatus(403);
        }
      } else {
        res.status(401).send('Invalid session');
      }
    })
    .catch((err) => res.status(500).send(err));
}
