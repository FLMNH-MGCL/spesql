// @ts-ignore: I know I am not using it
import { Session } from 'express-session';

// FIXME: this is not working, bug? --> https://github.com/DefinitelyTyped/DefinitelyTyped/issues/49941
declare module 'express-session' {
  interface Session {
    userId: number;
  }
}
