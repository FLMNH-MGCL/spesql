import { NextFunction, Request, Response } from 'express';
import { connection } from '../server';

// this function will verify the session token
export function validateSelectQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req);
  const query: string = req.body.query;

  if (!query) {
    res.status(400).send('No query detected');
  } else if (!query.toLowerCase().startsWith('select')) {
    res
      .status(403)
      .send('Only Select queries may be issued from this endpoint');
  } else {
    next();
  }
}

// TODO
export async function validateInsertQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    const userId = req.session!.userId;
    connection.query(`SELECT access_role FROM users WHERE id='${userId}'`);
  }
  next();
}

// TODO
export async function validateUpdateQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    const userId = req.session!.userId;
    connection.query(`SELECT access_role FROM users WHERE id='${userId}'`);
  }
  next();
}

// TODO
export async function validateDeleteQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    const userId = req.session!.userId;
    connection.query(`SELECT access_role FROM users WHERE id='${userId}'`);
  }
  next();
}
