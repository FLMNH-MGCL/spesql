import express, { Application, Request, Response } from "express";
import session from "express-session";
import login from "./endpoints/auth/login";
import logout from "./endpoints/auth/logout";
import select from "./endpoints/sql/select";
import authenticate from "./middleware/authentication";
import bodyParser from "body-parser";

require("dotenv").config();

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app: Application = express();

  app.use(bodyParser.json());

  app.use(
    session({
      name: process.env.SESSION_NAME!,
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        // maxAge: 1000 * 60 * 60 * 2, // 2h
        maxAge: 1000 * 60, // 1m
        secure: false,
      },
    })
  );

  // define a route handler for the default home page
  app.get("/", (_req: Request, res: Response) => {
    console.log(_req.session);
    res.send("Hello world!");
  });

  // define a route handler for the default home page
  app.get("/protected", authenticate, (_req: Request, res: Response) => {
    console.log(_req.session);
    res.send("Hello world!");
  });

  // start the Express server
  app.listen(PORT, () => {
    console.log(`⚡️ server started at http://localhost:${PORT}`);
  });

  app.post("/api/login", login);
  app.post("/api/logout", logout);
  app.post("/api/select", authenticate, select);
}

bootstrap();
