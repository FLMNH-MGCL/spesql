import { Request, Response } from "express";

export default function update(req: Request, res: Response) {
  res.json({
    test: ["hi", "hello there"],
  });
}
