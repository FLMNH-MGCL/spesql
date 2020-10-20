import { Request, Response } from 'express';

export default function logout(req: Request, res: Response) {
  req.session?.destroy((error) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    }

    res.clearCookie(process.env.SESSION_NAME!);

    res.sendStatus(200);
  });
}
