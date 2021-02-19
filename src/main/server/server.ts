import express, { Application } from 'express';
import cors from 'cors';
import session from 'express-session';
import login from './endpoints/auth/login';
import logout from './endpoints/auth/logout';
import select from './endpoints/sql/select';
import insert from './endpoints/sql/insert';
import update, { advancedUpdate } from './endpoints/sql/update';
import deleteQuery from './endpoints/sql/delete';
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
  validateAdvancedUpdateQuery,
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
import getUsers from './endpoints/sql/admin/getUsers';
import generatePassword from './endpoints/auth/generatePassword';
import deleteUser from './endpoints/sql/admin/deleteUser';
import { queriablesStats } from './endpoints/sql/utils/queriablesStats';
import getTableLogs from './endpoints/sql/admin/getTableLogs';
import logUpdate from './endpoints/sql/utils/logUpdate';
import logDelete from './endpoints/sql/utils/logDelete';
import editUser from './endpoints/sql/admin/editUser';
import checkConnection from './endpoints/sql/utils/checkConnection';
import createTable from './endpoints/sql/admin/createTable';
import editTable from './endpoints/sql/admin/editTable';
import deleteTable from './endpoints/sql/admin/deleteTable';

require('dotenv').config();

const PORT = process.env.PORT || 5000;
export const CONFIG_DIR = path.join(homedir(), '.spesql');
export const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export let connection: Pool | null = null;

async function bootstrap(mysqlCredentials: Partial<MySqlCredentials> | null) {
  const app: Application = express();

  const corsOptions = {
    origin: [process.env.ELECTRON_WEBPACK_APP_FRONTEND_URL!],
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  app.use(cookieParser());

  app.use(
    session({
      name: process.env.ELECTRON_WEBPACK_APP_SESSION_NAME!,
      secret: process.env.ELECTRON_WEBPACK_APP_SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge:
          process.env.NODE_ENV === 'production'
            ? 1000 * 60 * 60 * 2
            : // prettier-ignore: REMOVE ME
              1000 * 60 * 30, // 2h for production, 30m timeout for development purposes
        // : 1000 * 60, // 1m
        // : (1000 * 60) / 2, // 30s
        secure: false,
      },
    })
  );

  if (mysqlCredentials) {
    connection = mysql.createPool({
      ...mysqlCredentials,
      host: process.env.ELECTRON_WEBPACK_APP_DB_HOST!,
      port: parseInt(process.env.ELECTRON_WEBPACK_APP_DB_PORT!),
      connectTimeout: 10000,
    });

    connection.getConnection(function (err, connection) {
      if (connection) {
        console.log('Connected to MySQL Server');
      } else if (err) {
        console.log(err);
        // tell react what's up
        // win?.webContents.send('NO CONNECTION');
        // sendStatusToWindow({
        //   type: 'error',
        //   message: 'Failed to connected to the Database. Please check the VPN',
        // });
      }
    });
  }

  // GLOBAL / GUEST ROUTES
  app.get('/api/viewer', viewer);
  app.get('/api/check-connection', checkConnection);

  app.get('/api/config/get', getConfig);
  app.post('/api/config/update', updateConfig);

  app.post('/api/login', login);
  app.post('/api/logout', logout);
  app.post('/api/select', validateSession, validateSelectQuery, select);
  app.post('/api/count', validateSession, validateCountQuery, count);

  app.get('/api/queriables/select', validateSession, getQueriables);

  app.post('/api/log/update', validateSession, logUpdate);
  app.post('/api/log/delete', validateSession, logDelete);
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
    '/api/update/advanced',
    validateSession,
    managerRoute,
    validateAdvancedUpdateQuery,
    advancedUpdate
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
    deleteQuery
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
  app.get(
    '/api/admin/queriables/stats',
    validateSession,
    adminRoute,
    queriablesStats
  );
  app.get('/api/admin/users', validateSession, adminRoute, getUsers);
  app.post('/api/admin/user/create', validateSession, adminRoute, createUser);
  app.post('/api/admin/user/edit', validateSession, adminRoute, editUser);
  app.post('/api/admin/user/delete', validateSession, adminRoute, deleteUser);
  app.get(
    '/api/admin/user/generatePassword',
    validateSession,
    adminRoute,
    generatePassword
  );
  app.post('/api/admin/table/logs', validateSession, adminRoute, getTableLogs);
  app.post('/api/admin/table/create', validateSession, adminRoute, createTable);
  app.post('/api/admin/table/edit', validateSession, adminRoute, editTable);
  app.post('/api/admin/table/delete', validateSession, adminRoute, deleteTable);
  // END ADMIN ROUTES

  app.listen(PORT, () => {
    console.log(`⚡️ server started at http://localhost:${PORT}`);
  });
}

fs.readFile(CONFIG_FILE, (err, data) => {
  if (err) {
    bootstrap(null);
  } else {
    bootstrap(JSON.parse(data.toString()) as Partial<MySqlCredentials>);
  }
});
