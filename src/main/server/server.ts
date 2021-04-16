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
import {
  corsConfig,
  dbCredentials,
  mikroConfig,
  sessionConfig,
} from './config';
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
import generatePassword from './endpoints/auth/generatePassword';
import { sendEmail } from '../../renderer/functions/sendEmail';
import updateUser from './endpoints/updateUser';
import deleteUser from './endpoints/deleteUser';
import requestAccount from './endpoints/requestAccount';
import getUserRequests from './endpoints/getUserRequests';
import getLabs from './endpoints/getLabs';

require('dotenv').config();

const PORT = process.env.PORT || 5000;

export let em: EntityManager<AbstractSqlDriver>;
export let orm: MikroORM<MySqlDriver>;

export async function initMikro(role: keyof typeof dbCredentials) {
  orm = await MikroORM.init<MySqlDriver>({
    ...mikroConfig,
    ...(dbCredentials[role] ?? dbCredentials.GUEST),
  });

  em = orm.em;
}

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

  await initMikro('GUEST');

  // GLOBAL ROUTES (some of these don't require a session)
  app.post('/api/login', login);
  app.post('/api/logout', logout);
  app.post('/api/send-email', sendEmail);
  app.post('/api/requests/account', requestAccount);
  // app.post('/api/requests/update', requestUpdate);

  app.get('/api/select', validateSession, select);
  app.get('/api/count', validateSession, count); // post? or get?
  app.get('/api/labs', validateSession, getLabs);
  app.get('/api/user/generate-password', generatePassword);
  // END GLOBAL ROUTES

  // MANAGER ROUTES
  app.post('/api/insert', validateSession, managerRoute, insert);
  app.post('/api/insert/single', validateSession, managerRoute, singleInsert);

  app.post('/api/update', validateSession, managerRoute, update);
  app.post('/api/update/single', validateSession, managerRoute, singleUpdate);

  app.delete('/api/delete', validateSession, managerRoute, deleteSpecimen);
  // END MANAGER ROUTES

  // ADMIN ROUTES
  app.post('/api/lab/create', validateSession, adminRoute, addNewLab);
  app.post('/api/user/create', validateSession, adminRoute, createUser);
  app.post('/api/user/update', validateSession, adminRoute, updateUser);
  // app.post('/api/requests/clear-requests')
  // app.post('/api/requests/change-status')

  app.get('/api/users', validateSession, adminRoute, getUsers);
  app.get('/api/requests', validateSession, adminRoute, getUserRequests);

  app.delete('/api/user/delete', validateSession, adminRoute, deleteUser);
  // app.delete('/api/lab/delete', validateSession, adminRoute, deleteLab);
  // END ADMIN ROUTES

  app.listen(PORT, () => {
    console.log(`⚡️ server started at http://localhost:${PORT}`);
  });
}

bootstrap();
