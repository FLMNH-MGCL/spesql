import { Request, Response } from "express";

export default function insert(req: Request, res: Response) {
  res.json({
    test: ["hi", "hello there"],
  });
}
