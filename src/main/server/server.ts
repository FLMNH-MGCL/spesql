import express, { Application } from 'express';
import cors from 'cors';
// import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {
  Connection,
  EntityManager,
  IDatabaseDriver,
  MikroORM,
} from '@mikro-orm/core';
// import config from './mikro-orm.config';
import addNewLab from './endpoints/addNewLab';
import singleInsert from './endpoints/sql/singleInsert';
import select from './endpoints/sql/select';

// TODO: REMOVE
import config from './config';
import deleteSpecimen from './endpoints/sql/delete';
import insert from './endpoints/sql/insert';
import createUser from './endpoints/createUser';
// END TODO: REMOVE

require('dotenv').config();

const PORT = process.env.PORT || 5000;

export let em: EntityManager<IDatabaseDriver<Connection>>;

async function bootstrap() {
  const app: Application = express();

  const corsOptions = {
    origin: [process.env.ELECTRON_WEBPACK_APP_FRONTEND_URL!],
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  app.use(cookieParser());

  // app.use(
  //   session({
  //     name: process.env.ELECTRON_WEBPACK_APP_SESSION_NAME!,
  //     secret: process.env.ELECTRON_WEBPACK_APP_SESSION_SECRET!,
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       maxAge:
  //         process.env.NODE_ENV === 'production'
  //           ? 1000 * 60 * 60 * 2
  //           : // prettier-ignore: REMOVE ME
  //             1000 * 60 * 30, // 2h for production, 30m timeout for development purposes
  //       // : 1000 * 60, // 1m
  //       // : (1000 * 60) / 2, // 30s
  //       secure: false,
  //     },
  //   })
  // );

  // const orm = await MikroORM.init({ ...config });

  const orm = await MikroORM.init({
    ...config,
  });

  em = orm.em;

  // GLOBAL ROUTES
  app.get('/api/select', select);
  // END GLOBAL ROUTES

  // MANAGER ROUTES
  app.post('/api/insert', insert);
  app.post('/api/insert/single', singleInsert);

  app.delete('/api/delete', deleteSpecimen);
  // END MANAGER ROUTES

  // ADMIN ROUTES
  app.post('/api/lab/create', addNewLab);

  // user management
  app.post('/api/user/create', createUser);
  // END ADMIN ROUTES

  app.listen(PORT, () => {
    console.log(`⚡️ server started at http://localhost:${PORT}`);
  });
}

bootstrap();
