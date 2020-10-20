import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import login from './endpoints/auth/login';
import logout from './endpoints/auth/logout';
import select from './endpoints/sql/select';
import getConfig from './endpoints/getConfig';
import {
  adminRoute,
  managerRoute,
  validateSession,
} from './middleware/authentication';
import bodyParser from 'body-parser';
import {
  validateSelectQuery,
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

require('dotenv').config();

const PORT = process.env.PORT || 5000;
export const CONFIG_DIR = path.join(homedir(), '.spesql');
export const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export let connection: Pool | null = null;

async function bootstrap(mysqlCredentials: MySqlCredentials | null) {
  const app: Application = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    session({
      name: process.env.SESSION_NAME!,
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        // maxAge: 1000 * 60 * 60 * 2, // 2h
        maxAge: 1000 * 60, // 1m timeout for development purposes
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

  // GLOBAL ROUTES
  app.get('/api/config/get', getConfig);
  app.post('/api/config/update', updateConfig);

  app.post('/api/login', login);
  app.post('/api/logout', logout);
  app.post('/api/select', validateSession, validateSelectQuery, select);
  // END GLOBAL ROUTES

  // MANAGER ROUTES
  app.post(
    '/api/update',
    validateSession,
    managerRoute,
    validateUpdateQuery,
    select
  );
  app.post(
    '/api/insert/single',
    validateSession,
    managerRoute,
    validateInsertQuery,
    select
  );
  app.post(
    '/api/insert/bulk',
    validateSession,
    managerRoute,
    validateInsertQuery,
    select
  );
  app.post(
    '/api/delete',
    validateSession,
    managerRoute,
    validateDeleteQuery,
    select
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
