import { Request, Response } from 'express';

// TODO
export default function createUser(_req: Request, res: Response) {
  res.json({
    test: ['hi', 'hello there'],
  });
}
