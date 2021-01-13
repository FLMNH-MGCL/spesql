import { Request, Response } from 'express';
import { connection } from '../../../server';

// TODO: fetches tables that are queriable
// FIXME:? should this get separate functions? or a POST instead of a GET to pass
// the query type in body??
export function getQueriables(_req: Request, res: Response) {
  if (!connection) {
  } else {
    connection.query('SHOW TABLES', (error, data) => {
      if (error) {
        // TODO: what should this be
        res.status(503).send(error);
      } else {
        console.log(data);
        const tables = data
          .map((packet: any) => {
            return packet.Tables_in_kawaharalab;
          })
          .filter((tableName: string) => {
            const forbiddens = ['logs', 'users'];
            return !forbiddens.includes(tableName);
          });

        console.log(tables);

        res.status(200).send({ tables });
      }
    });
  }
}
