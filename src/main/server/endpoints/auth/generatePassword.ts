import { Request, Response } from 'express';
import https from 'https';

export default function generatePassword(_req: Request, res: Response) {
  https
    .get('https://www.passwordrandom.com/query?command=password', (resp) => {
      let resData = '';
      resp.on('data', (data) => {
        resData += data;
      });

      resp.on('end', () => {
        res.status(200).send(resData);
      });
    })
    .on('error', (err) => {
      res.status(503).send(err);
    });
}
