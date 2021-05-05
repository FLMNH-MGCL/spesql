import clsx from 'clsx';
import { Request, Response } from 'express';
import { connection } from '../../server';
import mysql from 'mysql';

// TODO: I can use nested arrays for bulk inserts, should this go in here?
export default function bulkInsert(req: Request, res: Response) {
  const { table, columns, values } = req.body;

  // res.send(...values);
  // return;

  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else if (
    !table ||
    !values ||
    !values.length ||
    !columns ||
    !columns.length
  ) {
    res
      .status(400)
      .send(
        'You must provide a table, values and column list to make a bulk insert'
      );
  } else {
    const prefix = clsx(
      'INSERT INTO',
      table + `(${mysql.format('??', [columns])})`
    );

    connection.query(prefix + ' VALUES ?', [values], (error, data) => {
      if (error) {
        res.status(503).send(error);
      } else {
        res.status(201).send(data);
      }
    });
  }
}

/**
 * SIMPLE INSERT STATEMENT WITH PLACEHOLDERS
  var post  = {id: 1, title: 'Hello MySQL'};
  var query = connection.query('INSERT INTO posts SET ?', post, function (error, results, fields) {
    if (error) throw error;
    // Neat!
  });
  console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'

  NOTES:
  1). Nested arrays are turned into grouped lists (for bulk inserts), e.g. [['a', 'b'], ['c', 'd']] turns into ('a', 'b'), ('c', 'd')
  2). Objects are turned into key = 'val' pairs for each enumerable property on the object. If the property's value is a function, it is skipped; if the property's value is an object, toString() is called on it and the returned value is used.
  3). undefined / null are converted to NULL... NaN / Infinity are left as-is. MySQL does not support these, and trying to insert them as values will trigger MySQL errors until they implement support.
**/
