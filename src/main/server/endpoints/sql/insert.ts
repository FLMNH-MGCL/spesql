import { Request, Response } from 'express';

// TODO
export default function insert(_req: Request, res: Response) {
  res.json({
    test: ['hi', 'hello there'],
  });
}
