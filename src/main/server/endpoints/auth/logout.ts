import { Request, Response } from 'express';
import { connection } from '../../server';

export default function logout(req: Request, res: Response) {
  let connectionError: any = null;
  let sessionError: any = null;

  if (!connection) {
    connectionError = 'Could not establish connection with the Database!';
  } else {
    connection.changeUser(
      {
        user: process.env.ELECTRON_WEBPACK_APP_DB_GUEST_USER!,
        password: process.env.ELECTRON_WEBPACK_APP_DB_GUEST_PASS!,
      },
      function (err) {
        if (err) {
          connectionError = err;
        } else {
          console.log('restored default user priviledge...');
        }
      }
    );
  }

  req.session?.destroy((error) => {
    if (error) {
      res.status(500);
      sessionError = error;
    } else {
      res.clearCookie(process.env.ELECTRON_WEBPACK_APP_SESSION_NAME!);
    }

    if (sessionError || connectionError) {
      res.status(500).send({ sessionError, connectionError });
    } else {
      res.sendStatus(200);
    }
  });
}
