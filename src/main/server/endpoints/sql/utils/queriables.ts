import { Request, Response } from 'express';
import { connection } from '../../../server';

// TODO: fetches tables that are queriable
// FIXME:? should this get separate functions? or a POST instead of a GET to pass
// the query type in body??
export function getQueriables(_req: Request, res: Response) {
  if (!connection) {
  } else {
    connection.query('SELECT * FROM interactables;', (error, data) => {
      if (error) {
        // TODO: what should this be
        res.status(503).send(error);
      } else {
        const tables = data.map((table: any) => {
          const { tbl_name } = table;
          return tbl_name;
        });

        res.status(200).send({ tables });
      }
    });
  }
}
