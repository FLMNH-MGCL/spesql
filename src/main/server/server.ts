import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import login from './endpoints/auth/login';
import logout from './endpoints/auth/logout';
import select from './endpoints/sql/select';
import insert from './endpoints/sql/insert';
import update from './endpoints/sql/update';
import bulkInsert from './endpoints/sql/bulkInsert';
import getConfig from './endpoints/getConfig';
import {
  adminRoute,
  managerRoute,
  validateSession,
} from './middleware/authentication';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {
  validateSelectQuery,
  validateCountQuery,
  validateUpdateQuery,
  validateDeleteQuery,
  validateInsertQuery,
} from './middleware/validation';
import mysql, { Pool } from 'mysql';
import { homedir } from 'os';
import path from 'path';
import fs from 'fs';
import { MySqlCredentials } from './types';
import updateConfig from './endpoints/updateConfig';
import createUser from './endpoints/sql/admin/createUser';
import { getQueriables } from './endpoints/sql/utils/queriables';
import viewer from './endpoints/auth/viewer';
import count from './endpoints/sql/count';
// import { win } from '..';

require('dotenv').config();

const PORT = process.env.PORT || 5000;
export const CONFIG_DIR = path.join(homedir(), '.spesql');
export const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export let connection: Pool | null = null;

async function bootstrap(mysqlCredentials: MySqlCredentials | null) {
  const app: Application = express();

  const corsOptions = {
    origin: [process.env.FRONTEND_URL!],
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.use(
    session({
      name: process.env.SESSION_NAME!,
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge:
          process.env.NODE_ENV === 'production'
            ? 1000 * 60 * 60 * 2
            : 1000 * 60 * 30, // 2h for production, 30m timeout for development purposes
        secure: false,
      },
    })
  );

  if (mysqlCredentials) {
    connection = mysql.createPool({
      ...mysqlCredentials,
      connectTimeout: 10000,
    });

    connection.getConnection(function (err, connection) {
      if (connection) {
        console.log('Connected to MySQL Server');
      } else if (err) {
        console.log(err);
        // tell react what's up
        // win?.webContents.send('NO CONNECTION');
      }
    });
  }

  // BASIC UNPROTECTED ROUTE TEST
  app.get('/', (_req: Request, res: Response) => {
    console.log(_req.session);
    res.send('Hello world!');
  });

  // BASIC PROTECTED ROUTE TEST
  app.get('/protected', validateSession, (_req: Request, res: Response) => {
    console.log(_req.session);
    res.send('Hello world!');
  });

  // GLOBAL / GUEST ROUTES
  app.get('/api/viewer', viewer);

  app.get('/api/config/get', getConfig);
  app.post('/api/config/update', updateConfig);

  app.post('/api/login', login);
  app.post('/api/logout', logout);
  app.post('/api/select', validateSession, validateSelectQuery, select);
  app.post('/api/count', validateSession, validateCountQuery, count);

  app.get('/api/queriables/select', validateSession, getQueriables);
  // END GLOBAL / GUEST ROUTES

  // MANAGER ROUTES
  app.post(
    '/api/update',
    validateSession,
    managerRoute,
    validateUpdateQuery,
    update
  );
  app.post(
    '/api/insert/single',
    validateSession,
    managerRoute,
    validateInsertQuery,
    insert
  );
  app.post(
    '/api/insert/bulk',
    validateSession,
    managerRoute,
    validateInsertQuery,
    bulkInsert
  );
  app.post(
    '/api/delete',
    validateSession,
    managerRoute,
    validateDeleteQuery,
    select
  );

  app.get(
    '/api/queriables/insert',
    validateSession,
    managerRoute,
    getQueriables
  );
  app.get(
    '/api/queriables/update',
    validateSession,
    managerRoute,
    getQueriables
  );
  // END MANAGER ROUTES

  // ADMIN ROUTES
  app.post('/api/admin/user/create', validateSession, adminRoute, createUser);
  // END ADMIN ROUTES

  app.listen(PORT, () => {
    console.log(`⚡️ server started at http://localhost:${PORT}`);
  });
}

fs.readFile(CONFIG_FILE, (err, data) => {
  if (err) {
    bootstrap(null);
  } else {
    bootstrap(JSON.parse(data.toString()) as MySqlCredentials);
  }
});
