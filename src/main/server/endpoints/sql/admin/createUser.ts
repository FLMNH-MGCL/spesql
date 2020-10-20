import { Request, Response } from 'express';

export default function createUser(_req: Request, res: Response) {
  res.json({
    test: ['hi', 'hello there'],
  });
}
