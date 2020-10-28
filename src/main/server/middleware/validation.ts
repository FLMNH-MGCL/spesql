import { NextFunction, Request, Response } from 'express';
import { connection } from '../server';

/**
 * Middleware function to validate a select query.
 *
 * There are few restriction set on select queries, mainly just a check to ensure
 * that a query was passed to through the request and that it is in fact a select query
 *
 * @param {Request} req: the request context sent to the server
 * @param {Response} res: the response context
 * @param {NextFunction} next: the function in queue, will only get called on successful validation
 */
export function validateSelectQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
/**
 * Middleware function to validate an insert query.
 *
 * There are few restriction set on insert queries, mainly just a check to ensure
 * that a query was passed to through the request and that it is in fact a insert query.
 *
 * Middleware before this function would have checked the access role of the
 * requester, and therefore there is no further check required
 *
 * @param {Request} req: the request context sent to the server
 * @param {Response} res: the response context
 * @param {NextFunction} next: the function in queue, will only get called on successful validation
 */
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
/**
 * Middleware function to validate an update query.
 *
 * The following restrictions apply to update:
 *  1. query string was passed to through the request
 *  2. query is in fact an update query
 *  3. query MUST contain a narrowing condition, this will help avoid accidental, bulk
 *    updates
 *
 * Middleware before this function would have checked the access role of the
 * requester, and therefore there is no further check required
 *
 * @param {Request} req: the request context sent to the server
 * @param {Response} res: the response context
 * @param {NextFunction} next: the function in queue, will only get called on successful validation
 */
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
/**
 * Middleware function to validate a delete query.
 *
 * The following restrictions apply to delete:
 *  1. query string was passed to through the request
 *  2. query is in fact an delete query
 *  3. query MUST contain a narrowing condition, namely the specific ID of an entry to
 *     target, this will help avoid accidental, bulk deletions
 *
 * Middleware before this function would have checked the access role of the
 * requester, and therefore there is no further check required
 *
 * @param {Request} req: the request context sent to the server
 * @param {Response} res: the response context
 * @param {NextFunction} next: the function in queue, will only get called on successful validation
 */
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