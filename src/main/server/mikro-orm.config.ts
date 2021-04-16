import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Options } from 'mikro-orm';
import {
  CollectionEvent,
  CollectionLocation,
  Lab,
  Loan,
  Specimen,
  Storage,
  Taxonomy,
} from './entities';
import { Request } from './entities/Request';
import { User } from './entities/User';

export const config: Options = {
  entities: [
    CollectionEvent,
    CollectionLocation,
    Lab,
    Loan,
    Specimen,
    Storage,
    Taxonomy,
    User,
    Request,
  ],
  type: 'mysql',
  highlighter: new SqlHighlighter(),
  dbName: process.env.ELECTRON_WEBPACK_APP_TEST_DB_NAME,
  user: process.env.ELECTRON_WEBPACK_APP_TEST_DB_USER!,
  password: process.env.ELECTRON_WEBPACK_APP_TEST_DB_PASS!,
  host: process.env.ELECTRON_WEBPACK_APP_TEST_DB_HOST!,
  port: parseInt(process.env.ELECTRON_WEBPACK_APP_TEST_DB_PORT!, 10),
  debug: true,
};

export default config;
