import { Request, Response } from 'express';

export default function insert(_req: Request, res: Response) {
  res.json({
    test: ['hi', 'hello there'],
  });
}
