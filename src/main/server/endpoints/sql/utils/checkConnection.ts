import { Request, Response } from 'express';
import { connection } from '../../../server';

export default function checkConnection(_req: Request, res: Response) {
  if (!connection) {
    res.status(502).send('Connection to the database could not be established');
  } else {
    res.status(200).send('Connected to database');
  }
}
