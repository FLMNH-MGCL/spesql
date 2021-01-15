import { Request, Response } from 'express';
import { connection } from '../../../server';

export function getQueriables(_req: Request, res: Response) {
  if (!connection) {
  } else {
    connection.query('SHOW TABLES', (error, data) => {
      if (error) {
        // TODO: what should this be
        res.status(503).send(error);
      } else {
        const forbiddens = ['logs', 'users'];

        const tables = data
          .map((packet: any) => {
            return packet.Tables_in_kawaharalab;
          })
          .filter((tableName: string) => {
            return !forbiddens.includes(tableName);
          });

        res.status(200).send({ tables });
      }
    });
  }
}
