import { NextFunction, Request, Response } from "express";

// this function will verify the session token
export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session?.userId === undefined) {
    console.log(req.session);
    res.sendStatus(403);
  } else {
    next();
  }
}
