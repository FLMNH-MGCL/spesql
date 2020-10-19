import { Request, Response } from "express";

export default function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.sendStatus(400);
  }

  const user = { id: 0, username, password };

  if (user) {
    req.session!.userId = user.id;
    req.session?.save((error) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        console.log("no error");
      }
    });
  }

  console.log(req.session!);

  res.json(user.id);
}
