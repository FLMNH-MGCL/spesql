import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager, MySqlDriver } from '@mikro-orm/mysql';
import addNewLab from './endpoints/addNewLab';
import singleInsert from './endpoints/sql/singleInsert';
import select from './endpoints/sql/select';
import deleteSpecimen from './endpoints/sql/delete';
import insert from './endpoints/sql/insert';
import createUser from './endpoints/createUser';
import session from 'express-session';
import { corsConfig, mikroConfig, sessionConfig } from './config';
import login from './endpoints/auth/login';
import {
  adminRoute,
  managerRoute,
  validateSession,
} from './middleware/authentication';
import logout from './endpoints/auth/logout';
import count from './endpoints/sql/count';
import getUsers from './endpoints/getUsers';
import { AbstractSqlDriver } from '@mikro-orm/knex';
import update from './endpoints/sql/update';
import singleUpdate from './endpoints/sql/singleUpdate';

require('dotenv').config();

const PORT = process.env.PORT || 5000;

export let em: EntityManager<AbstractSqlDriver>;

async function bootstrap() {
  const app: Application = express();

  const corsOptions = {
    ...corsConfig,
  };

  app.use(cors(corsOptions));

  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ limit: '5mb', extended: true }));

  app.use(cookieParser());

  app.use(
    session({
      ...sessionConfig,
    })
  );

  const orm = await MikroORM.init<MySqlDriver>({
    ...mikroConfig,
  });

  em = orm.em;

  // GLOBAL ROUTES
  app.post('/api/login', login);
  app.post('/api/logout', logout);

  // guest queries
  app.get('/api/select', validateSession, select);
  app.get('/api/count', validateSession, count); // post? or get?

  // queriables
  // request-account
  // request-update
  // generatepassword
  // send email

  // END GLOBAL ROUTES

  // MANAGER ROUTES
  app.post('/api/insert', validateSession, managerRoute, insert);
  app.post('/api/insert/single', validateSession, managerRoute, singleInsert);

  app.post('/api/update', validateSession, managerRoute, update);
  app.post('/api/update/single', validateSession, managerRoute, singleUpdate);

  app.delete('/api/delete', validateSession, managerRoute, deleteSpecimen);
  // END MANAGER ROUTES

  // ADMIN ROUTES
  app.post('/api/lab/create', addNewLab);

  // user management
  app.post('/api/user/create', createUser);

  app.get('/api/users', validateSession, adminRoute, getUsers);
  // END ADMIN ROUTES

  app.listen(PORT, () => {
    console.log(`⚡️ server started at http://localhost:${PORT}`);
  });
}

bootstrap();
