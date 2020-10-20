import { Request, Response } from 'express';

// TODO
export default function update(_req: Request, res: Response) {
  res.json({
    test: ['hi', 'hello there'],
  });
}
