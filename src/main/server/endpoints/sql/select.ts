import { Request, Response } from "express";

export default function select(req: Request, res: Response) {
  res.json({
    test: ["hi", "hello there"],
  });
}
